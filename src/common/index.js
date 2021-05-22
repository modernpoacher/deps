import debug from 'debug'

import {
  resolve
} from 'path'

const log = debug('@modernpoacher/deps')

log('`common` is awake')

const {
  path: MODULE_PATH
} = module

export const DIRECTORY = '.'

export const REGISTRY = 'https://registry.npmjs.org'

export const NVM = resolve(MODULE_PATH, '../../nvm.sh')

/**
 *  @function getRegistryParam
 *
 *  Get the "registry" parameter and argument
 *
 *  @param {String} registry
 *  @param {String} current string value
 *
 *  @return {String}
 */
export const getRegistryParam = (r, v) => r ? v.concat(` --registry ${r}`) : v

/**
 *  @function getSaveExactParam
 *
 *  Get the "save exact" parameter
 *
 *  @param {Boolean} exact
 *  @param {String} current string value
 *
 *  @return {String}
 */
export const getSaveExactParam = (e, v) => e ? v.concat(' --save-exact') : v

/**
 *  @function getNoSaveParam
 *
 *  Get the "no save" parameter
 *
 *  @param {Boolean} save
 *  @param {String} current string value
 *
 *  @return {String}
 */
export const getNoSaveParam = (s, v) => s ? v : v.concat(' --no-save')

/**
 *  @function getSaveBundleParam
 *
 *  Get the "save bundle" parameter
 *
 *  @param {String} current string value
 *
 *  @return {String}
 */
export const getSaveBundleParam = (v) => v.concat(' --save-bundle')

/**
 *  @function getSaveOptionalParam
 *
 *  Get the "save optional" parameter
 *
 *  @param {String} current string value
 *
 *  @return {String}
 */
export const getSaveOptionalParam = (v) => v.concat(' --save-optional')

/**
 *  @function getSaveDevParam
 *
 *  Get the "save optional" parameter
 *
 *  @param {String} current string value
 *
 *  @return {String}
 */
export const getSaveDevParam = (v) => v.concat(' --save-dev')

/**
 *  @function getSaveProdParam
 *
 *  Get the "save prod" parameter
 *
 *  @param {String} current string value
 *
 *  @return {String}
 */
export const getSaveProdParam = (v) => v.concat(' --save-prod')

/**
 *  @function getProdDependencies
 *
 *  Get the installation shell script
 *
 *  @param {String} directory
 *  @param {String} commands
 *
 *  @return {String}
 */
export const getCommands = (directory = DIRECTORY, commands = 'npm i') => (`
export PATH=/usr/local/bin:$PATH &> /dev/null

cd "${directory}"

. "${NVM}"

${commands}

exit 0
`).replace(/\n\n/gm, String.fromCharCode(10)).trim()

/**
 *  @function getProdDependencies
 *
 *  Get the production dependencies by destructuring the package
 *
 *  @param {Object} package
 *
 *  @return {Object}
 */
export const getProdDependencies = ({ dependencies = {} } = {}) => dependencies

/**
 *  @function getDevDependencies
 *
 *  Get the development dependencies by destructuring the package
 *
 *  @param {Object} package
 *
 *  @return {Object}
 */
export const getDevDependencies = ({ devDependencies = {} } = {}) => devDependencies

/**
 *  @function getOptionalDependencies
 *
 *  Get the optional dependencies by destructuring the package
 *
 *  @param {Object} package
 *
 *  @return {Object}
 */
export const getOptionalDependencies = ({ optionalDependencies = {} } = {}) => optionalDependencies

/**
 *  @function getBundleDependencies
 *
 *  Get the bundle dependencies by destructuring the package
 *
 *  @param {Object} package
 *
 *  @return {Object}
 */
export const getBundleDependencies = ({ bundleDependencies = [] } = {}) => bundleDependencies

/**
 *  @function getPeerDependencies
 *
 *  Get the peer dependencies by destructuring the package
 *
 *  @param {Object} package
 *
 *  @return {Object}
 */
export const getPeerDependencies = ({ peerDependencies } = {}) => peerDependencies

/**
 *  @function isExact
 *
 *  Determine whether the dependency is exact with a Regular Expression
 *
 *  @param {String} v
 *
 *  @return {Boolean}
 */
export const isExact = (v) => /^\d/.test(v)

/**
 *  @function getDepsExact
 *
 *  Get an array of dependencies to be installed with the "save exact" parameter
 *
 *  @param {Object} values
 *  @param {Object} configuration
 *
 *  @return {Array}
 */
export function getDepsExact (values, configuration) {
  log('getDepsExact')

  return (
    Object.entries(values)
      .reduce((accumulator, [name, version]) => (
        isExact(version)
          ? accumulator.concat({ name, version: Reflect.has(configuration, name) ? Reflect.get(configuration, name) : version })
          : accumulator
      ), [])
  )
}

/**
 *  @function getDeps
 *
 *  Get an array of dependencies to be installed
 *
 *  @param {Object} values
 *
 *  @return {Array}
 */
export function getDeps (values) {
  log('getDeps')

  return (
    Object.entries(values)
      .reduce((accumulator, [name, version]) => (
        isExact(version)
          ? accumulator
          : accumulator.concat({ name, version: 'latest' })
      ), [])
  )
}

/**
 *  @function normalise
 *
 *  Normalise the commands string
 *
 *  @param {String} value
 *
 *  @return {String}
 */
export function normalise (value) {
  while (/\s\s|\n/.test(value)) {
    value = value.replace(/\s\s/gm, String.fromCharCode(32)).replace(/\n/gm, String.fromCharCode(32))
  }

  return (
    value.trim()
  )
}

/**
 *  @function transformDependency
 *
 *  Transform by destructuring the value
 *
 *  @param {Object}
 *
 *  @return {String}
 */
export const transformDependency = ({ name = '@modernpoacher/deps', version = 'latest' } = {}) => `${name}@${version}`

/**
 *  @function transform
 *
 *  Transform the parameter to a string
 *
 *  @param {(Array|Object)} value
 *
 *  @return {String}
 */
export function transform (value) {
  log('transform')

  return (
    Array.isArray(value)
      ? value.map(transformDependency).join(String.fromCharCode(32)).trim()
      : transformDependency(value)
  )
}
