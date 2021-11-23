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
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *  @param {Boolean} e - Exact
 *
 *  @return {Array}
 */
export const getInstallSaveExactCommands = (p, c, r, f) => {
  log('getInstallSaveExactCommands')

  const commands = `npm i ${transform(p, c)}`

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
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *  @param {Boolean} e - Exact
 *
 *  @return {Array}
 */
export const getInstallCommands = (p, c, r, f) => {
  log('getInstallCommands')

  const commands = `npm i ${transform(p, c)}`

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
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *  @param {Boolean} e - Exact
 *
 *  @return {Array}
 */
export function getInstallSaveBundleSaveExactCommands (p, c, r, f) {
  log('getInstallSaveBundleSaveExactCommands')

  const commands = getInstallSaveExactCommands(p, c, r, f)

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
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *  @param {Boolean} e - Exact
 *
 *  @return {Array}
 */
export function getInstallSaveBundleCommands (p, c, r, f) {
  log('getInstallSaveBundleCommands')

  const commands = getInstallCommands(p, c, r, f)

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
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *  @param {Boolean} e - Exact
 *
 *  @return {Array}
 */
export function getInstallSaveOptionalSaveExactCommands (p, c, r, f) {
  log('getInstallSaveOptionalSaveExactCommands')

  const commands = getInstallSaveExactCommands(p, c, r, f)

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
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *  @param {Boolean} e - Exact
 *
 *  @return {Array}
 */
export function getInstallSaveOptionalCommands (p, c, r, f) {
  log('getInstallSaveOptionalCommands')

  const commands = getInstallCommands(p, c, r, f)

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
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *  @param {Boolean} e - Exact
 *
 *  @return {Array}
 */
export function getInstallSaveDevSaveExactCommands (p, c, r, f) {
  log('getInstallSaveDevSaveExactCommands')

  const commands = getInstallSaveExactCommands(p, c, r, f)

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
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *  @param {Boolean} e - Exact
 *
 *  @return {Array}
 */
export function getInstallSaveDevCommands (p, c, r, f) {
  log('getInstallSaveDevCommands')

  const commands = getInstallCommands(p, c, r, f)

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
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *  @param {Boolean} e - Exact
 *
 *  @return {Array}
 */
export function getInstallSaveProdSaveExactCommands (p, c, r, f) {
  log('getInstallSaveProdSaveExactCommands')

  const commands = getInstallSaveExactCommands(p, c, r, f)

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
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *  @param {Boolean} e - Exact
 *
 *  @return {Array}
 */
export function getInstallSaveProdCommands (p, c, r, f) {
  log('getInstallSaveProdCommands')

  const commands = getInstallCommands(p, c, r, f)

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
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *
 *  @return {Promise}
 */
export function installSaveBundleSaveExact (d, p, c, r, f) {
  log('installSaveBundleSaveExact')

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(d, getInstallSaveBundleSaveExactCommands(p, c, r, f))

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
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *
 *  @return {Promise}
 */
export function installSaveBundle (d, p, c, r, f) {
  log('installSaveBundle')

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(d, getInstallSaveBundleCommands(p, c, r, f))

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
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *
 *  @return {Promise}
 */
export function installSaveOptionalSaveExact (d, p, c, r, f) {
  log('installSaveOptionalSaveExact')

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(d, getInstallSaveOptionalSaveExactCommands(p, c, r, f))

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
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *
 *  @return {Promise}
 */
export function installSaveOptional (d, p, c, r, f) {
  log('installSaveOptional')

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(d, getInstallSaveOptionalCommands(p, c, r, f))

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
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *
 *  @return {Promise}
 */
export function installSaveDevSaveExact (d, p, c, r, f) {
  log('installSaveDevSaveExact')

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(d, getInstallSaveDevSaveExactCommands(p, c, r, f))

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
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *
 *  @return {Promise}
 */
export function installSaveDev (d, p, c, r, f) {
  log('installSaveDev')

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(d, getInstallSaveDevCommands(p, c, r, f))

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
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *
 *  @return {Promise}
 */
export function installSaveProdSaveExact (d, p, c, r, f) {
  log('installSaveProdSaveExact')

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(d, getInstallSaveProdSaveExactCommands(p, c, r, f))

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
 *  @param {Object} c - Configuration
 *  @param {String} r - Registry
 *
 *  @return {Promise}
 */
export function installSaveProd (d, p, c, r, f) {
  log('installSaveProd')

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(d, getInstallSaveProdCommands(p, c, r, f))

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
 *  @param {Boolean} s - Save
 *  @param {String} r - Registry
 *
 *  @return {Promise}
 */
export async function executeBundle (directory = DIRECTORY, packages = {}, configuration = {}, registry = REGISTRY, force = false) {
  log('executeBundle')

  const depsSaveExact = getDepsExact(packages, configuration)

  if (depsSaveExact.length) await installSaveBundleSaveExact(directory, depsSaveExact, configuration, registry, force)

  const deps = getDeps(packages)

  if (deps.length) await installSaveBundle(directory, deps, configuration, registry, force)
}

/**
 *  @function executeOptional
 *
 *  Execute the `npm install --save-optional --save-exact` and `npm install --save-optional` commands according to configuration and parameters
 *
 *  @param {String} d - Directory
 *  @param {Object} p - Packages
 *  @param {Object} c - Configuration
 *  @param {Boolean} s - Save
 *  @param {String} r - Registry
 *
 *  @return {Promise}
 */
export async function executeOptional (directory = DIRECTORY, packages = {}, configuration = {}, registry = REGISTRY, force = false) {
  log('executeOptional')

  const depsSaveExact = getDepsExact(packages, configuration)

  if (depsSaveExact.length) await installSaveOptionalSaveExact(directory, depsSaveExact, configuration, registry)

  const deps = getDeps(packages)

  if (deps.length) await installSaveOptional(directory, deps, configuration, registry)
}

/**
 *  @function executeDev
 *
 *  Execute the `npm install --save-dev --save-exact` and `npm install --save-dev` commands according to configuration and parameters
 *
 *  @param {String} d - Directory
 *  @param {Object} p - Packages
 *  @param {Object} c - Configuration
 *  @param {Boolean} s - Save
 *  @param {String} r - Registry
 *
 *  @return {Promise}
 */
export async function executeDev (directory = DIRECTORY, packages = {}, configuration = {}, registry = REGISTRY, force = false) {
  log('executeDev')

  const depsSaveExact = getDepsExact(packages, configuration)

  if (depsSaveExact.length) await installSaveDevSaveExact(directory, depsSaveExact, configuration, registry, force)

  const deps = getDeps(packages)

  if (deps.length) await installSaveDev(directory, deps, configuration, registry, force)
}

/**
 *  @function executeProd
 *
 *  Execute the `npm install --save-prod --save-exact` and `npm install --save-prod` commands according to configuration and parameters
 *
 *  @param {String} d - Directory
 *  @param {Object} p - Packages
 *  @param {Object} c - Configuration
 *  @param {Boolean} s - Save
 *  @param {String} r - Registry
 *
 *  @return {Promise}
 */
export async function executeProd (directory = DIRECTORY, packages = {}, configuration = {}, registry = REGISTRY, force = false) {
  log('executeProd')

  const depsSaveExact = getDepsExact(packages, configuration)

  if (depsSaveExact.length) await installSaveProdSaveExact(directory, depsSaveExact, configuration, registry, force)

  const deps = getDeps(packages)

  if (deps.length) await installSaveProd(directory, deps, configuration, registry, force)
}
