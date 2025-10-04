#!/usr/bin/env node

/**
 *  @typedef {import('node:child_process').ExecException} ExecException
 */

/**
 *  @typedef {DepsTypes.Package} Package
 *  @typedef {DepsTypes.Configuration} Configuration
 */

/**
 *  @callback HandleComplete
 *  @param {ExecException | null} e
 *  @param {string} v
 *  @returns {void}
 */

import {
  argv
} from 'node:process'

import {
  exec
} from 'node:child_process'

import {
  resolve,
  join,
  normalize
} from 'node:path'

import {
  constants
} from 'node:fs'

import {
  access,
  readFile
} from 'node:fs/promises'

import debug from '#deps/src/common/debug'

import {
  BIN,
  NAME,
  VERSION,
  PLATFORM
} from '#deps/src/common/env'

import {
  formatDirectory,
  use,
  tidy
} from '#deps/src/common/format'

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
const info = debug('@modernpoacher/deps:info')
const error = debug('@modernpoacher/deps:error')

log(`\`common\` (${NAME} - ${VERSION} - ${PLATFORM}) is awake`)

const ARGV = argv.slice(2)

const CODE = 0

const MESSAGE = 'Either no error message has been defined or no error has been supplied'

const SP = String.fromCodePoint(32)

const getRmrfCommands = PLATFORM === 'win32'
  ? () => tidy(`
rmdir /s /q node_modules 2> nul & del package-lock.json 2> nul
`)
  : () => tidy(`
rm -rf node_modules package-lock.json
`)

const getNpmiCommands = PLATFORM === 'win32'
  ? (registry = REGISTRY, force = false) => tidy(getRegistryParameter(registry, getForceParameter(force, 'npm i')))
  : (registry = REGISTRY, force = false) => tidy(getExportPath(getNvm(getRegistryParameter(registry, getForceParameter(force, 'npm i')))))

const getDepsCommands = PLATFORM === 'win32'
  ? (registry = REGISTRY, force = false) => tidy(getRegistryParameter(registry, getForceParameter(force, 'deps')))
  : (registry = REGISTRY, force = false) => tidy(getExportPath(getNvm(getRegistryParameter(registry, getForceParameter(force, 'deps')))))

export const DEPS = PLATFORM === 'win32'
  ? `bash "${join(BIN, '.\\bash\\deps.sh')}"`
  : `bash '${join(BIN, './bash/deps.sh')}'`

export const HEAD = PLATFORM === 'win32'
  ? `bash "${join(BIN, '.\\bash\\head.sh')}"`
  : `bash '${join(BIN, './bash/head.sh')}'`

export const PUSH = PLATFORM === 'win32'
  ? `bash "${join(BIN, '.\\bash\\push.sh')}"`
  : `bash '${join(BIN, './bash/push.sh')}'`

export const WIPE = PLATFORM === 'win32'
  ? `bash "${join(BIN, '.\\bash\\wipe.sh')}"`
  : `bash '${join(BIN, './bash/wipe.sh')}'`

/**
 *  @param {string} v
 *  @returns {string}
 */
function toDouble (v) {
  return v.startsWith('-') ? v : `"${v}"` // double-quote
}

/**
 *  @param {string} v
 *  @returns {string}
 */
function toSingle (v) {
  return v.startsWith('-') ? v : `'${v}'` // single-quote
}

export const ARGS = PLATFORM === 'win32'
  ? ARGV.map(toDouble).join(SP)
  : ARGV.map(toSingle).join(SP)

/**
 *  @param {{ code?: number, message?: string }} [e]
 */
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

/**
 *  @param {Error | null} e
 *  @returns {void}
 */
export function handleComplete (e) {
  if (!e) return log('👍')
  error('👎')
}

/**
 *  @param {{ code?: number, message?: string }} e
 */
function handlePackageError ({ message = MESSAGE }) {
  error(`Package error: "${message}"`)
}

/**
 *  @param {{ code?: number, message?: string }} e
 */
function handleConfigurationError ({ message = MESSAGE }) {
  error(`Configuration error: "${message}"`)
}

/**
 *
 * @param directory
 */
function getPackageJsonPath (directory = DIRECTORY) {
  return resolve(join(directory, 'package.json'))
}

/**
 *
 * @param directory
 */
function getDepsRcPath (directory = DIRECTORY) {
  return resolve(join(directory, '.depsrc'))
}

/**
 *
 * @param directory
 */
function getDepsRcJsonPath (directory = DIRECTORY) {
  return resolve(join(directory, '.depsrc.json'))
}

/**
 *  @param {string} directory
 *  @returns {Promise<Package>}
 */
async function getPackageJson (directory = DIRECTORY) {
  log('getPackageJson')

  return JSON.parse(
    await readFile(getPackageJsonPath(directory), 'utf8')
  )
}

/**
 *  @param {string} directory
 *  @returns {Promise<Configuration>}
 */
async function getDepsRc (directory = DIRECTORY) {
  log('getDepsRc')

  return JSON.parse(
    await readFile(getDepsRcPath(directory), 'utf8')
  )
}

/**
 *  @param {string} directory
 *  @returns {Promise<Configuration>}
 */
async function getDepsRcJson (directory = DIRECTORY) {
  log('getDepsRcJson')

  return JSON.parse(
    await readFile(getDepsRcJsonPath(directory), 'utf8')
  )
}

/**
 *  @param {string} directory
 *  @returns {Promise<boolean>}
 */
async function hasPackage (directory = DIRECTORY) {
  log('hasPackage')

  info(`Directory is "${formatDirectory(directory)}"`)

  try {
    await access(getPackageJsonPath(directory), constants.R_OK)

    info('Package at "package.json"')
    return true
  } catch {
    info('No package at "package.json"')
    return false
  }
}

/**
 *  @param {string} directory
 *  @returns {Promise<Package>}
 */
async function getPackage (directory = DIRECTORY) {
  log('getPackage')

  info(`Directory is "${formatDirectory(directory)}"`)

  try {
    return await getPackageJson(directory)
  } catch (e) {
    if (e instanceof Error) handlePackageError(e)
    return {}
  }
}

/**
 *  @param {string} directory
 *  @returns {Promise<boolean>}
 */
async function hasConfiguration (directory = DIRECTORY) {
  log('hasConfiguration')

  info(`Directory is "${formatDirectory(directory)}"`)

  try {
    await access(getDepsRcPath(directory), constants.R_OK)

    info('Configuration at ".depsrc"')
    return true
  } catch (e) {
    const { // @ts-expect-error
      code
    } = e

    if (code !== 'ENOENT') {
      if (e instanceof Error) handleConfigurationError(e)
    } else {
      try {
        await access(getDepsRcJsonPath(directory), constants.R_OK)

        info('Configuration at ".depsrc.json"')
        return true
      } catch (e) {
        const { // @ts-expect-error
          code
        } = e

        if (code !== 'ENOENT') {
          if (e instanceof Error) handleConfigurationError(e)
        }
      }
    }

    info('No configuration at ".depsrc" nor ".depsrc.json"') //  at "${toRelativePath(getDepsRcPath(directory))}" or "${toRelativePath(getDepsRcJsonPath(directory))}"`)
    return false
  }
}

/**
 *  @param {string} directory
 *  @returns {Promise<Configuration>}
 */
async function getConfiguration (directory = DIRECTORY) {
  log('getConfiguration')

  info(`Directory is "${formatDirectory(directory)}"`)

  try {
    return await getDepsRc(directory)
  } catch (e) {
    const { // @ts-expect-error
      code
    } = e

    if (code !== 'ENOENT') {
      if (e instanceof Error) handleConfigurationError(e)
    } else {
      try {
        return await getDepsRcJson(directory)
      } catch (e) {
        const { // @ts-expect-error
          code
        } = e

        if (code !== 'ENOENT') {
          if (e instanceof Error) handleConfigurationError(e)
        }
      }
    }

    return {}
  }
}

/**
 *  @param {string} [d]
 *  @returns {Promise<string>}
 */
function rmrf (d = DIRECTORY) {
  log('rmrf')

  const directory = normalize(d.trim())

  return (
    new Promise((resolve, reject) => {
      const commands = getRmrfCommands()
      const options = getOptions(directory)
      /**
       *  @type {HandleComplete}
       */
      function handleComplete (e, v) {
        if (!e) {
          resolve(v)
        } else {
          reject(e)
        }
      }

      info(commands) // , options)

      const {
        stdout,
        stderr
      } = exec(commands, options, handleComplete)

      const log = use('rmrf')

      if (stdout) stdout.on('data', log)
      if (stderr) stderr.on('data', log)
    })
  )
}

/**
 *  @param {string} [d]
 *  @param {string} [registry]
 *  @param {boolean} [force]
 *  @returns {Promise<string>}
 */
function npmi (d = DIRECTORY, registry = REGISTRY, force = false) {
  log('npmi')

  const directory = normalize(d.trim())

  return (
    new Promise((resolve, reject) => {
      const commands = getNpmiCommands(registry, force)
      const options = getOptions(directory)
      /**
       *  @type {HandleComplete}
       */
      function handleComplete (e, v) {
        if (!e) {
          resolve(v)
        } else {
          reject(e)
        }
      }

      info(commands) // , options)

      const {
        stdout,
        stderr
      } = exec(commands, options, handleComplete)

      const log = use('npmi')

      if (stdout) stdout.on('data', log)
      if (stderr) stderr.on('data', log)
    })
  )
}

/**
 *  @param {string} [d]
 *  @param {string} [registry]
 *  @param {boolean} [force]
 *  @returns {Promise<string>}
 */
function deps (d = DIRECTORY, registry = REGISTRY, force = false) {
  log('deps')

  const directory = normalize(d.trim())

  return (
    new Promise((resolve, reject) => {
      const commands = getDepsCommands(registry, force)
      const options = getOptions(directory)
      /**
       *  @type {HandleComplete}
       */
      function handleComplete (e, v) {
        if (!e) {
          resolve(v)
        } else {
          reject(e)
        }
      }

      info(commands) // , options)

      const {
        stdout,
        stderr
      } = exec(commands, options, handleComplete)

      const log = use('deps')

      if (stdout) stdout.on('data', log)
      if (stderr) stderr.on('data', log)
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
