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
 *  @param {Object} p - Packages
 *  @param {String} r - Registry
 *  @param {Boolean} f - Force
 *
 *  @return {Array}
 */
export function getInstallSaveExactCommands (p, r, f) {
  log('getInstallSaveExactCommands')

  const c = transform(p)
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
 *  @param {Object} p - Packages
 *  @param {String} r - Registry
 *  @param {Boolean} f - Force
 *
 *  @return {Array}
 */
export function getInstallCommands (p, r, f) {
  log('getInstallCommands')

  const c = transform(p)
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
 *  @param {Object} p - Packages
 *  @param {String} r - Registry
 *  @param {Boolean} f - Force
 *
 *  @return {Array}
 */
export function getInstallSaveBundleSaveExactCommands (p, r, f) {
  log('getInstallSaveBundleSaveExactCommands')

  const commands = getInstallSaveExactCommands(p, r, f)

  return normalizeCommands(
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

  return normalizeCommands(
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

  return normalizeCommands(
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

  return normalizeCommands(
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

  return normalizeCommands(
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

  return normalizeCommands(
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

  return normalizeCommands(
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

  return normalizeCommands(
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
      const D = normalize(d)
      const commands = getCommands(D, getInstallSaveBundleSaveExactCommands(p, r, f))

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: D }, (e, v) => {
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
      const D = normalize(d)
      const commands = getCommands(D, getInstallSaveBundleCommands(p, r, f))

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: D }, (e, v) => {
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
      const D = normalize(d)
      const commands = getCommands(D, getInstallSaveOptionalSaveExactCommands(p, r, f))

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: D }, (e, v) => {
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
      const D = normalize(d)
      const commands = getCommands(D, getInstallSaveOptionalCommands(p, r, f))

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: D }, (e, v) => {
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
      const D = normalize(d)
      const commands = getCommands(D, getInstallSaveDevSaveExactCommands(p, r, f))

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: D }, (e, v) => {
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
      const D = normalize(d)
      const commands = getCommands(D, getInstallSaveDevCommands(p, r, f))

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: D }, (e, v) => {
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
      const D = normalize(d)
      const commands = getCommands(D, getInstallSaveProdSaveExactCommands(p, r, f))

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: D }, (e, v) => {
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
      const D = normalize(d)
      const commands = getCommands(D, getInstallSaveProdCommands(p, r, f))

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: D }, (e, v) => {
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

  if (depsExact.length) await installSaveOptionalSaveExact(directory, depsExact, registry, force)

  const deps = getDeps(packages)

  if (deps.length) await installSaveOptional(directory, deps, registry, force)
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