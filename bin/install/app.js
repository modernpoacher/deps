#!/usr/bin/env node

require('module-alias/register')

const debug = require('debug')

const {
  relative
} = require('path')

const commander = require('commander')

const {
  getProdDependencies,
  getDevDependencies,
  getOptionalDependencies,
  getBundleDependencies,
  getPeerDependencies
} = require('@modernpoacher/deps/common')

const {
  handleError,
  handlePackageError,
  handleConfigurationError,
  getPackageJsonPath,
  getDepsRcPath,
  getDepsRcJsonPath,
  getPackageJson,
  getDepsRc,
  getDepsRcJson
} = require('~/bin/common')

const {
  execute
} = require('@modernpoacher/deps/install')

const {
  env: {
    DEBUG = '@modernpoacher/deps*'
  }
} = process

debug.enable(DEBUG)

const log = debug('@modernpoacher/deps')

log('`install` is awake')

async function app () {
  log('Deps')

  const {
    argv
  } = process

  /*
   *  `version` is printed into this file at pre-commit
   */
  commander
    .version('1.0.35')
    .option('-P, --prod [dependencies]', 'Install `dependencies`', false)
    .option('-D, --dev [devDependencies]', 'Install `devDependencies`', false)
    .option('-O, --optional [optionalDependencies]', 'Install `optionalDependencies`', false)
    .option('-B, --bundle [bundleDependencies]', 'Install `bundleDependencies`', false)
    .option('-p, --peer [peerDependencies]', 'Install `peerDependencies`', false)
    .option('-s, --save [save]', 'Install `peerDependencies`', false)
    .option('--registry [registry]', 'Installation registry')
    .parse(argv)

  /*
   *  Command `deps --version` is not dependent on a package or a configuration and on completion
   *  it will cause the process to exit
   *
   *  Any other command will continue
   */

  const {
    env: {
      PWD,
      DEPS_PATH = PWD
    }
  } = process

  let PACKAGE
  try {
    PACKAGE = await getPackageJson(DEPS_PATH)

    log(`Package at "${relative(PWD, getPackageJsonPath(DEPS_PATH))}"`)
  } catch (e) {
    const {
      code
    } = e

    if (code === 'ENOENT') {
      log(`No package at "${relative(PWD, getPackageJsonPath(DEPS_PATH))}"`)

      return // halt
    } else {
      handlePackageError(e)

      return // halt
    }
  }

  let CONFIGURATION
  try {
    CONFIGURATION = await getDepsRc(DEPS_PATH)

    log(`Configuration at "${relative(PWD, getDepsRcPath(DEPS_PATH))}"`) // proceed
  } catch (e) {
    const {
      code
    } = e

    if (code === 'ENOENT') {
      try {
        CONFIGURATION = await getDepsRcJson(DEPS_PATH)

        log(`Configuration at "${relative(PWD, getDepsRcJsonPath(DEPS_PATH))}"`) // proceed
      } catch (e) {
        const {
          code
        } = e

        if (code === 'ENOENT') {
          CONFIGURATION = {}

          log(`No configuration at "${relative(PWD, getDepsRcPath(DEPS_PATH))}" or "${relative(PWD, getDepsRcJsonPath(DEPS_PATH))}"`) // proceed
        } else {
          handleConfigurationError(e)

          return // halt
        }
      }
    } else {
      handleConfigurationError(e)

      return // halt
    }
  }

  const {
    prod: P,
    dev: D,
    optional: O,
    bundle: B,
    peer: p,
    save,
    registry
  } = commander

  log({
    prod: P,
    dev: D,
    optional: O,
    bundle: B,
    peer: p,
    save,
    ...(registry ? { registry } : {})
  })

  if (P) {
    try {
      await execute(DEPS_PATH, getProdDependencies(PACKAGE), getProdDependencies(CONFIGURATION), save, registry)
    } catch (e) {
      handleError(e)
    }
  } else {
    if (D) {
      try {
        await execute(DEPS_PATH, getDevDependencies(PACKAGE), getDevDependencies(CONFIGURATION), save, registry)
      } catch (e) {
        handleError(e)
      }
    } else {
      if (O) {
        try {
          await execute(DEPS_PATH, getOptionalDependencies(PACKAGE), getOptionalDependencies(CONFIGURATION), save, registry)
        } catch (e) {
          handleError(e)
        }
      } else {
        if (B) {
          try {
            await execute(DEPS_PATH, getBundleDependencies(PACKAGE), getBundleDependencies(CONFIGURATION), save, registry)
          } catch (e) {
            handleError(e)
          }
        } else {
          if (p) {
            try {
              await execute(DEPS_PATH, getPeerDependencies(PACKAGE), getPeerDependencies(CONFIGURATION), save, registry)
            } catch (e) {
              handleError(e)
            }
          }
        }
      }
    }
  }

  log('Done.')
}

module.exports = app()
