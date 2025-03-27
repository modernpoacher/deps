/**
 *  Package or configuration dependencies
 *  @typedef {import('./common/index.mjs').Dependencies} Dependencies
 */

/**
 *  Dependency descriptor
 *  @typedef {import('./common/index.mjs').DependencyDescriptor} DependencyDescriptor
 */

import debug from 'debug'

import stripAnsi from 'strip-ansi'

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
  getOptions
} from '#deps/src/common/options'

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
const info = debug('@modernpoacher/deps:info')

log(`\`deps\` (${VERSION} - ${PLATFORM}) is awake`)

/**
 *  @param {string} v
 *  @returns {boolean}
 */
function filter (v) {
  return Boolean(stripAnsi(v).trim())
}

/**
 *  @param {string} key
 *  @returns {(value: string) => void}
 */
export function use (key) {
  const log = debug(`@modernpoacher/deps:${key}`)

  /**
   *  @param {string} v
   *  @returns {void}
   */
  function write (v) {
    log(v.trimEnd())
  }

  return function use (value) {
    value.split(String.fromCharCode(10))
      .filter(filter)
      .forEach(write)
  }
}

/**
 *  @function getInstallSaveExactCommands
 *
 *  Get the `npm install --save-exact` commands as a string
 *
 *  @param {DependencyDescriptor | DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *  @returns {string}
 */
export function getInstallSaveExactCommands (deps, r, f) {
  log('getInstallSaveExactCommands')

  return normalizeCommands(
    getRegistryParameter(r, getForceParameter(f, getSaveExactParameter(`npm i ${transform(deps)}`)))
  )
}

/**
 *  @function getInstallCommands
 *
 *  Get the `npm install` commands as a string
 *
 *  @param {DependencyDescriptor | DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *  @returns {string}
 */
export function getInstallCommands (deps, r, f) {
  log('getInstallCommands')

  return normalizeCommands(
    getRegistryParameter(r, getForceParameter(f, `npm i ${transform(deps)}`))
  )
}

/**
 *  @function getInstallSaveBundleSaveExactCommands
 *
 *  Get the `npm install --save-bundle --save-exact` commands as a string
 *
 *  @param {DependencyDescriptor | DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *  @returns {string}
 */
export function getInstallSaveBundleSaveExactCommands (deps, r, f) {
  log('getInstallSaveBundleSaveExactCommands')

  const commands = normalizeCommands(
    getSaveBundleParameter(getInstallSaveExactCommands(deps, r, f))
  )

  info(commands)

  return commands
}

/**
 *  @function getInstallSaveBundleCommands
 *
 *  Get the `npm install --save-bundle` commands as a string
 *
 *  @param {DependencyDescriptor | DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *  @returns {string}
 */
export function getInstallSaveBundleCommands (deps, r, f) {
  log('getInstallSaveBundleCommands')

  const commands = normalizeCommands(
    getSaveBundleParameter(getInstallCommands(deps, r, f))
  )

  info(commands)

  return commands
}

/**
 *  @function getInstallSaveOptionalSaveExactCommands
 *
 *  Get the `npm install --save-optional --save-exact` commands as a string
 *
 *  @param {DependencyDescriptor | DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *  @returns {string}
 */
export function getInstallSaveOptionalSaveExactCommands (deps, r, f) {
  log('getInstallSaveOptionalSaveExactCommands')

  const commands = normalizeCommands(
    getSaveOptionalParameter(getInstallSaveExactCommands(deps, r, f))
  )

  info(commands)

  return commands
}

/**
 *  @function getInstallSaveOptionalCommands
 *
 *  Get the `npm install --save-optional` commands as a string
 *
 *  @param {DependencyDescriptor | DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *  @returns {string}
 */
export function getInstallSaveOptionalCommands (deps, r, f) {
  log('getInstallSaveOptionalCommands')

  const commands = normalizeCommands(
    getSaveOptionalParameter(getInstallCommands(deps, r, f))
  )

  info(commands)

  return commands
}

/**
 *  @function getInstallSaveDevSaveExactCommands
 *
 *  Get the `npm install --save-dev --save-exact` commands as a string
 *
 *  @param {DependencyDescriptor | DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *  @returns {string}
 */
export function getInstallSaveDevSaveExactCommands (deps, r, f) {
  log('getInstallSaveDevSaveExactCommands')

  const commands = normalizeCommands(
    getSaveDevParameter(getInstallSaveExactCommands(deps, r, f))
  )

  info(commands)

  return commands
}

/**
 *  @function getInstallSaveDevCommands
 *
 *  Get the `npm install --save-dev` commands as a string
 *
 *  @param {DependencyDescriptor | DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *  @returns {string}
 */
export function getInstallSaveDevCommands (deps, r, f) {
  log('getInstallSaveDevCommands')

  const commands = normalizeCommands(
    getSaveDevParameter(getInstallCommands(deps, r, f))
  )

  info(commands)

  return commands
}

/**
 *  @function getInstallSaveProdSaveExactCommands
 *
 *  Get the `npm install --save-prod --save-exact` commands as a string
 *
 *  @param {DependencyDescriptor | DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *  @returns {string}
 */
export function getInstallSaveProdSaveExactCommands (deps, r, f) {
  log('getInstallSaveProdSaveExactCommands')

  const commands = normalizeCommands(
    getSaveProdParameter(getInstallSaveExactCommands(deps, r, f))
  )

  info(commands)

  return commands
}

/**
 *  @function getInstallSaveProdCommands
 *
 *  Get the `npm install --save-prod` commands as a string
 *
 *  @param {DependencyDescriptor | DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *  @returns {string}
 */
export function getInstallSaveProdCommands (deps, r, f) {
  log('getInstallSaveProdCommands')

  const commands = normalizeCommands(
    getSaveProdParameter(getInstallCommands(deps, r, f))
  )

  info(commands)

  return commands
}

/**
 *  @function installSaveBundleSaveExact
 *
 *  Spawn the `npm install --save-bundle --save-exact` commands
 *
 *  @param {string} d - Directory
 *  @param {DependencyDescriptor | DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *  @returns {Promise<string>}
 */
export function installSaveBundleSaveExact (d, deps, r, f) {
  log('installSaveBundleSaveExact')

  const directory = normalize(d.trim())

  info(`Directory is "${directory}"`)

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(getInstallSaveBundleSaveExactCommands(deps, r, f))
      const options = getOptions(directory)

      const {
        stdout,
        stderr
      } = exec(commands, options, (e, v) => {
        return (!e) ? resolve(v) : reject(e)
      })

      const log = use('install-save-bundle-save-exact')

      if (stdout) stdout.on('data', log)
      if (stderr) stderr.on('data', log)
    })
  )
}

/**
 *  @function installSaveBundle
 *
 *  Spawn the `npm install --save-bundle` commands
 *
 *  @param {string} d - Directory
 *  @param {DependencyDescriptor | DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *  @returns {Promise<string>}
 */
export function installSaveBundle (d, deps, r, f) {
  log('installSaveBundle')

  const directory = normalize(d.trim())

  info(`Directory is "${directory}"`)

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(getInstallSaveBundleCommands(deps, r, f))
      const options = getOptions(directory)

      const {
        stdout,
        stderr
      } = exec(commands, options, (e, v) => {
        return (!e) ? resolve(v) : reject(e)
      })

      const log = use('install-save-bundle')

      if (stdout) stdout.on('data', log)
      if (stderr) stderr.on('data', log)
    })
  )
}

/**
 *  @function installSaveOptionalSaveExact
 *
 *  Spawn the `npm install --save-optional --save-exact` commands
 *
 *  @param {string} d - Directory
 *  @param {DependencyDescriptor | DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *  @returns {Promise<string>}
 */
export function installSaveOptionalSaveExact (d, deps, r, f) {
  log('installSaveOptionalSaveExact')

  const directory = normalize(d.trim())

  info(`Directory is "${directory}"`)

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(getInstallSaveOptionalSaveExactCommands(deps, r, f))
      const options = getOptions(directory)

      const {
        stdout,
        stderr
      } = exec(commands, options, (e, v) => {
        return (!e) ? resolve(v) : reject(e)
      })

      const log = use('install-save-otional-save-exact')

      if (stdout) stdout.on('data', log)
      if (stderr) stderr.on('data', log)
    })
  )
}

/**
 *  @function installSaveOptional
 *
 *  Spawn the `npm install --save-optional` commands
 *
 *  @param {string} d - Directory
 *  @param {DependencyDescriptor | DependencyDescriptor[]} deps - Dependencies
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *  @returns {Promise<string>}
 */
export function installSaveOptional (d, deps, r, f) {
  log('installSaveOptional')

  const directory = normalize(d.trim())

  info(`Directory is "${directory}"`)

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(getInstallSaveOptionalCommands(deps, r, f))
      const options = getOptions(directory)

      const {
        stdout,
        stderr
      } = exec(commands, options, (e, v) => {
        return (!e) ? resolve(v) : reject(e)
      })

      const log = use('install-save-otional')

      if (stdout) stdout.on('data', log)
      if (stderr) stderr.on('data', log)
    })
  )
}

/**
 *  @function installSaveDevSaveExact
 *
 *  Spawn the `npm install --save-dev --save-exact` commands
 *
 *  @param {string} d - Directory
 *  @param {DependencyDescriptor | DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *  @returns {Promise<string>}
 */
export function installSaveDevSaveExact (d, deps, r, f) {
  log('installSaveDevSaveExact')

  const directory = normalize(d.trim())

  info(`Directory is "${directory}"`)

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(getInstallSaveDevSaveExactCommands(deps, r, f))
      const options = getOptions(directory)

      const {
        stdout,
        stderr
      } = exec(commands, options, (e, v) => {
        return (!e) ? resolve(v) : reject(e)
      })

      const log = use('install-save-dev-save-exact')

      if (stdout) stdout.on('data', log)
      if (stderr) stderr.on('data', log)
    })
  )
}

/**
 *  @function installSaveDev
 *
 *  Spawn the `npm install --save-dev` commands
 *
 *  @param {string} d - Directory
 *  @param {DependencyDescriptor | DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *  @returns {Promise<string>}
 */
export function installSaveDev (d, deps, r, f) {
  log('installSaveDev')

  const directory = normalize(d.trim())

  info(`Directory is "${directory}"`)

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(getInstallSaveDevCommands(deps, r, f))
      const options = getOptions(directory)

      const {
        stdout,
        stderr
      } = exec(commands, options, (e, v) => {
        return (!e) ? resolve(v) : reject(e)
      })

      const log = use('install-save-dev')

      if (stdout) stdout.on('data', log)
      if (stderr) stderr.on('data', log)
    })
  )
}

/**
 *  @function installSaveProdSaveExact
 *
 *  Spawn the `npm install --save-prod --save-exact` commands
 *
 *  @param {string} d - Directory
 *  @param {DependencyDescriptor | DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *  @returns {Promise<string>}
 */
export function installSaveProdSaveExact (d, deps, r, f) {
  log('installSaveProdSaveExact')

  const directory = normalize(d.trim())

  info(`Directory is "${directory}"`)

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(getInstallSaveProdSaveExactCommands(deps, r, f))
      const options = getOptions(directory)

      const {
        stdout,
        stderr
      } = exec(commands, options, (e, v) => {
        return (!e) ? resolve(v) : reject(e)
      })

      const log = use('install-save-prod-save-exact')

      if (stdout) stdout.on('data', log)
      if (stderr) stderr.on('data', log)
    })
  )
}

/**
 *  @function installSaveProd
 *
 *  Spawn the `npm install --save-prod` commands
 *
 *  @param {string} d - Directory
 *  @param {DependencyDescriptor | DependencyDescriptor[]} deps - Dependency descriptor(s)
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *  @returns {Promise<string>}
 */
export function installSaveProd (d, deps, r, f) {
  log('installSaveProd')

  const directory = normalize(d.trim())

  info(`Directory is "${directory}"`)

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(getInstallSaveProdCommands(deps, r, f))
      const options = getOptions(directory)

      const {
        stdout,
        stderr
      } = exec(commands, options, (e, v) => {
        return (!e) ? resolve(v) : reject(e)
      })

      const log = use('install-save-prod')

      if (stdout) stdout.on('data', log)
      if (stderr) stderr.on('data', log)
    })
  )
}

/**
 *  @function executeBundle
 *
 *  Execute the `npm install --save-bundle --save-exact` and `npm install --save-bundle` commands
 *
 *  @param {string} d - Directory
 *  @param {Dependencies} packageDependencies - Package dependencies
 *  @param {Dependencies} configurationDependencies - Configuration dependencies
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *  @returns {Promise<void>}
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
 *  Execute the `npm install --save-optional --save-exact` and `npm install --save-optional` commands
 *
 *  @param {string} d - Directory
 *  @param {Dependencies} packageDependencies - Package dependencies
 *  @param {Dependencies} configurationDependencies - Configuration dependencies
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *  @returns {Promise<void>}
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
 *  Execute the `npm install --save-dev --save-exact` and `npm install --save-dev` commands
 *
 *  @param {string} d - Directory
 *  @param {Dependencies} packageDependencies - Package dependencies
 *  @param {Dependencies} configurationDependencies - Configuration dependencies
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *  @returns {Promise<void>}
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
 *  Execute the `npm install --save-prod --save-exact` and `npm install --save-prod` commands
 *
 *  @param {string} d - Directory
 *  @param {Dependencies} packageDependencies - Package dependencies
 *  @param {Dependencies} configurationDependencies - Configuration dependencies
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *  @returns {Promise<void>}
 */
export async function executeProd (d = DIRECTORY, packageDependencies = {}, configurationDependencies = {}, r = REGISTRY, f = false) {
  log('executeProd')

  const depsExact = getDepsExact(packageDependencies, configurationDependencies)

  if (depsExact.length) await installSaveProdSaveExact(d, depsExact, r, f)

  const deps = getDeps(packageDependencies)

  if (deps.length) await installSaveProd(d, deps, r, f)
}
