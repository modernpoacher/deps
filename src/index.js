import debug from 'debug'

import {
  spawn
} from 'child_process'

import {
  DIRECTORY,
  REGISTRY,
  getRegistryParam,
  getSaveExactParam,
  getCommands,
  normalise,
  transform,
  getDepsExact,
  getDeps
} from './common'

const log = debug('@modernpoacher/deps')

log('`deps` is awake')

/**
 *  @function getInstallCommands
 *
 *  Get the `npm install` or `npm install -E` commands as a string of parameters and arguments
 *
 *  @param {Object} p - Packages
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *  @param {Boolean} e - Exact
 *
 *  @return {Array}
 */
export const getInstallCommands = (p, c, r, e = false) => {
  log('getInstallCommands')

  const commands = `npm i ${transform(p, c)}`

  return normalise(
    getRegistryParam(r, getSaveExactParam(e, commands))
  )
}

/**
 *  @function getInstallSaveBundleCommands
 *
 *  Get the `--save-bundle` commands as a string of parameters and arguments
 *
 *  @param {Object} p - Packages
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *  @param {Boolean} e - Exact
 *
 *  @return {Array}
 */
export function getInstallSaveBundleCommands (p, c, r, e) {
  log('getInstallSaveBundleCommands')

  return normalise(
    getInstallCommands(p, c, r, e).concat(' --save-bundle')
  )
}

/**
 *  @function getInstallSaveOptionalCommands
 *
 *  Get the `--save-optional` commands as a string of parameters and arguments
 *
 *  @param {Object} p - Packages
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *  @param {Boolean} e - Exact
 *
 *  @return {Array}
 */
export function getInstallSaveOptionalCommands (p, c, r, e) {
  log('getInstallSaveOptionalCommands')

  return normalise(
    getInstallCommands(p, c, r, e).concat(' --save-optional')
  )
}

/**
 *  @function getInstallSaveDevCommands
 *
 *  Get the `--save-dev` commands as a string of parameters and arguments
 *
 *  @param {Object} p - Packages
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *  @param {Boolean} e - Exact
 *
 *  @return {Array}
 */
export function getInstallSaveDevCommands (p, c, r, e) {
  log('getInstallSaveDevCommands')

  return normalise(
    getInstallCommands(p, c, r, e).concat(' --save-dev')
  )
}

/**
 *  @function getInstallSaveProdCommands
 *
 *  Get the `--save-prod` commands as a string of parameters and arguments
 *
 *  @param {Object} p - Packages
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *  @param {Boolean} e - Exact
 *
 *  @return {Array}
 */
export function getInstallSaveProdCommands (p, c, r, e) {
  log('getInstallSaveProdCommands')

  return normalise(
    getInstallCommands(p, c, r, e).concat(' --save-prod')
  )
}

/**
 *  @function installSaveBundleExact
 *
 *  Spawn the `install --save-bundle -E` commands
 *
 *  @param {String} d - Directory
 *  @param {Object} p - Packages
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *
 *  @return {Promise}
 */
export function installSaveBundleExact (d, p, c, r) {
  log('installSaveBundleExact')

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(d, getInstallSaveBundleCommands(p, c, r, true))

      spawn('/bin/bash', ['-c', commands], { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
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
 *  @param {Object} p - Packages
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *
 *  @return {Promise}
 */
export function installSaveBundle (d, p, c, r) {
  log('installSaveBundle')

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(d, getInstallSaveBundleCommands(p, c, r))

      spawn('/bin/bash', ['-c', commands], { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
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
 *  @param {Object} p - Packages
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *
 *  @return {Promise}
 */
export function installSaveOptionalExact (d, p, c, r) {
  log('installSaveOptionalExact')

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(d, getInstallSaveOptionalCommands(p, c, r, true))

      spawn('/bin/bash', ['-c', commands], { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
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
 *  @param {Object} p - Packages
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *
 *  @return {Promise}
 */
export function installSaveOptional (d, p, c, r) {
  log('installSaveOptional')

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(d, getInstallSaveOptionalCommands(p, c, r))

      spawn('/bin/bash', ['-c', commands], { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
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
 *  @param {Object} p - Packages
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *
 *  @return {Promise}
 */
export function installSaveDevExact (d, p, c, r) {
  log('installSaveDevExact')

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(d, getInstallSaveDevCommands(p, c, r, true))

      spawn('/bin/bash', ['-c', commands], { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
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
 *  @param {Object} p - Packages
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *
 *  @return {Promise}
 */
export function installSaveDev (d, p, c, r) {
  log('installSaveDev')

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(d, getInstallSaveDevCommands(p, c, r))

      spawn('/bin/bash', ['-c', commands], { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
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
 *  @param {Object} p - Packages
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *
 *  @return {Promise}
 */
export function installSaveProdExact (d, p, c, r) {
  log('installSaveProdExact')

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(d, getInstallSaveProdCommands(p, c, r, true))

      spawn('/bin/bash', ['-c', commands], { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
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
 *  @param {Object} p - Packages
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *
 *  @return {Promise}
 */
export function installSaveProd (d, p, c, r) {
  log('installSaveProd')

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(d, getInstallSaveProdCommands(p, c, r))

      spawn('/bin/bash', ['-c', commands], { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
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
export async function executeBundle (directory = DIRECTORY, packages = {}, configuration = {}, registry = REGISTRY) {
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
export async function executeOptional (directory = DIRECTORY, packages = {}, configuration = {}, registry = REGISTRY) {
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
export async function executeDev (directory = DIRECTORY, packages = {}, configuration = {}, registry = REGISTRY) {
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
export async function executeProd (directory = DIRECTORY, packages = {}, configuration = {}, registry = REGISTRY) {
  log('executeProd')

  const depsExact = getDepsExact(packages, configuration)

  if (depsExact.length) await installSaveProdExact(directory, depsExact, configuration, registry)

  const deps = getDeps(packages)

  if (deps.length) await installSaveProd(directory, deps, configuration, registry)
}
