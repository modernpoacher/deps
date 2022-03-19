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
  getRegistryParameter,
  getForceParameter,
  getSaveExactParameter,
  getSaveBundleParameter,
  getSaveOptionalParameter,
  getSaveDevParameter,
  getSaveProdParameter,
  getCommands,
  normalise,
  transform,
  getDepsExact,
  getDeps
} from './common'

const log = debug('@modernpoacher/deps')

log(`\`deps\` (${platform}) is awake`)

/**
 *  @function getInstallSaveExactCommands
 *
 *  Get the `npm install --save-exact` commands as a string of parameters and arguments
 *
 *  @param {Object} p - Packages
 *  @param {String} r - Registry
 *  @param {Boolean} f - Force
 *
 *  @return {Array}
 */
export const getInstallSaveExactCommands = (p, r, f) => {
  log('getInstallSaveExactCommands')

  const c = transform(p)
  const commands = `npm i ${c}`

  return normalise(
    getRegistryParameter(r, getForceParameter(f, getSaveExactParameter(commands)))
  )
}

/**
 *  @function getInstallCommands
 *
 *  Get the `npm install` commands as a string of parameters and arguments
 *
 *  @param {Object} p - Packages
 *  @param {String} r - Registry
 *  @param {Boolean} f - Force
 *
 *  @return {Array}
 */
export const getInstallCommands = (p, r, f) => {
  log('getInstallCommands')

  const c = transform(p)
  const commands = `npm i ${c}`

  return normalise(
    getRegistryParameter(r, getForceParameter(f, commands))
  )
}

/**
 *  @function getInstallSaveBundleSaveExactCommands
 *
 *  Get the `npm install --save-bundle --save-exact` commands as a string of parameters and arguments
 *
 *  @param {Object} p - Packages
 *  @param {String} r - Registry
 *  @param {Boolean} f - Force
 *
 *  @return {Array}
 */
export function getInstallSaveBundleSaveExactCommands (p, r, f) {
  log('getInstallSaveBundleSaveExactCommands')

  const commands = getInstallSaveExactCommands(p, r, f)

  return normalise(
    getSaveBundleParameter(commands)
  )
}

/**
 *  @function getInstallSaveBundleCommands
 *
 *  Get the `npm install --save-bundle` commands as a string of parameters and arguments
 *
 *  @param {Object} p - Packages
 *  @param {String} r - Registry
 *  @param {Boolean} f - Force
 *
 *  @return {Array}
 */
export function getInstallSaveBundleCommands (p, r, f) {
  log('getInstallSaveBundleCommands')

  const commands = getInstallCommands(p, r, f)

  return normalise(
    getSaveBundleParameter(commands)
  )
}

/**
 *  @function getInstallSaveOptionalSaveExactCommands
 *
 *  Get the `npm install --save-optional --save-exact` commands as a string of parameters and arguments
 *
 *  @param {Object} p - Packages
 *  @param {String} r - Registry
 *  @param {Boolean} f - Force
 *
 *  @return {Array}
 */
export function getInstallSaveOptionalSaveExactCommands (p, r, f) {
  log('getInstallSaveOptionalSaveExactCommands')

  const commands = getInstallSaveExactCommands(p, r, f)

  return normalise(
    getSaveOptionalParameter(commands)
  )
}

/**
 *  @function getInstallSaveOptionalCommands
 *
 *  Get the `npm install --save-optional` commands as a string of parameters and arguments
 *
 *  @param {Object} p - Packages
 *  @param {String} r - Registry
 *  @param {Boolean} f - Force
 *
 *  @return {Array}
 */
export function getInstallSaveOptionalCommands (p, r, f) {
  log('getInstallSaveOptionalCommands')

  const commands = getInstallCommands(p, r, f)

  return normalise(
    getSaveOptionalParameter(commands)
  )
}

/**
 *  @function getInstallSaveDevSaveExactCommands
 *
 *  Get the `npm install --save-dev --save-exact` commands as a string of parameters and arguments
 *
 *  @param {Object} p - Packages
 *  @param {String} r - Registry
 *  @param {Boolean} f - Force
 *
 *  @return {Array}
 */
export function getInstallSaveDevSaveExactCommands (p, r, f) {
  log('getInstallSaveDevSaveExactCommands')

  const commands = getInstallSaveExactCommands(p, r, f)

  return normalise(
    getSaveDevParameter(commands)
  )
}

/**
 *  @function getInstallSaveDevCommands
 *
 *  Get the `npm install --save-dev` commands as a string of parameters and arguments
 *
 *  @param {Object} p - Packages
 *  @param {String} r - Registry
 *  @param {Boolean} f - Force
 *
 *  @return {Array}
 */
export function getInstallSaveDevCommands (p, r, f) {
  log('getInstallSaveDevCommands')

  const commands = getInstallCommands(p, r, f)

  return normalise(
    getSaveDevParameter(commands)
  )
}

/**
 *  @function getInstallSaveProdSaveExactCommands
 *
 *  Get the `npm install --save-prod --save-exact` commands as a string of parameters and arguments
 *
 *  @param {Object} p - Packages
 *  @param {String} r - Registry
 *  @param {Boolean} f - Force
 *
 *  @return {Array}
 */
export function getInstallSaveProdSaveExactCommands (p, r, f) {
  log('getInstallSaveProdSaveExactCommands')

  const commands = getInstallSaveExactCommands(p, r, f)

  return normalise(
    getSaveProdParameter(commands)
  )
}

/**
 *  @function getInstallSaveProdCommands
 *
 *  Get the `npm install --save-prod` commands as a string of parameters and arguments
 *
 *  @param {Object} p - Packages
 *  @param {String} r - Registry
 *  @param {Boolean} f - Force
 *
 *  @return {Array}
 */
export function getInstallSaveProdCommands (p, r, f) {
  log('getInstallSaveProdCommands')

  const commands = getInstallCommands(p, r, f)

  return normalise(
    getSaveProdParameter(commands)
  )
}

/**
 *  @function installSaveBundleSaveExact
 *
 *  Spawn the `npm install --save-bundle --save-exact` commands
 *
 *  @param {String} d - Directory
 *  @param {Object} p - Packages
 *  @param {String} r - Registry
 *  @param {Boolean} f - Force
 *
 *  @return {Promise}
 */
export function installSaveBundleSaveExact (d, p, r, f) {
  log('installSaveBundleSaveExact')

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(d, getInstallSaveBundleSaveExactCommands(p, r, f))

      spawn('/bin/bash', ['-c', commands], { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
        .on('close', resolve)
        .on('error', reject)
    })
  )
}

/**
 *  @function installSaveBundle
 *
 *  Spawn the `npm install --save-bundle` commands
 *
 *  @param {String} d - Directory
 *  @param {Object} p - Packages
 *  @param {String} r - Registry
 *  @param {Boolean} f - Force
 *
 *  @return {Promise}
 */
export function installSaveBundle (d, p, r, f) {
  log('installSaveBundle')

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(d, getInstallSaveBundleCommands(p, r, f))

      spawn('/bin/bash', ['-c', commands], { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
        .on('close', resolve)
        .on('error', reject)
    })
  )
}

/**
 *  @function installSaveOptionalSaveExact
 *
 *  Spawn the `npm install --save-optional --save-exact` commands
 *
 *  @param {String} d - Directory
 *  @param {Object} p - Packages
 *  @param {String} r - Registry
 *  @param {Boolean} f - Force
 *
 *  @return {Promise}
 */
export function installSaveOptionalSaveExact (d, p, r, f) {
  log('installSaveOptionalSaveExact')

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(d, getInstallSaveOptionalSaveExactCommands(p, r, f))

      spawn('/bin/bash', ['-c', commands], { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
        .on('close', resolve)
        .on('error', reject)
    })
  )
}

/**
 *  @function installSaveOptional
 *
 *  Spawn the `npm install --save-optional` commands
 *
 *  @param {String} d - Directory
 *  @param {Object} p - Packages
 *  @param {String} r - Registry
 *  @param {Boolean} f - Force
 *
 *  @return {Promise}
 */
export function installSaveOptional (d, p, r, f) {
  log('installSaveOptional')

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(d, getInstallSaveOptionalCommands(p, r, f))

      spawn('/bin/bash', ['-c', commands], { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
        .on('close', resolve)
        .on('error', reject)
    })
  )
}

/**
 *  @function installSaveDevSaveExact
 *
 *  Spawn the `npm install --save-dev --save-exact` commands
 *
 *  @param {String} d - Directory
 *  @param {Object} p - Packages
 *  @param {String} r - Registry
 *  @param {Boolean} f - Force
 *
 *  @return {Promise}
 */
export function installSaveDevSaveExact (d, p, r, f) {
  log('installSaveDevSaveExact')

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(d, getInstallSaveDevSaveExactCommands(p, r, f))

      spawn('/bin/bash', ['-c', commands], { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
        .on('close', resolve)
        .on('error', reject)
    })
  )
}

/**
 *  @function installSaveDev
 *
 *  Spawn the `npm install --save-dev` commands
 *
 *  @param {String} d - Directory
 *  @param {Object} p - Packages
 *  @param {String} r - Registry
 *  @param {Boolean} f - Force
 *
 *  @return {Promise}
 */
export function installSaveDev (d, p, r, f) {
  log('installSaveDev')

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(d, getInstallSaveDevCommands(p, r, f))

      spawn('/bin/bash', ['-c', commands], { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
        .on('close', resolve)
        .on('error', reject)
    })
  )
}

/**
 *  @function installSaveProdSaveExact
 *
 *  Spawn the `npm install --save-prod --save-exact` commands
 *
 *  @param {String} d - Directory
 *  @param {Object} p - Packages
 *  @param {String} r - Registry
 *  @param {Boolean} f - Force
 *
 *  @return {Promise}
 */
export function installSaveProdSaveExact (d, p, r, f) {
  log('installSaveProdSaveExact')

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(d, getInstallSaveProdSaveExactCommands(p, r, f))

      spawn('/bin/bash', ['-c', commands], { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
        .on('close', resolve)
        .on('error', reject)
    })
  )
}

/**
 *  @function installSaveProd
 *
 *  Spawn the `npm install --save-prod` commands
 *
 *  @param {String} d - Directory
 *  @param {Object} p - Packages
 *  @param {String} r - Registry
 *  @param {Boolean} f - Force
 *
 *  @return {Promise}
 */
export function installSaveProd (d, p, r, f) {
  log('installSaveProd')

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(d, getInstallSaveProdCommands(p, r, f))

      spawn('/bin/bash', ['-c', commands], { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
        .on('close', resolve)
        .on('error', reject)
    })
  )
}

/**
 *  @function executeBundle
 *
 *  Execute the `npm install --save-bundle --save-exact` and `npm install --save-bundle` commands according to configuration and parameters
 *
 *  @param {String} d - Directory
 *  @param {Object} p - Packages
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *  @param {Boolean} f - Force
 *
 *  @return {Promise}
 */
export async function executeBundle (directory = DIRECTORY, packages = {}, configuration = {}, registry = REGISTRY, force = false) {
  log('executeBundle')

  const depsExact = getDepsExact(packages, configuration)

  if (depsExact.length) await installSaveBundleSaveExact(directory, depsExact, registry, force)

  const deps = getDeps(packages)

  if (deps.length) await installSaveBundle(directory, deps, registry, force)
}

/**
 *  @function executeOptional
 *
 *  Execute the `npm install --save-optional --save-exact` and `npm install --save-optional` commands according to configuration and parameters
 *
 *  @param {String} d - Directory
 *  @param {Object} p - Packages
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *  @param {Boolean} f - Force
 *
 *  @return {Promise}
 */
export async function executeOptional (directory = DIRECTORY, packages = {}, configuration = {}, registry = REGISTRY, force = false) {
  log('executeOptional')

  const depsExact = getDepsExact(packages, configuration)

  if (depsExact.length) await installSaveOptionalSaveExact(directory, depsExact, registry)

  const deps = getDeps(packages)

  if (deps.length) await installSaveOptional(directory, deps, registry)
}

/**
 *  @function executeDev
 *
 *  Execute the `npm install --save-dev --save-exact` and `npm install --save-dev` commands according to configuration and parameters
 *
 *  @param {String} d - Directory
 *  @param {Object} p - Packages
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *  @param {Boolean} f - Force
 *
 *  @return {Promise}
 */
export async function executeDev (directory = DIRECTORY, packages = {}, configuration = {}, registry = REGISTRY, force = false) {
  log('executeDev')

  const depsExact = getDepsExact(packages, configuration)

  if (depsExact.length) await installSaveDevSaveExact(directory, depsExact, registry, force)

  const deps = getDeps(packages)

  if (deps.length) await installSaveDev(directory, deps, registry, force)
}

/**
 *  @function executeProd
 *
 *  Execute the `npm install --save-prod --save-exact` and `npm install --save-prod` commands according to configuration and parameters
 *
 *  @param {String} d - Directory
 *  @param {Object} p - Packages
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *  @param {Boolean} f - Force
 *
 *  @return {Promise}
 */
export async function executeProd (directory = DIRECTORY, packages = {}, configuration = {}, registry = REGISTRY, force = false) {
  log('executeProd')

  const depsExact = getDepsExact(packages, configuration)

  if (depsExact.length) await installSaveProdSaveExact(directory, depsExact, registry, force)

  const deps = getDeps(packages)

  if (deps.length) await installSaveProd(directory, deps, registry, force)
}
