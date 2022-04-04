import debug from 'debug'

import {
  platform
} from 'os'

import {
  spawn
} from 'child_process'

import {
  DIRECTORY,
  REGISTRY,
  getNoSaveParameter,
  getRegistryParameter,
  getForceParameter,
  getSaveExactParameter,
  getCommands,
  normalise,
  transform,
  getDepsExact,
  getDeps
} from '@modernpoacher/deps/common'

const log = debug('@modernpoacher/deps:install')

log(`\`install\` (${platform}) is awake`)

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
export const getInstallSaveExactCommands = (p, s, r, f) => {
  log('getInstallSaveExactCommands')

  const c = transform(p)
  const commands = `npm i ${c}`

  return normalise(
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
export const getInstallCommands = (p, s, r, f) => {
  log('getInstallCommands')

  const c = transform(p)
  const commands = `npm i ${c}`

  return normalise(
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
      const commands = getCommands(d, getInstallSaveExactCommands(p, s, r, f))

      spawn('/bin/bash', ['-c', commands], { shell: true, stdio: 'inherit' }, function handleComplete (e) {
        if (e) {
          log(e)

          return (
            reject(e)
          )
        }

        return (
          resolve()
        )
      })
        .on('close', resolve)
        .on('error', function handleError (e) {
          log(e)

          reject(e)
        })
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
      const commands = getCommands(d, getInstallCommands(p, s, r, f))

      spawn('/bin/bash', ['-c', commands], { shell: true, stdio: 'inherit' }, function handleComplete (e) {
        if (e) {
          log(e)

          return (
            reject(e)
          )
        }

        return (
          resolve()
        )
      })
        .on('close', resolve)
        .on('error', function handleError (e) {
          log(e)

          reject(e)
        })
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
