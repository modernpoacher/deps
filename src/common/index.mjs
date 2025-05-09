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
  VERSION,
  PLATFORM
} from '#deps/src/common/env'

export const DIRECTORY = '.'

export const REGISTRY = 'https://registry.npmjs.org'

export const AUTHOR = 'Modern Poacher Limited <modernpoacher@modernpoacher.com>'

export const NVM = join(PATH, 'nvm.sh')

const log = debug('@modernpoacher/deps')

log(`\`common\` (${VERSION} - ${PLATFORM}) is awake`)

/**
 *  @param {string} v
 *  @returns {string}
 */
export const tidy = (v) => v.replace(/\n{2,}}/gm, String.fromCharCode(10)).trim()

/**
 *  @param {string} v
 *  @returns {string}
 */
export const trim = (v) => v.split(String.fromCharCode(10)).map((v) => v.trimEnd()).join(String.fromCharCode(10)).trim()

/**
 *  @function getSaveProdParameter
 *  @description
 *  Get the `--save-prod` parameter
 *  @param {string} commands commands string
 *  @returns {string}
 */
export const getSaveProdParameter = (commands) => commands.concat(' --save-prod')

/**
 *  @function getSaveDevParameter
 *  @description
 *  Get the `--save-dev` parameter
 *  @param {string} commands commands string
 *  @returns {string}
 */
export const getSaveDevParameter = (commands) => commands.concat(' --save-dev')

/**
 *  @function getSaveBundleParameter
 *  @description
 *  Get the "save bundle" parameter
 *  @param {string} commands - Current commands string
 *  @returns {string}
 */
export const getSaveBundleParameter = (commands) => commands.concat(' --save-bundle')

/**
 *  @function getSaveOptionalParameter
 *  @description
 *  Get the `--save-optional` parameter
 *  @param {string} commands - Current commands string
 *  @returns {string}
 */
export const getSaveOptionalParameter = (commands) => commands.concat(' --save-optional')

/**
 *  @function getRegistryParameter
 *  @description
 *  Get the "registry" parameter and argument
 *  @param {string} r - Registry
 *  @param {string} commands - Current commands string
 *  @returns {string}
 */
export const getRegistryParameter = (r, commands) => r ? commands.concat(` --registry ${r}`) : commands

/**
 *  @function getForceParameter
 *  @description
 *  Get the "force" parameter and argument
 *  @param {boolean} f - Force
 *  @param {string} commands - Current commands string
 *  @returns {string}
 */
export const getForceParameter = (f, commands) => f ? commands.concat(' --force') : commands

/**
 *  @function getNoSaveParameter
 *  @description
 *  Get the `--no-save` parameter
 *  @param {boolean} s - Save
 *  @param {string} commands - Current commands string
 *  @returns {string}
 */
export const getNoSaveParameter = (s, commands) => s ? commands : commands.concat(' --no-save')

/**
 *  @function getSaveExactParameter
 *  @description
 *  Get the `--save-exact` parameter
 *  @param {string} commands - Current commands string
 *  @returns {string}
 */
export const getSaveExactParameter = (commands) => commands.concat(' --save-exact')

/**
 *  @function getExportPath
 *  @description
 *  Get the export PATH shell script
 *  @param {string} commands - Current commands string
 *  @returns {string}
 */
export const getExportPath = (commands) => `
export PATH=/usr/local/bin:$PATH &> /dev/null
${commands}
`

/**
 *  @function getNvm
 *  @description
 *  Get the NVM shell script
 *  @param {string} commands - Current commands string
 *  @returns {string}
 */
export const getNvm = (commands) => `
bash "${NVM}" 2> /dev/null
${commands}
`

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
export const getProdDependencies = ({ dependencies = {} } = {}) => dependencies

/**
 *  @function getDevDependencies
 *  @description
 *  Get the development dependencies by destructuring the package or configuration
 *  @param {Package | Configuration} deps
 *  @returns {Dependencies}
 */
export const getDevDependencies = ({ devDependencies = {} } = {}) => devDependencies

/**
 *  @function getOptionalDependencies
 *  @description
 *  Get the optional dependencies by destructuring the package or configuration
 *  @param {Package | Configuration} deps
 *  @returns {Dependencies}
 */
export const getOptionalDependencies = ({ optionalDependencies = {} } = {}) => optionalDependencies

/**
 *  @function getBundleDependencies
 *  @description
 *  Get the bundle dependencies by destructuring the package or configuration
 *  @param {Package | Configuration} deps
 *  @returns {Dependencies}
 */
export const getBundleDependencies = ({ bundleDependencies = {} } = {}) => bundleDependencies

/**
 *  @function getPeerDependencies
 *  @description
 *  Get the peer dependencies by destructuring the package or configuration
 *  @param {Package | Configuration} deps
 *  @returns {Dependencies}
 */
export const getPeerDependencies = ({ peerDependencies = {} } = {}) => peerDependencies

/**
 *  @function getIgnore
 *  @description
 *  Get the ignore flag by destructuring the configuration
 *  @param {Configuration} deps
 *  @returns {boolean}
 */
export const getIgnore = ({ ignore = false } = {}) => ignore === true

/**
 *  @function getAuthor
 *  @description
 *  Get the author by destructuring the package or configuration
 *  @param {Package | Configuration} deps
 *  @returns {string | null}
 */
export const getAuthor = ({ author = '' } = {}) => {
  if (typeof author === 'string') return author
  if (typeof (author || false) === 'object') {
    const {
      name: NAME = '',
      email: EMAIL = ''
    } = author

    const name = String(NAME).trim()
    const email = String(EMAIL).trim()

    return (
      name && email
        ? `${name} <${email}>`
        : null
    )
  }

  return null
}

/**
 *  @function getMessage
 *  @description
 *  Get the message by destructuring the configuration
 *  @param {Configuration} deps
 *  @returns {string | null}
 */
export const getMessage = ({ message = '' } = {}) => message || null

/**
 *  @function isPreRelease
 *  @description
 *  Determine whether the dependency is a pre-release with a Regular Expression
 *  @param {string} v
 *  @returns {boolean}
 */
export const isPreRelease = (v) => /-/.test(v)

/**
 *  @function isExact
 *  @description
 *  Determine whether the dependency is exact with a Regular Expression
 *  @param {string} v
 *  @returns {boolean}
 */
export const isExact = (v) => /^\d/.test(v)

/**
 *  @param {[name: string, version: string]} entry
 *  @returns {boolean}
 */
function includeVersionIsExact ([name, version]) {
  return isExact(version)
}

/**
 *  @param {[name: string, version: string]} entry
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
 *  @returns {(entry: [name: string, version: string]) => {
 *    name: string,
 *    version: string
 *  }}
 */
function getMapToDepsExactVersionFromConfiguration (configurationDependencies) {
  /**
   *  @param {[name: string, version: string]} entry
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
 *  @param {[name: string, version: string]} entry
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
  const s = String.fromCharCode(32)

  while (/\s{2,} | \n+/.test(commands)) {
    commands = commands.replace(/\s{2,}/gm, s).replace(/\n+/gm, s)
  }

  return (
    commands.trim()
  )
}

/**
 *  @function transformDependency
 *  @description
 *  Transform by destructuring the value
 *  @param {DependencyDescriptor | { name?: string, version?: string }} dependencyDescriptor
 *  @returns {string}
 */
export const transformDependency = ({ name = '@modernpoacher/deps', version = 'latest' } = {}) => `${name}@${version}`

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
      ? value.map(transformDependency).join(String.fromCharCode(32)).trim()
      : transformDependency(value)
  )
}
