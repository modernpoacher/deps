/**
 * Package or configuration dependencies
 * @typedef {import('./common/index.mjs').Dependencies} Dependencies
 */

/**
 * Dependency descriptor
 * @typedef {import('./common/index.mjs').DependencyDescriptor} DependencyDescriptor
 */

import debug from 'debug'

import {
  normalize
} from 'path'

import {
  exec
} from 'child_process'

import {
  VERSION,
  PLATFORM
} from '#deps/src/common/env'

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
  normalizeCommands,
  transform,
  getDepsExact,
  getDeps
} from '#deps/src/common'

const log = debug('@modernpoacher/deps')

log(`\`deps\` (${VERSION} - ${PLATFORM}) is awake`)

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

function use (key) {
  const log = debug(`@modernpoacher/deps:${key}`)

  return function use (v) {
    const s = v.trim()

    if (s === '') return

    return (
      log(s)
    )
  }
}

/**
 *  @function getInstallSaveExactCommands
 *
 *  Get the `npm install --save-exact` commands as a string of parameters and arguments
 *
 *  @param {DependencyDescriptor|DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *
 *  @return {string}
 */
export function getInstallSaveExactCommands (deps, r, f) {
  log('getInstallSaveExactCommands')

  const c = transform(deps)
  const commands = `npm i ${c}`

  return normalizeCommands(
    getRegistryParameter(r, getForceParameter(f, getSaveExactParameter(commands)))
  )
}

/**
 *  @function getInstallCommands
 *
 *  Get the `npm install` commands as a string of parameters and arguments
 *
 *  @param {DependencyDescriptor|DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *
 *  @return {string}
 */
export function getInstallCommands (deps, r, f) {
  log('getInstallCommands')

  const c = transform(deps)
  const commands = `npm i ${c}`

  return normalizeCommands(
    getRegistryParameter(r, getForceParameter(f, commands))
  )
}

/**
 *  @function getInstallSaveBundleSaveExactCommands
 *
 *  Get the `npm install --save-bundle --save-exact` commands as a string of parameters and arguments
 *
 *  @param {DependencyDescriptor|DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *
 *  @return {string}
 */
export function getInstallSaveBundleSaveExactCommands (deps, r, f) {
  log('getInstallSaveBundleSaveExactCommands')

  const commands = getInstallSaveExactCommands(deps, r, f)

  return normalizeCommands(
    getSaveBundleParameter(commands)
  )
}

/**
 *  @function getInstallSaveBundleCommands
 *
 *  Get the `npm install --save-bundle` commands as a string of parameters and arguments
 *
 *  @param {DependencyDescriptor|DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *
 *  @return {string}
 */
export function getInstallSaveBundleCommands (deps, r, f) {
  log('getInstallSaveBundleCommands')

  const commands = getInstallCommands(deps, r, f)

  return normalizeCommands(
    getSaveBundleParameter(commands)
  )
}

/**
 *  @function getInstallSaveOptionalSaveExactCommands
 *
 *  Get the `npm install --save-optional --save-exact` commands as a string of parameters and arguments
 *
 *  @param {DependencyDescriptor|DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *
 *  @return {string}
 */
export function getInstallSaveOptionalSaveExactCommands (deps, r, f) {
  log('getInstallSaveOptionalSaveExactCommands')

  const commands = getInstallSaveExactCommands(deps, r, f)

  return normalizeCommands(
    getSaveOptionalParameter(commands)
  )
}

/**
 *  @function getInstallSaveOptionalCommands
 *
 *  Get the `npm install --save-optional` commands as a string of parameters and arguments
 *
 *  @param {DependencyDescriptor|DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *
 *  @return {string}
 */
export function getInstallSaveOptionalCommands (deps, r, f) {
  log('getInstallSaveOptionalCommands')

  const commands = getInstallCommands(deps, r, f)

  return normalizeCommands(
    getSaveOptionalParameter(commands)
  )
}

/**
 *  @function getInstallSaveDevSaveExactCommands
 *
 *  Get the `npm install --save-dev --save-exact` commands as a string of parameters and arguments
 *
 *  @param {DependencyDescriptor|DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *
 *  @return {string}
 */
export function getInstallSaveDevSaveExactCommands (deps, r, f) {
  log('getInstallSaveDevSaveExactCommands')

  const commands = getInstallSaveExactCommands(deps, r, f)

  return normalizeCommands(
    getSaveDevParameter(commands)
  )
}

/**
 *  @function getInstallSaveDevCommands
 *
 *  Get the `npm install --save-dev` commands as a string of parameters and arguments
 *
 *  @param {DependencyDescriptor|DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *
 *  @return {string}
 */
export function getInstallSaveDevCommands (deps, r, f) {
  log('getInstallSaveDevCommands')

  const commands = getInstallCommands(deps, r, f)

  return normalizeCommands(
    getSaveDevParameter(commands)
  )
}

/**
 *  @function getInstallSaveProdSaveExactCommands
 *
 *  Get the `npm install --save-prod --save-exact` commands as a string of parameters and arguments
 *
 *  @param {DependencyDescriptor|DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *
 *  @return {string}
 */
export function getInstallSaveProdSaveExactCommands (deps, r, f) {
  log('getInstallSaveProdSaveExactCommands')

  const commands = getInstallSaveExactCommands(deps, r, f)

  return normalizeCommands(
    getSaveProdParameter(commands)
  )
}

/**
 *  @function getInstallSaveProdCommands
 *
 *  Get the `npm install --save-prod` commands as a string of parameters and arguments
 *
 *  @param {DependencyDescriptor|DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *
 *  @return {string}
 */
export function getInstallSaveProdCommands (deps, r, f) {
  log('getInstallSaveProdCommands')

  const commands = getInstallCommands(deps, r, f)

  return normalizeCommands(
    getSaveProdParameter(commands)
  )
}

/**
 *  @function installSaveBundleSaveExact
 *
 *  Spawn the `npm install --save-bundle --save-exact` commands
 *
 *  @param {string} d - Directory
 *  @param {DependencyDescriptor|DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *
 *  @return {Promise}
 */
export function installSaveBundleSaveExact (d, deps, r, f) {
  log('installSaveBundleSaveExact')

  const directory = normalize(d)

  log(`Directory is "${directory}"`)

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(getInstallSaveBundleSaveExactCommands(deps, r, f))

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: directory }, (e, v) => {
        (!e)
          ? resolve(v)
          : reject(e)
      })

      const log = use('install-save-bundle-save-exact')

      stdout.on('data', log)
      stderr.on('data', log)
    })
  )
}

/**
 *  @function installSaveBundle
 *
 *  Spawn the `npm install --save-bundle` commands
 *
 *  @param {string} d - Directory
 *  @param {DependencyDescriptor|DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *
 *  @return {Promise}
 */
export function installSaveBundle (d, deps, r, f) {
  log('installSaveBundle')

  const directory = normalize(d)

  log(`Directory is "${directory}"`)

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(getInstallSaveBundleCommands(deps, r, f))

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: directory }, (e, v) => {
        (!e)
          ? resolve(v)
          : reject(e)
      })

      const log = use('install-save-bundle')

      stdout.on('data', log)
      stderr.on('data', log)
    })
  )
}

/**
 *  @function installSaveOptionalSaveExact
 *
 *  Spawn the `npm install --save-optional --save-exact` commands
 *
 *  @param {string} d - Directory
 *  @param {DependencyDescriptor|DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *
 *  @return {Promise}
 */
export function installSaveOptionalSaveExact (d, deps, r, f) {
  log('installSaveOptionalSaveExact')

  const directory = normalize(d)

  log(`Directory is "${directory}"`)

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(getInstallSaveOptionalSaveExactCommands(deps, r, f))

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: directory }, (e, v) => {
        (!e)
          ? resolve(v)
          : reject(e)
      })

      const log = use('install-save-otional-save-exact')

      stdout.on('data', log)
      stderr.on('data', log)
    })
  )
}

/**
 *  @function installSaveOptional
 *
 *  Spawn the `npm install --save-optional` commands
 *
 *  @param {string} d - Directory
 *  @param {Dependencies} dependencies - Dependencies
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *
 *  @return {Promise}
 */
export function installSaveOptional (d, dependencies, r, f) {
  log('installSaveOptional')

  const directory = normalize(d)

  log(`Directory is "${directory}"`)

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(getInstallSaveOptionalCommands(dependencies, r, f))

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: directory }, (e, v) => {
        (!e)
          ? resolve(v)
          : reject(e)
      })

      const log = use('install-save-otional')

      stdout.on('data', log)
      stderr.on('data', log)
    })
  )
}

/**
 *  @function installSaveDevSaveExact
 *
 *  Spawn the `npm install --save-dev --save-exact` commands
 *
 *  @param {string} d - Directory
 *  @param {DependencyDescriptor|DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *
 *  @return {Promise}
 */
export function installSaveDevSaveExact (d, deps, r, f) {
  log('installSaveDevSaveExact')

  const directory = normalize(d)

  log(`Directory is "${directory}"`)

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(getInstallSaveDevSaveExactCommands(deps, r, f))

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: directory }, (e, v) => {
        (!e)
          ? resolve(v)
          : reject(e)
      })

      const log = use('install-save-dev-save-exact')

      stdout.on('data', log)
      stderr.on('data', log)
    })
  )
}

/**
 *  @function installSaveDev
 *
 *  Spawn the `npm install --save-dev` commands
 *
 *  @param {string} d - Directory
 *  @param {DependencyDescriptor|DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *
 *  @return {Promise}
 */
export function installSaveDev (d, deps, r, f) {
  log('installSaveDev')

  const directory = normalize(d)

  log(`Directory is "${directory}"`)

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(getInstallSaveDevCommands(deps, r, f))

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: directory }, (e, v) => {
        (!e)
          ? resolve(v)
          : reject(e)
      })

      const log = use('install-save-dev')

      stdout.on('data', log)
      stderr.on('data', log)
    })
  )
}

/**
 *  @function installSaveProdSaveExact
 *
 *  Spawn the `npm install --save-prod --save-exact` commands
 *
 *  @param {string} d - Directory
 *  @param {DependencyDescriptor|DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *
 *  @return {Promise}
 */
export function installSaveProdSaveExact (d, deps, r, f) {
  log('installSaveProdSaveExact')

  const directory = normalize(d)

  log(`Directory is "${directory}"`)

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(getInstallSaveProdSaveExactCommands(deps, r, f))

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: directory }, (e, v) => {
        (!e)
          ? resolve(v)
          : reject(e)
      })

      const log = use('install-save-prod-save-exact')

      stdout.on('data', log)
      stderr.on('data', log)
    })
  )
}

/**
 *  @function installSaveProd
 *
 *  Spawn the `npm install --save-prod` commands
 *
 *  @param {string} d - Directory
 *  @param {DependencyDescriptor|DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *
 *  @return {Promise}
 */
export function installSaveProd (d, deps, r, f) {
  log('installSaveProd')

  const directory = normalize(d)

  log(`Directory is "${directory}"`)

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(getInstallSaveProdCommands(deps, r, f))

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: directory }, (e, v) => {
        (!e)
          ? resolve(v)
          : reject(e)
      })

      const log = use('install-save-prod')

      stdout.on('data', log)
      stderr.on('data', log)
    })
  )
}

/**
 *  @function executeBundle
 *
 *  Execute the `npm install --save-bundle --save-exact` and `npm install --save-bundle` commands according to configuration and parameters
 *
 *  @param {string} d - Directory
 *  @param {Dependencies} packageDependencies - Package dependencies
 *  @param {Dependencies} configurationDependencies - Configuration dependencies
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *
 *  @return {Promise}
 */
export async function executeBundle (d = DIRECTORY, packageDependencies = {}, configurationDependencies = {}, r = REGISTRY, f = false) {
  log('executeBundle')

  const depsExact = getDepsExact(packageDependencies, configurationDependencies)

  if (depsExact.length) await installSaveBundleSaveExact(d, depsExact, r, f)

  const deps = getDeps(packageDependencies)

  if (deps.length) await installSaveBundle(d, deps, r, f)
}

/**
 *  @function executeOptional
 *
 *  Execute the `npm install --save-optional --save-exact` and `npm install --save-optional` commands according to configuration and parameters
 *
 *  @param {string} d - Directory
 *  @param {Dependencies} packageDependencies - Package dependencies
 *  @param {Dependencies} configurationDependencies - Configuration dependencies
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *
 *  @return {Promise}
 */
export async function executeOptional (d = DIRECTORY, packageDependencies = {}, configurationDependencies = {}, r = REGISTRY, f = false) {
  log('executeOptional')

  const depsExact = getDepsExact(packageDependencies, configurationDependencies)

  if (depsExact.length) await installSaveOptionalSaveExact(d, depsExact, r, f)

  const deps = getDeps(packageDependencies)

  if (deps.length) await installSaveOptional(d, deps, r, f)
}

/**
 *  @function executeDev
 *
 *  Execute the `npm install --save-dev --save-exact` and `npm install --save-dev` commands according to configuration and parameters
 *
 *  @param {string} d - Directory
 *  @param {Dependencies} packageDependencies - Package dependencies
 *  @param {Dependencies} configurationDependencies - Configuration dependencies
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *
 *  @return {Promise}
 */
export async function executeDev (d = DIRECTORY, packageDependencies = {}, configurationDependencies = {}, r = REGISTRY, f = false) {
  log('executeDev')

  const depsExact = getDepsExact(packageDependencies, configurationDependencies)

  if (depsExact.length) await installSaveDevSaveExact(d, depsExact, r, f)

  const deps = getDeps(packageDependencies)

  if (deps.length) await installSaveDev(d, deps, r, f)
}

/**
 *  @function executeProd
 *
 *  Execute the `npm install --save-prod --save-exact` and `npm install --save-prod` commands according to configuration and parameters
 *
 *  @param {string} d - Directory
 *  @param {Dependencies} packageDependencies - Package dependencies
 *  @param {Dependencies} configurationDependencies - Configuration dependencies
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *
 *  @return {Promise}
 */
export async function executeProd (d = DIRECTORY, packageDependencies = {}, configurationDependencies = {}, r = REGISTRY, f = false) {
  log('executeProd')

  const depsExact = getDepsExact(packageDependencies, configurationDependencies)

  if (depsExact.length) await installSaveProdSaveExact(d, depsExact, r, f)

  const deps = getDeps(packageDependencies)

  if (deps.length) await installSaveProd(d, deps, r, f)
}
