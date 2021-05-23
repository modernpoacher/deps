import {
  spawn
} from 'child_process'

import debug from 'debug'

import {
  DIRECTORY,
  REGISTRY,
  getNoSaveParameter,
  getRegistryParameter,
  getSaveExactParameter,
  getCommands,
  normalise,
  transform,
  getDepsExact,
  getDeps
} from '@modernpoacher/deps/common'

const log = debug('@modernpoacher/deps:install')

log('`install` is awake')

/**
 *  @function getInstallSaveExactCommands
 *
 *  Get the `install --save-exact` commands as a string of parameters and arguments
 *
 *  @param {Object} p - Packages
 *  @param {Object} c - Configuration
 *  @param {Boolean} s - Save
 *  @param {String} r - Registry
 *  @param {Boolean} e - Exact
 *
 *  @return {Array}
 */
export const getInstallSaveExactCommands = (p, c, s, r) => {
  log('getInstallSaveExactCommands')

  const commands = `npm i ${transform(p, c)}`

  return normalise(
    getNoSaveParameter(s, getRegistryParameter(r, getSaveExactParameter(commands)))
  )
}

/**
 *  @function getInstallCommands
 *
 *  Get the `install` commands as a string of parameters and arguments
 *
 *  @param {Object} p - Packages
 *  @param {Object} c - Configuration
 *  @param {Boolean} s - Save
 *  @param {String} r - Registry
 *  @param {Boolean} e - Exact
 *
 *  @return {Array}
 */
export const getInstallCommands = (p, c, s, r) => {
  log('getInstallCommands')

  const commands = `npm i ${transform(p, c)}`

  return normalise(
    getNoSaveParameter(s, getRegistryParameter(r, commands))
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
export function installSaveExact (d, p, c, s, r) {
  log('installSaveExact')

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(d, getInstallSaveExactCommands(p, c, s, r))

      spawn('/bin/bash', ['-c', commands], { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
        .on('close', resolve)
        .on('error', reject)
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
export function install (d, p, c, s, r) {
  log('install')

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(d, getInstallCommands(p, c, s, r))

      spawn('/bin/bash', ['-c', commands], { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
        .on('close', resolve)
        .on('error', reject)
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
export async function execute (directory = DIRECTORY, packages = {}, configuration = {}, save = false, registry = REGISTRY) {
  log('execute')

  const depsExact = getDepsExact(packages, configuration)

  if (depsExact.length) await installSaveExact(directory, depsExact, configuration, save, registry)

  const deps = getDeps(packages)

  if (deps.length) await install(directory, deps, configuration, save, registry)
}
