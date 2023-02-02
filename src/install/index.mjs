import debug from 'debug'

import {
  normalize
} from 'path'

import {
  platform
} from 'os'

import {
  exec
} from 'child_process'

import {
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

log(`\`install\` (${platform}) is awake`)

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

/**
 *  @function getInstallSaveExactCommands
 *
 *  Get the `install --save-exact` commands as a string of parameters and arguments
 *
 *  @param {Object} p - Packages
 *  @param {Boolean} s - Save
 *  @param {String} r - Registry
 *  @param {Boolean} f - Force
 *
 *  @return {Array}
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
 *  @param {Object} p - Packages
 *  @param {Boolean} s - Save
 *  @param {String} r - Registry
 *  @param {Boolean} f - Force
 *
 *  @return {Array}
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
 *  @param {String} d - Directory
 *  @param {Object} p - Packages
 *  @param {Object} c - Configuration
 *  @param {Boolean} s - Save
 *  @param {String} r - Registry
 *
 *  @return {Promise}
 */
export function installSaveExact (d, p, s, r, f) {
  log('installSaveExact')

  return (
    new Promise((resolve, reject) => {
      const D = normalize(d)
      const commands = getCommands(D, getInstallSaveExactCommands(p, s, r, f))

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: D }, (e, v) => (!e) ? resolve(v) : reject(e))

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
 *  @param {String} d - Directory
 *  @param {Object} p - Packages
 *  @param {Object} c - Configuration
 *  @param {Boolean} s - Save
 *  @param {String} r - Registry
 *
 *  @return {Promise}
 */
export function install (d, p, s, r, f) {
  log('install')

  return (
    new Promise((resolve, reject) => {
      const D = normalize(d)
      const commands = getCommands(D, getInstallCommands(p, s, r, f))

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: D }, (e, v) => (!e) ? resolve(v) : reject(e))

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
 *  @param {String} d - Directory
 *  @param {Object} p - Packages
 *  @param {Object} c - Configuration
 *  @param {Boolean} s - Save
 *  @param {String} r - Registry
 *
 *  @return {Promise}
 */
export async function execute (directory = DIRECTORY, packages = {}, configuration = {}, save = false, registry = REGISTRY, force = false) {
  log('execute')

  const depsExact = getDepsExact(packages, configuration)

  if (depsExact.length) await installSaveExact(directory, depsExact, save, registry, force)

  const deps = getDeps(packages)

  if (deps.length) await install(directory, deps, save, registry, force)
}
