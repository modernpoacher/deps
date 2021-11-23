import debug from 'debug'

import {
  platform
} from 'os'

import {
  resolve
} from 'path'

const log = debug('@modernpoacher/deps')

log(`\`common\` (${platform}) is awake`)

const {
  path: MODULE_PATH
} = module

export const DIRECTORY = '.'

export const REGISTRY = 'https://registry.npmjs.org'

export const NVM = resolve(MODULE_PATH, '../../nvm.sh')

/**
 *  @function getSaveProdParameter
 *
 *  Get the `--save-prod` parameter
 *
 *  @param {String} current commands string
 *
 *  @return {String}
 */
export const getSaveProdParameter = (commands) => commands.concat(' --save-prod')

/**
 *  @function getSaveDevParameter
 *
 *  Get the `--save-dev` parameter
 *
 *  @param {String} current commands string
 *
 *  @return {String}
 */
export const getSaveDevParameter = (commands) => commands.concat(' --save-dev')

/**
 *  @function getSaveBundleParameter
 *
 *  Get the "save bundle" parameter
 *
 *  @param {String} current commands string
 *
 *  @return {String}
 */
export const getSaveBundleParameter = (commands) => commands.concat(' --save-bundle')

/**
 *  @function getSaveOptionalParameter
 *
 *  Get the `--save-optional` parameter
 *
 *  @param {String} current commands string
 *
 *  @return {String}
 */
export const getSaveOptionalParameter = (commands) => commands.concat(' --save-optional')

/**
 *  @function getRegistryParameter
 *
 *  Get the "registry" parameter and argument
 *
 *  @param {String} registry
 *  @param {String} current commands string
 *
 *  @return {String}
 */
export const getRegistryParameter = (r, commands) => r ? commands.concat(` --registry ${r}`) : commands

/**
 *  @function getForceParameter
 *
 *  Get the "force" parameter and argument
 *
 *  @param {String} force
 *  @param {String} current commands string
 *
 *  @return {String}
 */
export const getForceParameter = (f, commands) => f ? commands.concat(' --force') : commands

/**
 *  @function getNoSaveParameter
 *
 *  Get the `--no-save` parameter
 *
 *  @param {Boolean} save
 *  @param {String} current commands string
 *
 *  @return {String}
 */
export const getNoSaveParameter = (s, commands) => s ? commands : commands.concat(' --no-save')

/**
 *  @function getSaveExactParameter
 *
 *  Get the `--save-exact` parameter
 *
 *  @param {Boolean} exact
 *  @param {String} current commands string
 *
 *  @return {String}
 */
export const getSaveExactParameter = (commands) => commands.concat(' --save-exact')

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
 *  Get an array of dependencies to be installed with the `--save-exact` parameter
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
