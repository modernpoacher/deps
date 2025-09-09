/**
 *  @typedef {import('node:child_process').ExecException} ExecException
 *  @typedef {DepsTypes.DependencyDescriptor} DependencyDescriptor
 *  @typedef {DepsTypes.Package} Package
 *  @typedef {DepsTypes.Configuration} Configuration
 */

/**
 *  @callback HandleComplete
 *  @param {ExecException | null} e
 *  @param {string} v
 *  @returns {void}
 */

import {
  normalize
} from 'node:path'

import {
  exec
} from 'node:child_process'

import debug from '#deps/src/common/debug'

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
  getNoSaveParameter,
  getRegistryParameter,
  getForceParameter,
  getSaveExactParameter,
  getCommands,
  normalizeCommands,
  transform,
  getDepsExact,
  getDeps
} from '#deps/src/common'

const log = debug('@modernpoacher/deps')
const info = debug('@modernpoacher/deps:info')

log(`\`install\` (${VERSION} - ${PLATFORM}) is awake`)

/**
 *  @function getInstallSaveExactCommands
 *  @description
 *  Get the `install --save-exact` commands as a string
 *  @param {DependencyDescriptor | DependencyDescriptor[]} p - Package
 *  @param {boolean} s - Save
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *  @returns {string}
 */
export function getInstallSaveExactCommands (p, s, r, f) {
  log('getInstallSaveExactCommands')

  return normalizeCommands(
    getNoSaveParameter(s, getRegistryParameter(r, getForceParameter(f, getSaveExactParameter(`npm i ${transform(p)}`))))
  )
}

/**
 *  @function getInstallCommands
 *  @description
 *  Get the `install` commands as a string
 *  @param {DependencyDescriptor | DependencyDescriptor[]} p - Package
 *  @param {boolean} s - Save
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *  @returns {string}
 */
export function getInstallCommands (p, s, r, f) {
  log('getInstallCommands')

  return normalizeCommands(
    getNoSaveParameter(s, getRegistryParameter(r, getForceParameter(f, `npm i ${transform(p)}`)))
  )
}

/**
 *  @function installSaveExact
 *  @description
 *  Spawn the `install --save-exact` commands
 *  @param {string} d - Directory
 *  @param {DependencyDescriptor | DependencyDescriptor[]} p - Package
 *  @param {boolean} s - Save
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *  @returns {Promise<string>}
 */
export function installSaveExact (d, p, s, r, f) {
  log('installSaveExact')

  const directory = normalize(d.trim())

  info(`Directory is "${directory}"`)

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(getInstallSaveExactCommands(p, s, r, f))
      const options = getOptions(directory)
      /**
       *  @type {HandleComplete}
       */
      function handleComplete (e, v) {
        if (!e) {
          resolve(v)
        } else {
          reject(e)
        }
      }

      info(commands, options)

      const {
        stdout,
        stderr
      } = exec(commands, options, handleComplete)

      if (stdout) stdout.on('data', log)
      if (stderr) stderr.on('data', log)
    })
  )
}

/**
 *  @function install
 *  @description
 *  Spawn the `install` commands
 *  @param {string} d - Directory
 *  @param {DependencyDescriptor | DependencyDescriptor[]} p - Package
 *  @param {boolean} s - Save
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *  @returns {Promise<string>}
 */
export function install (d, p, s, r, f) {
  log('install')

  const directory = normalize(d.trim())

  info(`Directory is "${directory}"`)

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(getInstallCommands(p, s, r, f))
      const options = getOptions(directory)
      /**
       *  @type {HandleComplete}
       */
      function handleComplete (e, v) {
        if (!e) {
          resolve(v)
        } else {
          reject(e)
        }
      }

      info(commands, options)

      const {
        stdout,
        stderr
      } = exec(commands, options, handleComplete)

      if (stdout) stdout.on('data', log)
      if (stderr) stderr.on('data', log)
    })
  )
}

/**
 *  @function execute
 *  @description
 *  Execute the `install --save-exact` and `install` commands
 *  @param {string} d - Directory
 *  @param {Package} p - Package
 *  @param {Configuration} c - Configuration
 *  @param {boolean} s - Save
 *  @param {string} r - Registry
 *  @param {boolean} f - Force
 *  @returns {Promise<void>}
 */
export async function execute (d = DIRECTORY, p = {}, c = {}, s = false, r = REGISTRY, f = false) {
  log('execute')

  const depsExact = getDepsExact(p, c)

  if (depsExact.length) await installSaveExact(d, depsExact, s, r, f)

  const deps = getDeps(p)

  if (deps.length) await install(d, deps, s, r, f)
}
