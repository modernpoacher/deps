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
  getBundleDependencies
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
} = require('./common')

const {
  executeProd,
  executeDev,
  executeOptional,
  executeBundle
} = require('@modernpoacher/deps')

const {
  env: {
    DEBUG = '@modernpoacher/deps*'
  }
} = process

debug.enable(DEBUG)

const log = debug('@modernpoacher/deps')

log('`deps` is awake')

async function app () {
  log('Deps')

  const {
    argv
  } = process

  /*
   *  `version` is printed into this file at pre-commit
   */
  commander
    .version('1.0.33')
    .option('-P, --save-prod [dependencies]', 'Install `dependencies`', false)
    .option('-D, --save-dev [devDependencies]', 'Install `devDependencies`', false)
    .option('-O, --save-optional [optionalDependencies]', 'Install `optionalDependencies`', false)
    .option('-B, --save-bundle [bundleDependencies]', 'Install `bundleDependencies`', false)
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
    saveProd: P,
    saveDev: D,
    saveOptional: O,
    saveBundle: B,
    registry
  } = commander

  log({
    saveProd: P,
    saveDev: D,
    saveOptional: O,
    saveBundle: B,
    ...(registry ? { registry } : {})
  })

  if ((P && D) || (!P && !D && !O && !B)) {
    try {
      await executeProd(DEPS_PATH, getProdDependencies(PACKAGE), getProdDependencies(CONFIGURATION), registry)
      await executeDev(DEPS_PATH, getDevDependencies(PACKAGE), getDevDependencies(CONFIGURATION), registry)
    } catch (e) {
      handleError(e)
    }
  } else {
    if (P) {
      try {
        await executeProd(DEPS_PATH, getProdDependencies(PACKAGE), getProdDependencies(CONFIGURATION), registry)
      } catch (e) {
        handleError(e)
      }
    } else {
      if (D) {
        try {
          await executeDev(DEPS_PATH, getDevDependencies(PACKAGE), getDevDependencies(CONFIGURATION), registry)
        } catch (e) {
          handleError(e)
        }
      } else {
        if (O) {
          try {
            await executeOptional(DEPS_PATH, getOptionalDependencies(PACKAGE), getOptionalDependencies(CONFIGURATION), registry)
          } catch (e) {
            handleError(e)
          }
        } else {
          if (B) {
            try {
              await executeBundle(DEPS_PATH, getBundleDependencies(PACKAGE), getBundleDependencies(CONFIGURATION), registry)
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
