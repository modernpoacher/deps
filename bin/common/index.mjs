#!/usr/bin/env node

/**
 *  @typedef {DepsTypes.Package} Package
 *  @typedef {DepsTypes.Configuration} Configuration
 */

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
  VERSION,
  PLATFORM,
  BIN
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
const info = debug('@modernpoacher/deps:info')
const error = debug('@modernpoacher/deps:error')

log(`\`common\` (${VERSION} - ${PLATFORM}) is awake`)

const ARGV = argv.slice(2)

const CODE = 0

const MESSAGE = 'Either no error message has been defined or no error has been supplied'

/**
 *  @param {string} v
 *  @returns {string}
 */
export const tidy = (v) => v.replace(/\n{2,}}/gm, String.fromCharCode(10)).trim()

/**
 *  @param {string} v
 *  @returns {string}
 */
export const trim = (v) => v.split(String.fromCharCode(10)).map((v) => v.trimEnd()).join(String.fromCharCode(10)).trim()

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
  ? ARGV.map(toDouble).join(String.fromCodePoint(32))
  : ARGV.map(toSingle).join(String.fromCodePoint(32))

/**
 *  @param {string} v
 *  @returns {boolean}
 */
function filter (v) {
  return Boolean(stripAnsi(v).trim())
}

/**
 *  @param {string} key
 *  @returns {(value: string) => void}
 */
export function use (key) {
  const log = debug(`@modernpoacher/deps:${key}`)

  /**
   *  @param {string} v
   *  @returns {void}
   */
  function write (v) {
    log(v.trimEnd())
  }

  /**
   *  @param {string} value
   *  @returns {void}
   */
  return function use (value) {
    value.split(String.fromCharCode(10))
      .filter(filter)
      .forEach(write)
  }
}

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
 *  @param {Error | null} [e]
 *  @returns {void}
 */
export function handleComplete (e = null) {
  if (!e) return log('👍')
  error('👎')
}

/**
 *  @param {{ code?: number, message?: string }} [e]
 */
const handlePackageError = ({ message = MESSAGE } = {}) => { info(`Package error: "${message}"`) }

/**
 *  @param {{ code?: number, message?: string }} [e]
 */
const handleConfigurationError = ({ message = MESSAGE } = {}) => { info(`Configuration error: "${message}"`) }

const getPackageJsonPath = (directory = DIRECTORY) => resolve(join(directory, 'package.json'))

const getDepsRcPath = (directory = DIRECTORY) => resolve(join(directory, '.depsrc'))

const getDepsRcJsonPath = (directory = DIRECTORY) => resolve(join(directory, '.depsrc.json'))

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

  info(`Directory is "${directory}"`)

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

  info(`Directory is "${directory}"`)

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

  info(`Directory is "${directory}"`)

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

  info(`Directory is "${directory}"`)

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

      const {
        stdout,
        stderr
      } = exec(commands, options, (e = null, v = '') => {
        return (!e) ? resolve(v) : reject(e)
      })

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

      const {
        stdout,
        stderr
      } = exec(commands, options, (e = null, v = '') => {
        return (!e) ? resolve(v) : reject(e)
      })

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

      const {
        stdout,
        stderr
      } = exec(commands, options, (e = null, v = '') => {
        return (!e) ? resolve(v) : reject(e)
      })

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
