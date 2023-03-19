/**
 * Package or configuration dependencies
 * @typedef {Object.<string, string>} Dependencies
 */

/**
 * A dependency descriptor
 * @typedef {Object} DependencyDescriptor
 * @property {string} name - Dependency name in NPM.
 * @property {string} version - Dependency version or "latest".
 */

/**
 * A package
 * @typedef {Object} Package
 * @property {string|{name: string, email: string}} author
 * @property {Dependencies} dependencies - Production dependencies.
 * @property {Dependencies} devDependencies - Development dependencies.
 * @property {Dependencies} optionalDependencies - Optional dependencies.
 * @property {Dependencies} bundleDependencies - Bundle dependencies.
 * @property {Dependencies} peerDependencies - Peer dependencies
 */

/**
 * A configuration
 * @typedef {Object} Configuration
 * @property {string|{name: string, email: string}} author
 * @property {boolean} ignore
 * @property {Dependencies} dependencies - Production dependencies.
 * @property {Dependencies} devDependencies - Development dependencies.
 * @property {Dependencies} optionalDependencies - Optional dependencies.
 * @property {Dependencies} bundleDependencies - Bundle dependencies.
 * @property {Dependencies} peerDependencies - Peer dependencies
 */

import debug from 'debug'

import PATH from '#where-am-i'

import {
  resolve
} from 'path'

import {
  VERSION,
  PLATFORM
} from '#deps/src/common/env'

export const DIRECTORY = '.'

export const REGISTRY = 'https://registry.npmjs.org'

export const AUTHOR = 'Modern Poacher Limited <modernpoacher@modernpoacher.com>'

export const NVM = resolve(PATH, 'nvm.sh')

const log = debug('@modernpoacher/deps')

log(`\`common\` (${VERSION} - ${PLATFORM}) is awake at "${PATH}"`)

const tidy = (v) => v.replace(/\n{2,}}/gm, String.fromCharCode(10)).trim()

/**
 *  @function getSaveProdParameter
 *
 *  Get the `--save-prod` parameter
 *
 *  @param {string} current commands string
 *
 *  @return {string}
 */
export const getSaveProdParameter = (commands) => commands.concat(' --save-prod')

/**
 *  @function getSaveDevParameter
 *
 *  Get the `--save-dev` parameter
 *
 *  @param {string} current commands string
 *
 *  @return {string}
 */
export const getSaveDevParameter = (commands) => commands.concat(' --save-dev')

/**
 *  @function getSaveBundleParameter
 *
 *  Get the "save bundle" parameter
 *
 *  @param {string} commands - Current commands string
 *
 *  @return {string}
 */
export const getSaveBundleParameter = (commands) => commands.concat(' --save-bundle')

/**
 *  @function getSaveOptionalParameter
 *
 *  Get the `--save-optional` parameter
 *
 *  @param {string} commands - Current commands string
 *
 *  @return {string}
 */
export const getSaveOptionalParameter = (commands) => commands.concat(' --save-optional')

/**
 *  @function getRegistryParameter
 *
 *  Get the "registry" parameter and argument
 *
 *  @param {string} r - Registry
 *  @param {string} commands - Current commands string
 *
 *  @return {string}
 */
export const getRegistryParameter = (r, commands) => r ? commands.concat(` --registry ${r}`) : commands

/**
 *  @function getForceParameter
 *
 *  Get the "force" parameter and argument
 *
 *  @param {boolean} f - Force
 *  @param {string} commands - Current commands string
 *
 *  @return {string}
 */
export const getForceParameter = (f, commands) => f ? commands.concat(' --force') : commands

/**
 *  @function getNoSaveParameter
 *
 *  Get the `--no-save` parameter
 *
 *  @param {boolean} s - Save
 *  @param {string} commands - Current commands string
 *
 *  @return {string}
 */
export const getNoSaveParameter = (s, commands) => s ? commands : commands.concat(' --no-save')

/**
 *  @function getSaveExactParameter
 *
 *  Get the `--save-exact` parameter
 *
 *  @param {string} commands - Current commands string
 *
 *  @return {string}
 */
export const getSaveExactParameter = (commands) => commands.concat(' --save-exact')

/**
 *  @function getExportPath
 *
 *  Get the export PATH shell script
 *
 *  @param {string} commands - Current commands string
 *
 *  @return {string}
 */
export const getExportPath = (commands) => `
export PATH=/usr/local/bin:$PATH &> /dev/null
${commands}
`

/**
 *  @function getNvm
 *
 *  Get the NVM shell script
 *
 *  @param {string} commands - Current commands string
 *
 *  @return {string}
 */
export const getNvm = (commands) => `
. "${NVM}" 2> /dev/null
${commands}
`

/**
 *  @function getCommands
 *
 *  Get the installation shell script
 *
 *  @param {string} commands - Current commands string
 *
 *  @return {string}
 */
export const getCommands = PLATFORM === 'win32'
  ? (commands = 'npm i') => tidy(commands)
  : (commands = 'npm i') => tidy(getExportPath(getNvm(commands)))

/**
 *  @function getProdDependencies
 *
 *  Get the production dependencies by destructuring the package or configuration
 *
 *  @param {Package|Configuration}
 *
 *  @return {Dependencies}
 */
export const getProdDependencies = ({ dependencies = {} } = {}) => dependencies

/**
 *  @function getDevDependencies
 *
 *  Get the development dependencies by destructuring the package or configuration
 *
 *  @param {Package|Configuration}
 *
 *  @return {Dependencies}
 */
export const getDevDependencies = ({ devDependencies = {} } = {}) => devDependencies

/**
 *  @function getOptionalDependencies
 *
 *  Get the optional dependencies by destructuring the package or configuration
 *
 *  @param {Package|Configuration}
 *
 *  @return {Dependencies}
 */
export const getOptionalDependencies = ({ optionalDependencies = {} } = {}) => optionalDependencies

/**
 *  @function getBundleDependencies
 *
 *  Get the bundle dependencies by destructuring the package or configuration
 *
 *  @param {Package|Configuration}
 *
 *  @return {Dependencies}
 */
export const getBundleDependencies = ({ bundleDependencies = {} } = {}) => bundleDependencies

/**
 *  @function getPeerDependencies
 *
 *  Get the peer dependencies by destructuring the package or configuration
 *
 *  @param {Package|Configuration}
 *
 *  @return {Dependencies}
 */
export const getPeerDependencies = ({ peerDependencies } = {}) => peerDependencies

/**
 *  @function getIgnore
 *
 *  Get the ignore flag by destructuring the package or configuration
 *
 *  @param {Package|Configuration}
 *
 *  @return {boolean}
 */
export const getIgnore = ({ ignore = false } = {}) => ignore === true

/**
 *  @function getAuthor
 *
 *  Get the author by destructuring the package or configuration
 *
 *  @param {Package|Configuration}
 *
 *  @return {string|null}
 */
export const getAuthor = ({ author = '' } = {}) => {
  if ((author || false) instanceof Object) {
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

  return author || null
}

/**
 *  @function isPreRelease
 *
 *  Determine whether the dependency is a pre-release with a Regular Expression
 *
 *  @param {string} v
 *
 *  @return {boolean}
 */
export const isPreRelease = (v) => /-/.test(v)

/**
 *  @function isExact
 *
 *  Determine whether the dependency is exact with a Regular Expression
 *
 *  @param {string} v
 *
 *  @return {boolean}
 */
export const isExact = (v) => /^\d/.test(v)

/**
 *  @function getDepsExact
 *
 *  Get an array of dependencies to be installed with the `--save-exact` parameter
 *
 *  @param {Dependencies} packageDependencies - Package dependencies
 *  @param {Dependencies} configurationDependencies - Configuration dependencies
 *
 *  @return {DependencyDescriptor[]}
 */
export function getDepsExact (packageDependencies, configurationDependencies) {
  log('getDepsExact')

  return (
    Object.entries(packageDependencies)
      .reduce((accumulator, [name, version]) => (
        isExact(version)
          ? accumulator.concat({ name, version: Reflect.has(configurationDependencies, name) ? Reflect.get(configurationDependencies, name) : version })
          : accumulator
      ), [])
  )
}

/**
 *  @function getDeps
 *
 *  Get an array of dependencies to be installed
 *
 *  @param {Dependencies} packageDependencies - Package dependencies
 *
 *  @return {DependencyDescriptor[]}
 */
export function getDeps (packageDependencies) {
  log('getDeps')

  return (
    Object.entries(packageDependencies)
      .reduce((accumulator, [name, version]) => (
        isExact(version)
          ? accumulator
          : isPreRelease(version)
            ? accumulator.concat({ name, version })
            : accumulator.concat({ name, version: 'latest' })
      ), [])
  )
}

/**
 *  @function normalizeCommands
 *
 *  Normalise the commands string
 *
 *  @param {string} value
 *
 *  @return {string}
 */
export function normalizeCommands (commands) {
  const s = String.fromCharCode(32)

  while (/\s{2,}|\n+/.test(commands)) {
    commands = commands.replace(/\s{2,}/gm, s).replace(/\n+/gm, s)
  }

  return (
    commands.trim()
  )
}

/**
 *  @function transformDependency
 *
 *  Transform by destructuring the value
 *
 *  @param {DependencyDescriptor}
 *
 *  @return {string}
 */
export const transformDependency = ({ name = '@modernpoacher/deps', version = 'latest' } = {}) => `${name}@${version}`

/**
 *  @function transform
 *
 *  Transform the parameter to a string
 *
 *  @param {DependencyDescriptor|DependencyDescriptor[]} value
 *
 *  @return {string}
 */
export function transform (value) {
  log('transform')

  return (
    Array.isArray(value)
      ? value.map(transformDependency).join(String.fromCharCode(32)).trim()
      : transformDependency(value)
  )
}
