#!/usr/bin/env node

require('module-alias/register')

const debug = require('debug')

const {
  exec
} = require('child_process')

const {
  resolve,
  relative,
  normalize
} = require('path')

const {
  constants
} = require('fs')

const {
  access,
  readFile
} = require('fs/promises')

const {
  version: VERSION
} = require('~/package')

const {
  PLATFORM
} = require('@modernpoacher/deps/common/env')

const {
  DIRECTORY,
  REGISTRY,
  NVM,

  getRegistryParameter,
  getForceParameter
} = require('@modernpoacher/deps/common')

const log = debug('@modernpoacher/deps')

log(`\`common\` (${VERSION} - ${PLATFORM}) is awake`)

const OPTIONS = {
  maxBuffer: 1024 * 2000,
  shell: true,
  stdio: 'inherit'
}

const CODE = 0

const MESSAGE = 'Either no error message has been defined or no error has been supplied'

const tidy = (v) => v.replace(/\n\n/gm, '\n').trim()

const trim = (v) => v.split('\n').map((v) => v.trimEnd()).join('\n').trim()

const toRelativePath = (to) => relative(process.cwd(), to) // const toRelativePath = relative.bind(null, process.cwd())

const getRmrfCommands = PLATFORM === 'win32'
  ? (directory = DIRECTORY) => tidy(`
rmdir /s /q node_modules 2> nul &
del package-lock.json 2> nul
`)
  : (directory = DIRECTORY) => tidy(`
rm -rf node_modules package-lock.json
`)

const getNpmiCommands = PLATFORM === 'win32'
  ? (directory = DIRECTORY, registry = REGISTRY, force = false) => tidy(getRegistryParameter(registry, getForceParameter(force, 'npm i')))
  : (directory = DIRECTORY, registry = REGISTRY, force = false) => tidy(`
export PATH=/usr/local/bin:$PATH &> /dev/null
. "${NVM}" 2> /dev/null
${getRegistryParameter(registry, getForceParameter(force, 'npm i'))}
`)

const getDepsCommands = PLATFORM === 'win32'
  ? (directory = DIRECTORY, registry = REGISTRY, force = false) => tidy(getRegistryParameter(registry, getForceParameter(force, 'deps')))
  : (directory = DIRECTORY, registry = REGISTRY, force = false) => tidy(`
export PATH=/usr/local/bin:$PATH &> /dev/null
. "${NVM}" 2> /dev/null
${getRegistryParameter(registry, getForceParameter(force, 'deps'))}
`)

function use (key) {
  const log = debug(`@modernpoacher/deps:${key}`)

  return function use (v) {
    if (v.trim() === '') return

    return (
      log(trim(v)) // log(v.trim()) // .replace(/(\s+)$/g, '')
    )
  }
}

function handleError ({ code = CODE, message = MESSAGE } = {}) {
  log({
    code,
    message
  })
}

const handlePackageError = ({ message = MESSAGE } = {}) => log(`Package error: "${message}"`)

const handleConfigurationError = ({ message = MESSAGE } = {}) => log(`Configuration error: "${message}"`)

const getPackageJsonPath = (directory = DIRECTORY) => resolve(directory, 'package.json')

const getDepsRcPath = (directory = DIRECTORY) => resolve(directory, '.depsrc')

const getDepsRcJsonPath = (directory = DIRECTORY) => resolve(directory, '.depsrc.json')

async function getPackageJson (directory = DIRECTORY) {
  log('getPackageJson')

  return JSON.parse(
    await readFile(getPackageJsonPath(directory), 'utf8')
  )
}

async function getDepsRc (directory = DIRECTORY) {
  log('getDepsRc')

  return JSON.parse(
    await readFile(getDepsRcPath(directory), 'utf8')
  )
}

async function getDepsRcJson (directory = DIRECTORY) {
  log('getDepsRcJson')

  return JSON.parse(
    await readFile(getDepsRcJsonPath(directory), 'utf8')
  )
}

async function hasPackage (directory = DIRECTORY) {
  log('hasPackage')

  try {
    await access(getPackageJsonPath(directory), constants.R_OK)

    log(`Package at "${toRelativePath(getPackageJsonPath(directory))}"`)
    return true
  } catch (e) {
    log(`No package at "${toRelativePath(getPackageJsonPath(directory))}"`)
    return false
  }
}

async function getPackage (directory = DIRECTORY) {
  log('getPackage')

  try {
    return await getPackageJson(directory)
  } catch (e) {
    handlePackageError(e)
  }
}

async function hasConfiguration (directory = DIRECTORY) {
  log('hasConfiguration')

  try {
    await access(getDepsRcPath(directory), constants.R_OK)

    log(`Configuration at "${toRelativePath(getDepsRcPath(directory))}"`)
    return true
  } catch (e) {
    const {
      code
    } = e

    if (code !== 'ENOENT') {
      handleConfigurationError(e)
    } else {
      try {
        await access(getDepsRcJsonPath(directory), constants.R_OK)

        log(`Configuration at "${toRelativePath(getDepsRcJsonPath(directory))}"`)
        return true
      } catch (e) {
        const {
          code
        } = e

        if (code !== 'ENOENT') {
          handleConfigurationError(e)
        }
      }
    }
  }

  log(`No configuration at "${toRelativePath(getDepsRcPath(directory))}" or "${toRelativePath(getDepsRcJsonPath(directory))}"`)
  return false
}

async function getConfiguration (directory = DIRECTORY) {
  log('getConfiguration')

  try {
    return await getDepsRc(directory)
  } catch (e) {
    const {
      code
    } = e

    if (code !== 'ENOENT') {
      handleConfigurationError(e)
    } else {
      try {
        return await getDepsRcJson(directory)
      } catch (e) {
        const {
          code
        } = e

        if (code !== 'ENOENT') {
          handleConfigurationError(e)
        }
      }
    }
  }
}

function rmrf (directory = DIRECTORY) {
  log('rmrf')

  return (
    new Promise((resolve, reject) => {
      const log = use('rmrf')
      const commands = getRmrfCommands(directory)

      log(commands)

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: normalize(directory) }, (e, v) => (!e) ? resolve(v) : reject(e))

      stdout.on('data', log)
      stderr.on('data', log)
    })
  )
}

function npmi (directory = DIRECTORY, registry = REGISTRY, force = false) {
  log('npmi')

  return (
    new Promise((resolve, reject) => {
      const log = use('npmi')
      const commands = getNpmiCommands(directory, registry, force)

      log(commands)

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: normalize(directory) }, (e, v) => (!e) ? resolve(v) : reject(e))

      stdout.on('data', log)
      stderr.on('data', log)
    })
  )
}

function deps (directory = DIRECTORY, registry = REGISTRY, force = false) {
  log('deps')

  return (
    new Promise((resolve, reject) => {
      const log = use('deps')
      const commands = getDepsCommands(directory, registry, force)

      log(commands)

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: normalize(directory) }, (e, v) => (!e) ? resolve(v) : reject(e))

      stdout.on('data', log)
      stderr.on('data', log)
    })
  )
}

module.exports = {
  DIRECTORY,
  REGISTRY,
  NVM,
  handleError,
  handlePackageError,
  handleConfigurationError,
  getPackageJsonPath,
  getDepsRcPath,
  getDepsRcJsonPath,
  getPackageJson,
  getDepsRc,
  getDepsRcJson,
  hasPackage,
  getPackage,
  hasConfiguration,
  getConfiguration,
  rmrf,
  npmi,
  deps
}
