import debug from 'debug'

import {
  spawn
} from 'child_process'

import {
  transform,
  getDepsExact,
  getDeps
} from './common'

const log = debug('@modernpoacher/deps')

log('`deps` is awake')

/**
 *  @function getCommands
 *
 *  Get the `install` and `install -E` commands as an array containing configuration and parameters as flags
 *
 *  @param {Object} v - Values
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *  @param {Boolean} e - Exact
 *
 *  @return {Array}
 */
export const getCommands = (v, c, r, e) => (
  ['install']
    .concat(transform(v, c)) // string or array
    .concat(r ? ['--registry', r] : [])
    .concat(e ? '--save-exact' : [])
)

/**
 *  @function getSaveBundleCommands
 *
 *  Get the `--save-bundle` commands as an array containing configuration and parameters as flags
 *
 *  @param {Object} v - Values
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *  @param {Boolean} e - Exact
 *
 *  @return {Array}
 */
export function getSaveBundleCommands (v, c, r, e = false) {
  log('getSaveBundleCommands')

  return (
    getCommands(v, c, r, e).concat('--save-bundle')
  )
}

/**
 *  @function getSaveOptionalCommands
 *
 *  Get the `--save-optional` commands as an array containing configuration and parameters as flags
 *
 *  @param {Object} v - Values
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *  @param {Boolean} e - Exact
 *
 *  @return {Array}
 */
export function getSaveOptionalCommands (v, c, r, e = false) {
  log('getSaveOptionalCommands')

  return (
    getCommands(v, c, r, e).concat('--save-optional')
  )
}

/**
 *  @function getSaveDevCommands
 *
 *  Get the `--save-dev` commands as an array containing configuration and parameters as flags
 *
 *  @param {Object} v - Values
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *  @param {Boolean} e - Exact
 *
 *  @return {Array}
 */
export function getSaveDevCommands (v, c, r, e = false) {
  log('getSaveDevCommands')

  return (
    getCommands(v, c, r, e).concat('--save-dev')
  )
}

/**
 *  @function getSaveProdCommands
 *
 *  Get the `--save-prod` commands as an array containing configuration and parameters as flags
 *
 *  @param {Object} v - Values
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *  @param {Boolean} e - Exact
 *
 *  @return {Array}
 */
export function getSaveProdCommands (v, c, r, e = false) {
  log('getSaveProdCommands')

  return (
    getCommands(v, c, r, e).concat('--save-prod')
  )
}

/**
 *  @function installSaveBundleExact
 *
 *  Spawn the `install --save-bundle -E` commands
 *
 *  @param {String} d - Directory
 *  @param {Object} v - Values
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *
 *  @return {Promise}
 */
export function installSaveBundleExact (d, v, c, r) {
  log('installSaveBundleExact')

  return (
    new Promise((resolve, reject) => {
      const commands = getSaveBundleCommands(v, c, r, true)

      spawn(`cd '${d}' && npm`, commands, { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
        .on('close', resolve)
        .on('error', reject)
    })
  )
}

/**
 *  @function installSaveBundle
 *
 *  Spawn the `install --save-bundle` commands
 *
 *  @param {String} d - Directory
 *  @param {Object} v - Values
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *
 *  @return {Promise}
 */
export function installSaveBundle (d, v, c, r) {
  log('installSaveBundle')

  return (
    new Promise((resolve, reject) => {
      const commands = getSaveBundleCommands(v, c, r)

      spawn(`cd '${d}' && npm`, commands, { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
        .on('close', resolve)
        .on('error', reject)
    })
  )
}

/**
 *  @function installSaveOptionalExact
 *
 *  Spawn the `install --save-optional -E` commands
 *
 *  @param {String} d - Directory
 *  @param {Object} v - Values
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *
 *  @return {Promise}
 */
export function installSaveOptionalExact (d, v, c, r) {
  log('installSaveOptionalExact')

  return (
    new Promise((resolve, reject) => {
      const commands = getSaveOptionalCommands(v, c, r, true)

      spawn(`cd '${d}' && npm`, commands, { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
        .on('close', resolve)
        .on('error', reject)
    })
  )
}

/**
 *  @function installSaveOptional
 *
 *  Spawn the `install --save-optional` commands
 *
 *  @param {String} d - Directory
 *  @param {Object} v - Values
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *
 *  @return {Promise}
 */
export function installSaveOptional (d, v, c, r) {
  log('installSaveOptional')

  return (
    new Promise((resolve, reject) => {
      const commands = getSaveOptionalCommands(v, c, r)

      spawn(`cd '${d}' && npm`, commands, { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
        .on('close', resolve)
        .on('error', reject)
    })
  )
}

/**
 *  @function installSaveDevExact
 *
 *  Spawn the `install --save-dev -E` commands
 *
 *  @param {String} d - Directory
 *  @param {Object} v - Values
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *
 *  @return {Promise}
 */
export function installSaveDevExact (d, v, c, r) {
  log('installSaveDevExact')

  return (
    new Promise((resolve, reject) => {
      const commands = getSaveDevCommands(v, c, r, true)

      spawn(`cd '${d}' && npm`, commands, { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
        .on('close', resolve)
        .on('error', reject)
    })
  )
}

/**
 *  @function installSaveDev
 *
 *  Spawn the `install --save-dev` commands
 *
 *  @param {String} d - Directory
 *  @param {Object} v - Values
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *
 *  @return {Promise}
 */
export function installSaveDev (d, v, c, r) {
  log('installSaveDev')

  return (
    new Promise((resolve, reject) => {
      const commands = getSaveDevCommands(v, c, r)

      spawn(`cd '${d}' && npm`, commands, { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
        .on('close', resolve)
        .on('error', reject)
    })
  )
}

/**
 *  @function installSaveProdExact
 *
 *  Spawn the `install --save-prod -E` commands
 *
 *  @param {String} d - Directory
 *  @param {Object} v - Values
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *
 *  @return {Promise}
 */
export function installSaveProdExact (d, v, c, r) {
  log('installSaveProdExact')

  return (
    new Promise((resolve, reject) => {
      const commands = getSaveProdCommands(v, c, r, true)

      spawn(`cd '${d}' && npm`, commands, { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
        .on('close', resolve)
        .on('error', reject)
    })
  )
}

/**
 *  @function installSaveProd
 *
 *  Spawn the `install --save-prod` commands
 *
 *  @param {String} d - Directory
 *  @param {Object} v - Values
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *
 *  @return {Promise}
 */
export function installSaveProd (d, v, c, r) {
  log('installSaveProd')

  return (
    new Promise((resolve, reject) => {
      const commands = getSaveProdCommands(v, c, r)

      spawn(`cd '${d}' && npm`, commands, { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
        .on('close', resolve)
        .on('error', reject)
    })
  )
}

/**
 *  @function executeBundle
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
export async function executeBundle (directory = '.', packages = {}, configuration = {}, registry) {
  log('executeBundle')

  const depsExact = getDepsExact(packages, configuration)

  if (depsExact.length) await installSaveBundleExact(directory, depsExact, configuration, registry)

  const deps = getDeps(packages)

  if (deps.length) await installSaveBundle(directory, deps, configuration, registry)
}

/**
 *  @function executeOptional
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
export async function executeOptional (directory = '.', packages = {}, configuration = {}, registry) {
  log('executeOptional')

  const depsExact = getDepsExact(packages, configuration)

  if (depsExact.length) await installSaveOptionalExact(directory, depsExact, configuration, registry)

  const deps = getDeps(packages)

  if (deps.length) await installSaveOptional(directory, deps, configuration, registry)
}

/**
 *  @function executeDev
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
export async function executeDev (directory = '.', packages = {}, configuration = {}, registry) {
  log('executeDev')

  const depsExact = getDepsExact(packages, configuration)

  if (depsExact.length) await installSaveDevExact(directory, depsExact, configuration, registry)

  const deps = getDeps(packages)

  if (deps.length) await installSaveDev(directory, deps, configuration, registry)
}

/**
 *  @function executeProd
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
export async function executeProd (directory = '.', packages = {}, configuration = {}, registry) {
  log('executeProd')

  const depsExact = getDepsExact(packages, configuration)

  if (depsExact.length) await installSaveProdExact(directory, depsExact, configuration, registry)

  const deps = getDeps(packages)

  if (deps.length) await installSaveProd(directory, deps, configuration, registry)
}
