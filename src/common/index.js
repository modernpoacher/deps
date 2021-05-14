import debug from 'debug'

const log = debug('@modernpoacher/deps')

log('`common` is awake')

/**
 *  @function initialiseAt
 *
 *  Change directory into `d` and execute `nvm use` if it is available
 *
 *  @param {String} d - Directory
 *
 *  @return {String}
 */
export const initialiseAt = (d) => {
  log('initialiseAt')

  return `
#!/bin/bash

cd "${d}"

if [ -f ~/.nvm/nvm.sh ];
then
  . ~/.nvm/nvm.sh

  VERSION=$(nvm --version)
else
  if command -v brew &> /dev/null;
  then
    NVM=$(brew --prefix nvm)

    if [ -f "$NVM/nvm.sh" ];
    then
      . $NVM/nvm.sh

      VERSION=$(nvm --version)
    fi
  fi
fi

if [ -z "$VERSION" ];
then
  echo NVM not available
else
  echo NVM version $VERSION available

  set -e

  nvm use

  if [[ $? != 0 ]];
  then
    echo NVM not configured
  else
    echo NVM configured
  fi
fi

exit 0
  `
}

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
 *  Transform the param to a string
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
