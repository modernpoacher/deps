#!/usr/bin/env node

require('module-alias/register')

const debug = require('debug')

const commander = require('commander')

const {
  getProdDependencies,
  getDevDependencies,
  getOptionalDependencies,
  getBundleDependencies
} = require('@modernpoacher/deps/common')

const {
  handleError,
  hasPackage,
  getPackage,
  hasConfiguration,
  getConfiguration
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
    .version('1.1.0')
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

  const PACKAGE = await hasPackage(DEPS_PATH)
    ? await getPackage(DEPS_PATH)
    : {}

  const CONFIGURATION = await hasConfiguration(DEPS_PATH)
    ? await getConfiguration(DEPS_PATH)
    : {}

  const {
    saveProd: P,
    saveDev: D,
    saveOptional: O,
    saveBundle: B,
    registry
  } = commander.opts()

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
