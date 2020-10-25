import debug from 'debug'

const log = debug('@modernpoacher/deps')

log('`common` is awake')

export const getProdDependencies = ({ dependencies = {} } = {}) => dependencies
export const getDevDependencies = ({ devDependencies = {} } = {}) => devDependencies
export const getOptionalDependencies = ({ optionalDependencies = {} } = {}) => optionalDependencies
export const getBundleDependencies = ({ bundleDependencies = [] } = {}) => bundleDependencies
export const getPeerDependencies = ({ peerDependencies } = {}) => peerDependencies

export const isExact = (v) => /^\d/.test(v)

export const getDependency = ({ name = '@modernpoacher/deps', version = 'latest' } = {}) => `${name}@${version}`

/**
 *  @function getDepsExact
 *
 *  Get an array of dependencies to be installed with the `-E` flag
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
 *  @function transform
 *
 *  Transform the param to a string
 *
 *  @param {(Array|string)} value
 *
 *  @return {string}
 */
export function transform (value) {
  log('transform')

  return (
    Array.isArray(value)
      ? value.map(getDependency).join(String.fromCharCode(32)).trim()
      : getDependency(value)
  )
}
