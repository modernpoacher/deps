/**
 * A package
 * @typedef {import('../common/index.mjs').Package} Package
 */

/**
 * A configuration
 * @typedef {import('../common/index.mjs').Configuration} Configuration
 */

import debug from 'debug'

import {
  normalize
} from 'node:path'

import {
  exec
} from 'node:child_process'

import {
  VERSION,
  PLATFORM
} from '#deps/src/common/env'

import {
  DIRECTORY,
  REGISTRY,
  getNoSaveParameter,
  getRegistryParameter,
  getForceParameter,
  getSaveExactParameter,
  getCommands,
  normalizeCommands,
  transform,
  getDepsExact,
  getDeps
} from '#deps/src/common'

const log = debug('@modernpoacher/deps:install')

log(`\`install\` (${VERSION} - ${PLATFORM}) is awake`)

const OPTIONS = {
  maxBuffer: 1024 * 2000,
  stdio: 'inherit',
  env: {
    DEBUG_COLORS: 'yes',
    FORCE_COLOR: PLATFORM === 'win32'
      ? 3
      : 2,
    PATH: process.env.PATH
  }
}

/**
 *  @function getInstallSaveExactCommands
 *
 *  Get the `install --save-exact` commands as a string of parameters and arguments
 *
 *  @param {Package} p - Package
 *  @param {boolean} s - Save
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *
 *  @return {string}
 */
export function getInstallSaveExactCommands (p, s, r, f) {
  log('getInstallSaveExactCommands')

  const c = transform(p)
  const commands = `npm i ${c}`

  return normalizeCommands(
    getNoSaveParameter(s, getRegistryParameter(r, getForceParameter(f, getSaveExactParameter(commands))))
  )
}

/**
 *  @function getInstallCommands
 *
 *  Get the `install` commands as a string of parameters and arguments
 *
 *  @param {Package} p - Package
 *  @param {boolean} s - Save
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *
 *  @return {string}
 */
export function getInstallCommands (p, s, r, f) {
  log('getInstallCommands')

  const c = transform(p)
  const commands = `npm i ${c}`

  return normalizeCommands(
    getNoSaveParameter(s, getRegistryParameter(r, getForceParameter(f, commands)))
  )
}

/**
 *  @function installSaveExact
 *
 *  Spawn the `install --save-exact` commands
 *
 *  @param {string} d - Directory
 *  @param {Package} p - Package
 *  @param {Configuration} c - Configuration
 *  @param {boolean} s - Save
 *  @param {string} r - Registry
 *
 *  @return {Promise<string>}
 */
export function installSaveExact (d, p, s, r, f) {
  log('installSaveExact')

  const directory = normalize(d)

  log(`Directory is "${directory}"`)

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(getInstallSaveExactCommands(p, s, r, f))

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: directory }, (e, v) => (!e) ? resolve(v) : reject(e))

      stdout.on('data', log)
      stderr.on('data', log)
    })
  )
}

/**
 *  @function install
 *
 *  Spawn the `install` commands
 *
 *  @param {string} d - Directory
 *  @param {Package} p - Package
 *  @param {Configuration} c - Configuration
 *  @param {boolean} s - Save
 *  @param {string} r - Registry
 *
 *  @return {Promise<string>}
 */
export function install (d, p, s, r, f) {
  log('install')

  const directory = normalize(d)

  log(`Directory is "${directory}"`)

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(getInstallCommands(p, s, r, f))

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: directory }, (e, v) => (!e) ? resolve(v) : reject(e))

      stdout.on('data', log)
      stderr.on('data', log)
    })
  )
}

/**
 *  @function execute
 *
 *  Execute the `install --save-exact` and `install` commands according to configuration and parameters
 *
 *  @param {string} d - Directory
 *  @param {Package} p - Package
 *  @param {Configuration} c - Configuration
 *  @param {boolean} s - Save
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *
 *  @return {Promise<void>}
 */
export async function execute (d = DIRECTORY, p = {}, c = {}, s = false, r = REGISTRY, f = false) {
  log('execute')

  const depsExact = getDepsExact(p, c)

  if (depsExact.length) await installSaveExact(d, depsExact, s, r, f)

  const deps = getDeps(p)

  if (deps.length) await install(d, deps, s, r, f)
}
