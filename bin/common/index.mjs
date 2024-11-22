#!/usr/bin/env node

import debug from 'debug'

import stripAnsi from 'strip-ansi'

import {
  argv
} from 'node:process'

import {
  exec
} from 'node:child_process'

import {
  resolve,
  join,
  relative,
  normalize
} from 'node:path'

import {
  constants
} from 'node:fs'

import {
  access,
  readFile
} from 'node:fs/promises'

import {
  VERSION,
  PLATFORM
} from '#deps/src/common/env'

import {
  getOptions
} from '#deps/src/common/options'

import {
  DIRECTORY,
  REGISTRY,
  AUTHOR,
  NVM,
  getRegistryParameter,
  getForceParameter,
  getExportPath,
  getNvm
} from '#deps/src/common'

const log = debug('@modernpoacher/deps')
const error = debug('@modernpoacher/deps:error')

log(`\`common\` (${VERSION} - ${PLATFORM}) is awake`)

const ARGV = argv.slice(2)

const CODE = 0

const MESSAGE = 'Either no error message has been defined or no error has been supplied'

export const tidy = (v) => v.replace(/\n{2,}}/gm, String.fromCharCode(10)).trim()

export const trim = (v) => v.split(String.fromCharCode(10)).map((v) => v.trimEnd()).join(String.fromCharCode(10)).trim()

const toRelativePath = (to) => relative(process.cwd(), to) // const toRelativePath = relative.bind(null, process.cwd())

const getRmrfCommands = PLATFORM === 'win32'
  ? () => tidy(`
rmdir /s /q node_modules 2> nul & \
del package-lock.json 2> nul
`)
  : () => tidy(`
rm -rf node_modules \
  package-lock.json
`)

const getNpmiCommands = PLATFORM === 'win32'
  ? (registry = REGISTRY, force = false) => tidy(getRegistryParameter(registry, getForceParameter(force, 'npm i')))
  : (registry = REGISTRY, force = false) => tidy(`
${getExportPath(getNvm(getRegistryParameter(registry, getForceParameter(force, 'npm i'))))}
`)

const getDepsCommands = PLATFORM === 'win32'
  ? (registry = REGISTRY, force = false) => tidy(getRegistryParameter(registry, getForceParameter(force, 'deps')))
  : (registry = REGISTRY, force = false) => tidy(`
${getExportPath(getNvm(getRegistryParameter(registry, getForceParameter(force, 'deps'))))}
`)

export function getArgs () {
  return (
    PLATFORM === 'win32'
      ? ARGV.map((v) => v.startsWith('-') ? v : `"${v}"`)
      : ARGV.map((v) => v.startsWith('-') ? v : `'${v}'`)
  ).join(
    String.fromCodePoint(32)
  )
}

function filter (v) {
  return Boolean(stripAnsi(v).trim())
}

export function use (key) {
  const log = debug(`@modernpoacher/deps:${key}`)

  function write (v) {
    log(v.trimEnd())
  }

  return function use (value) {
    value.split(String.fromCharCode(10))
      .filter(filter)
      .forEach(write)
  }
}

export function handleError (e = {}) {
  const {
    code = CODE
  } = e

  if (code > 1) error(code)
  const {
    message = MESSAGE
  } = e

  error(message)
}

export function handleComplete (e = null) {
  if (!e) return log('👍')
  error('👎')
}

const handlePackageError = ({ message = MESSAGE } = {}) => { log(`Package error: "${message}"`) }

const handleConfigurationError = ({ message = MESSAGE } = {}) => { log(`Configuration error: "${message}"`) }

const getPackageJsonPath = (directory = DIRECTORY) => resolve(join(directory, 'package.json'))

const getDepsRcPath = (directory = DIRECTORY) => resolve(join(directory, '.depsrc'))

const getDepsRcJsonPath = (directory = DIRECTORY) => resolve(join(directory, '.depsrc.json'))

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

function rmrf (d = DIRECTORY) {
  log('rmrf')

  const directory = normalize(d.trim())

  return (
    new Promise((resolve, reject) => {
      const commands = getRmrfCommands()
      const options = getOptions(directory)

      const {
        stdout,
        stderr
      } = exec(commands, options, (e, v) => {
        return (!e) ? resolve(v) : reject(e)
      })

      const log = use('rmrf')

      stdout.on('data', log)
      stderr.on('data', log)
    })
  )
}

function npmi (d = DIRECTORY, registry = REGISTRY, force = false) {
  log('npmi')

  const directory = normalize(d.trim())

  return (
    new Promise((resolve, reject) => {
      const commands = getNpmiCommands(registry, force)
      const options = getOptions(directory)

      const {
        stdout,
        stderr
      } = exec(commands, options, (e, v) => {
        return (!e) ? resolve(v) : reject(e)
      })

      const log = use('npmi')

      stdout.on('data', log)
      stderr.on('data', log)
    })
  )
}

function deps (d = DIRECTORY, registry = REGISTRY, force = false) {
  log('deps')

  const directory = normalize(d.trim())

  return (
    new Promise((resolve, reject) => {
      const commands = getDepsCommands(registry, force)
      const options = getOptions(directory)

      const {
        stdout,
        stderr
      } = exec(commands, options, (e, v) => {
        return (!e) ? resolve(v) : reject(e)
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
