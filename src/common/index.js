import debug from 'debug'

const log = debug('@modernpoacher/deps:common')

export const getProdDependencies = ({ dependencies = {} } = {}) => dependencies
export const getDevDependencies = ({ devDependencies = {} } = {}) => devDependencies
export const getOptionalDependencies = ({ optionalDependencies = {} } = {}) => optionalDependencies
export const getBundleDependencies = ({ bundleDependencies = [] } = {}) => bundleDependencies
export const getPeerDependencies = ({ peerDependencies } = {}) => peerDependencies

export const isExact = (v) => /^\d/.test(v)

export const getDependency = ({ name = '@modernpoacher/deps', version = 'latest' } = {}) => `${name}@${version}`

export function getDepsExact (v, c) {
  log('getDepsExact')

  return (
    Object.entries(v)
      .reduce((accumulator, [name, version]) => (
        isExact(version)
          ? accumulator.concat({ name, version: Reflect.has(c, name) ? Reflect.get(c, name) : version })
          : accumulator
      ), [])
  )
}

export function getDeps (v) {
  log('getDeps')

  return (
    Object.entries(v)
      .reduce((accumulator, [name, version]) => (
        isExact(version)
          ? accumulator
          : accumulator.concat({ name, version: 'latest' })
      ), [])
  )
}

export function transform (v) {
  log('transform')

  return (
    Array.isArray(v)
      ? v.map(getDependency).join(String.fromCharCode(32)).trim()
      : getDependency(v)
  )
}
