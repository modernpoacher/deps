/**
 *  @typedef {DepsTypes.Dependencies} Dependencies
 *  @typedef {DepsTypes.DependencyDescriptor} DependencyDescriptor
 *  @typedef {DepsTypes.Package} Package
 *  @typedef {DepsTypes.Configuration} Configuration
 */

import {
  join
} from 'node:path'

import PATH from '#where-am-i'

import debug from '#deps/src/common/debug'

import {
  NAME,
  VERSION,
  PLATFORM
} from '#deps/src/common/env'

import {
  formatAuthor,
  tidy
} from '#deps/src/common/format'

export const DIRECTORY = '.'

export const REGISTRY = 'https://registry.npmjs.org'

export const AUTHOR = 'Modern Poacher Limited <modernpoacher@modernpoacher.com>'

export const NVM = join(PATH, 'nvm.sh')

const log = debug('@modernpoacher/deps')

log(`\`common\` (${NAME} - ${VERSION} - ${PLATFORM}) is awake`)

const SP = String.fromCodePoint(32)

/**
 *  @function getSaveProdParameter
 *  @description
 *  Get the `--save-prod` parameter
 *  @param {string} commands commands string
 *  @returns {string}
 */
export function getSaveProdParameter (commands) {
  return commands.concat(' --save-prod')
}

/**
 *  @function getSaveDevParameter
 *  @description
 *  Get the `--save-dev` parameter
 *  @param {string} commands commands string
 *  @returns {string}
 */
export function getSaveDevParameter (commands) {
  return commands.concat(' --save-dev')
}

/**
 *  @function getSaveBundleParameter
 *  @description
 *  Get the "save bundle" parameter
 *  @param {string} commands - Current commands string
 *  @returns {string}
 */
export function getSaveBundleParameter (commands) {
  return commands.concat(' --save-bundle')
}

/**
 *  @function getSaveOptionalParameter
 *  @description
 *  Get the `--save-optional` parameter
 *  @param {string} commands - Current commands string
 *  @returns {string}
 */
export function getSaveOptionalParameter (commands) {
  return commands.concat(' --save-optional')
}

/**
 *  @function getRegistryParameter
 *  @description
 *  Get the "registry" parameter and argument
 *  @param {string} r - Registry
 *  @param {string} commands - Current commands string
 *  @returns {string}
 */
export function getRegistryParameter (r, commands) {
  return r ? commands.concat(` --registry ${r}`) : commands
}

/**
 *  @function getForceParameter
 *  @description
 *  Get the "force" parameter and argument
 *  @param {boolean} f - Force
 *  @param {string} commands - Current commands string
 *  @returns {string}
 */
export function getForceParameter (f, commands) {
  return f ? commands.concat(' --force') : commands
}

/**
 *  @function getNoSaveParameter
 *  @description
 *  Get the `--no-save` parameter
 *  @param {boolean} s - Save
 *  @param {string} commands - Current commands string
 *  @returns {string}
 */
export function getNoSaveParameter (s, commands) {
  return s ? commands : commands.concat(' --no-save')
}

/**
 *  @function getSaveExactParameter
 *  @description
 *  Get the `--save-exact` parameter
 *  @param {string} commands - Current commands string
 *  @returns {string}
 */
export function getSaveExactParameter (commands) {
  return commands.concat(' --save-exact')
}

/**
 *  @function getExportPath
 *  @description
 *  Get the export PATH shell script
 *  @param {string} commands - Current commands string
 *  @returns {string}
 */
export function getExportPath (commands) {
  return `
export PATH=/usr/local/bin:$PATH &> /dev/null
${commands}
`
}

/**
 *  @function getNvm
 *  @description
 *  Get the NVM shell script
 *  @param {string} commands - Current commands string
 *  @returns {string}
 */
export function getNvm (commands) {
  return `
bash "${NVM}" 2> /dev/null
${commands}
`
}

/**
 *  @function getCommands
 *  @description
 *  Get the installation shell script
 *  @param {string} commands - Current commands string
 *  @returns {string}
 */
export const getCommands = PLATFORM === 'win32'
  ? (commands = 'npm i') => tidy(commands)
  : (commands = 'npm i') => tidy(getExportPath(getNvm(commands)))

/**
 *  @function getProdDependencies
 *  @description
 *  Get the production dependencies by destructuring the package or configuration
 *  @param {Package | Configuration} deps
 *  @returns {Dependencies}
 */
export function getProdDependencies ({ dependencies = {} }) {
  return dependencies
}

/**
 *  @function getDevDependencies
 *  @description
 *  Get the development dependencies by destructuring the package or configuration
 *  @param {Package | Configuration} deps
 *  @returns {Dependencies}
 */
export function getDevDependencies ({ devDependencies = {} }) {
  return devDependencies
}

/**
 *  @function getOptionalDependencies
 *  @description
 *  Get the optional dependencies by destructuring the package or configuration
 *  @param {Package | Configuration} deps
 *  @returns {Dependencies}
 */
export function getOptionalDependencies ({ optionalDependencies = {} }) {
  return optionalDependencies
}

/**
 *  @function getBundleDependencies
 *  @description
 *  Get the bundle dependencies by destructuring the package or configuration
 *  @param {Package | Configuration} deps
 *  @returns {Dependencies}
 */
export function getBundleDependencies ({ bundleDependencies = {} }) {
  return bundleDependencies
}

/**
 *  @function getPeerDependencies
 *  @description
 *  Get the peer dependencies by destructuring the package or configuration
 *  @param {Package | Configuration} deps
 *  @returns {Dependencies}
 */
export function getPeerDependencies ({ peerDependencies = {} }) {
  return peerDependencies
}

/**
 *  @function getIgnore
 *  @description
 *  Get the ignore flag by destructuring the configuration
 *  @param {Configuration} deps
 *  @returns {boolean}
 */
export function getIgnore ({ ignore = false }) {
  return ignore === true
}

/**
 *  @function getAuthor
 *  @description
 *  Get the author by destructuring the package or configuration
 *  @param {Package | Configuration} deps
 *  @returns {string | null}
 */
export function getAuthor ({ author = '' }) {
  if (typeof author === 'string') return author
  if (typeof (author || false) === 'object') {
    return (
      formatAuthor(
        String(getName(author) ?? ''),
        String(getEmail(author) ?? '')
      )
    )
  }

  return null
}

/**
 *  @function getName
 *  @description
 *  Get the name by destructuring the configuration `author`
 *  @param {Configuration} author
 *  @returns {string}
 */
export function getName ({ name = '' }) {
  return name
}

/**
 *  @function getEmail
 *  @description
 *  Get the email by destructuring the configuration `author`
 *  @param {Configuration} author
 *  @returns {string}
 */
export function getEmail ({ email = '' }) {
  return email
}

/**
 *  @function getMessage
 *  @description
 *  Get the message by destructuring the configuration
 *  @param {Configuration} deps
 *  @returns {string | null}
 */
export function getMessage ({ message = '' }) {
  return message || null
}

/**
 *  @function isPreRelease
 *  @description
 *  Determine whether the dependency is a pre-release with a Regular Expression
 *  @param {string} v
 *  @returns {boolean}
 */
export function isPreRelease (v) {
  return /-/.test(v)
}

/**
 *  @function isExact
 *  @description
 *  Determine whether the dependency is exact with a Regular Expression
 *  @param {string} v
 *  @returns {boolean}
 */
export function isExact (v) {
  return /^\d/.test(v)
}

/**
 *  @param {[
 *    name: string,
 *    version: string
 *  ]} entry
 *  @returns {boolean}
 */
function includeVersionIsExact ([name, version]) {
  return isExact(version)
}

/**
 *  @param {[
 *    name: string,
 *    version: string
 *  ]} entry
 *  @returns {boolean}
 */
function excludeVersionIsExact ([name, version]) {
  return !isExact(version)
}

/**
 *  @function getMapToDepsExactVersionFromConfiguration
 *  @description
 *  Produces an array of objects from the entries of `packageDependencies` which have
 *  exact versions
 *
 *  Entries have already been filtered to exclude non-exact versions
 *
 *  Each entry is mapped to the same package name in `configurationDependencies` if it
 *  appears there. Otherwise, the `packageDependencies` version is used
 *  @param {Record<string, string>} configurationDependencies
 *  @returns {(entry: [
 *    name: string,
 *    version: string
 *  ]) => {
 *    name: string,
 *    version: string
 *  }}
 */
function getMapToDepsExactVersionFromConfiguration (configurationDependencies) {
  /**
   *  @param {[
   *    name: string,
   *    version: string
   *  ]} entry
   *  @returns {{
   *    name: string,
   *    version: string
   *  }}
   */
  return function mapToDepsExactVersionFromConfiguration (entry) {
    const [
      name,
      version
    ] = entry

    return {
      name,
      version: (
        name in configurationDependencies
          ? configurationDependencies[name]
          : version
      )
    }
  }
}

/**
 *  @function mapToDepsVersion
 *  @description
 *  Produces an array of objects from the entries of `packageDependencies` which do not have
 *  exact versions
 *
 *  Where the version is a pre-release, that version is used. Otherwise the version is
 *  set to `latest` to ensure that package is updated
 *  @param {[
 *    name: string,
 *    version: string
 *  ]} entry
 *  @returns {{
 *    name: string,
 *    version: string
 *  }}
 */
function mapToDepsVersion (entry) {
  const [
    name,
    version
  ] = entry

  if (isPreRelease(version)) {
    return {
      name,
      version
    }
  }

  return {
    name,
    version: 'latest'
  }
}

/**
 *  @function getDepsExact
 *  @description
 *  Get an array of dependencies to be installed with the `--save-exact` parameter
 *  @param {Dependencies} packageDependencies - Package dependencies
 *  @param {Dependencies} configurationDependencies - Configuration dependencies
 *  @returns {DependencyDescriptor[]}
 */
export function getDepsExact (packageDependencies, configurationDependencies) {
  log('getDepsExact')

  return (
    Object.entries(packageDependencies)
      .filter(includeVersionIsExact)
      .map(getMapToDepsExactVersionFromConfiguration(configurationDependencies))
  )
}

/**
 *  @function getDeps
 *  @description
 *  Get an array of dependencies to be installed
 *  @param {Dependencies} packageDependencies - Package dependencies
 *  @returns {DependencyDescriptor[]}
 */
export function getDeps (packageDependencies) {
  log('getDeps')

  return (
    Object.entries(packageDependencies)
      .filter(excludeVersionIsExact)
      .map(mapToDepsVersion)
  )
}

/**
 *  @function normalizeCommands
 *  @description
 *  Normalise the commands string
 *  @param {string} commands
 *  @returns {string}
 */
export function normalizeCommands (commands) {
  let c = commands

  while (/\s{2,} | \n+/.test(c)) {
    c = c.replace(/\s{2,}/gm, SP).replace(/\n+/gm, SP)
  }

  return (
    c.trim()
  )
}

/**
 *  @function transformDependency
 *  @description
 *  Transform by destructuring the value
 *  @param {DependencyDescriptor | { name?: string, version?: string }} dependencyDescriptor
 *  @returns {string}
 */
export function transformDependency ({ name = '@modernpoacher/deps', version = 'latest' }) {
  return `${name}@${version}`
}

/**
 *  @function transform
 *  @description
 *  Transform the parameter to a string
 *  @param {DependencyDescriptor | DependencyDescriptor[]} value
 *  @returns {string}
 */
export function transform (value) {
  log('transform')

  return (
    Array.isArray(value)
      ? value.map(transformDependency).join(SP).trim()
      : transformDependency(value)
  )
}
