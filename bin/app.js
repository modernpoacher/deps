#!/usr/bin/env node

require('module-alias/register')

const debug = require('debug')

const commander = require('commander')

const {
  version: VERSION
} = require('~/package')

const {
  PLATFORM
} = require('@modernpoacher/deps/common/env')

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

log(`\`deps\` (${VERSION} - ${PLATFORM}) is awake`)

async function app () {
  log('Deps')

  const {
    argv
  } = process

  /*
   *  `version` is printed into this file at pre-commit
   */
  commander
    .version(VERSION)
    .option('-P, --save-prod [dependencies]', 'Install `dependencies`', false)
    .option('-D, --save-dev [devDependencies]', 'Install `devDependencies`', false)
    .option('-O, --save-optional [optionalDependencies]', 'Install `optionalDependencies`', false)
    .option('-B, --save-bundle [bundleDependencies]', 'Install `bundleDependencies`', false)
    .option('--registry [registry]', 'Installation registry')
    .option('--force [force]', 'Force installation`', false)
    .option('--author [author]', 'Git commit author')
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
    force,
    registry,
    author
  } = commander.opts()

  log({
    saveProd: P,
    saveDev: D,
    saveOptional: O,
    saveBundle: B,
    ...(registry ? { registry } : {}),
    ...(force ? { force } : {})
  })

  if ((P && D) || (!P && !D && !O && !B)) {
    log('Prod')

    try {
      await executeProd(DEPS_PATH, getProdDependencies(PACKAGE), getProdDependencies(CONFIGURATION), registry, force, author)
    } catch (e) {
      handleError(e)
    }

    log('Dev')

    try {
      await executeDev(DEPS_PATH, getDevDependencies(PACKAGE), getDevDependencies(CONFIGURATION), registry, force, author)
    } catch (e) {
      handleError(e)
    }
  } else {
    if (P) {
      log('Prod')

      try {
        await executeProd(DEPS_PATH, getProdDependencies(PACKAGE), getProdDependencies(CONFIGURATION), registry, force, author)
      } catch (e) {
        handleError(e)
      }
    } else {
      if (D) {
        log('Dev')

        try {
          await executeDev(DEPS_PATH, getDevDependencies(PACKAGE), getDevDependencies(CONFIGURATION), registry, force, author)
        } catch (e) {
          handleError(e)
        }
      } else {
        if (O) {
          log('Optional')

          try {
            await executeOptional(DEPS_PATH, getOptionalDependencies(PACKAGE), getOptionalDependencies(CONFIGURATION), registry, force, author)
          } catch (e) {
            handleError(e)
          }
        } else {
          if (B) {
            log('Bundle')

            try {
              await executeBundle(DEPS_PATH, getBundleDependencies(PACKAGE), getBundleDependencies(CONFIGURATION), registry, force, author)
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
