import {
  spawn
} from 'child_process'

import debug from 'debug'

import {
  initialiseAt,
  transform,
  getDepsExact,
  getDeps
} from '@modernpoacher/deps/common'

const log = debug('@modernpoacher/deps:install')

log('`install` is awake')

/**
 *  @function getCommands
 *
 *  Get the `install` and `install -E` commands as an array containing configuration and parameters as flags
 *
 *  @param {Object} p - Packages
 *  @param {Object} c - Configuration
 *  @param {Boolean} s - Save
 *  @param {String} r - Registry
 *  @param {Boolean} e - Exact
 *
 *  @return {Array}
 */
export const getCommands = (p, c, s, r, e = false) => (
  ['npm', 'i']
    .concat(transform(p, c)) // string or array
    .concat(s ? [] : '--no-save')
    .concat(r ? ['--registry', r] : [])
    .concat(e ? '--save-exact' : [])
)

/**
 *  @function installExact
 *
 *  Spawn the `install -E` commands
 *
 *  @param {String} d - Directory
 *  @param {Object} p - Packages
 *  @param {Object} c - Configuration
 *  @param {Boolean} s - Save
 *  @param {String} r - Registry
 *
 *  @return {Promise}
 */
export function installExact (d, p, c, s, r) {
  log('installExact')

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(p, c, s, r, true)

      spawn(initialiseAt(d), commands, { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
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
      const commands = getCommands(p, c, s, r)

      spawn(initialiseAt(d), commands, { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
        .on('close', resolve)
        .on('error', reject)
    })
  )
}

/**
 *  @function execute
 *
 *  Execute the `install -E` and `install` commands according to configuration and parameters
 *
 *  @param {String} d - Directory
 *  @param {Object} p - Packages
 *  @param {Object} c - Configuration
 *  @param {Boolean} s - Save
 *  @param {String} r - Registry
 *
 *  @return {Promise}
 */
export async function execute (directory = '.', packages = {}, configuration = {}, save = false, registry = 'https://registry.npmjs.org') {
  log('execute')

  const depsExact = getDepsExact(packages, configuration)

  if (depsExact.length) await installExact(directory, depsExact, configuration, save, registry)

  const deps = getDeps(packages)

  if (deps.length) await install(directory, deps, configuration, save, registry)
}
