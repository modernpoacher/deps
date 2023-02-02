#!/usr/bin/env node

import debug from 'debug'

import {
  exec
} from 'child_process'

import {
  resolve,
  relative,
  normalize
} from 'path'

import {
  constants
} from 'fs'

import {
  access,
  readFile
} from 'fs/promises'

import {
  VERSION,
  PLATFORM
} from '#deps/src/common/env'

import {
  DIRECTORY,
  REGISTRY,
  AUTHOR,
  NVM,
  getRegistryParameter,
  getForceParameter
} from '#deps/src/common'

const log = debug('@modernpoacher/deps')

log(`\`common\` (${VERSION} - ${PLATFORM}) is awake`)

const OPTIONS = {
  maxBuffer: 1024 * 2000,
  shell: true,
  stdio: 'inherit',
  env: {
    DEBUG_COLORS: 'yes',
    FORCE_COLOR: PLATFORM === 'win32'
      ? 3
      : 2
  }
}

const CODE = 0

const MESSAGE = 'Either no error message has been defined or no error has been supplied'

const tidy = (v) => v.replace(/\n\n/gm, '\n').trim()

const trim = (v) => v.split('\n').map((v) => v.trim()).join('\n').trim()

const toRelativePath = (to) => relative(process.cwd(), to) // const toRelativePath = relative.bind(null, process.cwd())

const getRmrfCommands = PLATFORM === 'win32'
  ? () => tidy(`
rmdir /s /q node_modules 2> nul & \
del package-lock.json 2> nul
`)
  : () => tidy(`
rm -rf node_modules package-lock.json
`)

const getNpmiCommands = PLATFORM === 'win32'
  ? (registry = REGISTRY, force = false) => tidy(getRegistryParameter(registry, getForceParameter(force, 'npm i')))
  : (registry = REGISTRY, force = false) => tidy(`
export PATH=/usr/local/bin:$PATH &> /dev/null
. "${NVM}" 2> /dev/null
${getRegistryParameter(registry, getForceParameter(force, 'npm i'))}
`)

const getDepsCommands = PLATFORM === 'win32'
  ? (registry = REGISTRY, force = false) => tidy(getRegistryParameter(registry, getForceParameter(force, 'deps')))
  : (registry = REGISTRY, force = false) => tidy(`
export PATH=/usr/local/bin:$PATH &> /dev/null
. "${NVM}" 2> /dev/null
${getRegistryParameter(registry, getForceParameter(force, 'deps'))}
`)

function use (key) {
  const log = debug(`@modernpoacher/deps:${key}`)

  return function use (v) {
    const s = v.trim()

    if (s !== '') log(trim(s))
  }
}

function handleError (e = {}) {
  const {
    code = CODE,
    message = MESSAGE
  } = e

  const log = debug('@modernpoacher/deps:error')
  if (code > 1) log(code)
  log(message)
}

const handlePackageError = ({ message = MESSAGE } = {}) => { log(`Package error: "${message}"`) }

const handleConfigurationError = ({ message = MESSAGE } = {}) => { log(`Configuration error: "${message}"`) }

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
  } catch {
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
      const commands = getRmrfCommands()

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: normalize(directory) }, (e, v) => {
        (!e)
          ? resolve(v)
          : reject(e)
      })

      const log = use('rmrf')

      stdout.on('data', log)
      stderr.on('data', log)
    })
  )
}

function npmi (directory = DIRECTORY, registry = REGISTRY, force = false) {
  log('npmi')

  return (
    new Promise((resolve, reject) => {
      const commands = getNpmiCommands(registry, force)

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: normalize(directory) }, (e, v) => {
        (!e)
          ? resolve(v)
          : reject(e)
      })

      const log = use('npmi')

      stdout.on('data', log)
      stderr.on('data', log)
    })
  )
}

function deps (directory = DIRECTORY, registry = REGISTRY, force = false) {
  log('deps')

  return (
    new Promise((resolve, reject) => {
      const commands = getDepsCommands(registry, force)

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: normalize(directory) }, (e, v) => {
        (!e)
          ? resolve(v)
          : reject(e)
      })

      const log = use('deps')

      stdout.on('data', log)
      stderr.on('data', log)
    })
  )
}

export {
  DIRECTORY,
  REGISTRY,
  AUTHOR,
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
