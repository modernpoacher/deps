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
  getBundleDependencies,
  getPeerDependencies
} = require('@modernpoacher/deps/common')

const {
  handleError,
  hasPackage,
  getPackage,
  hasConfiguration,
  getConfiguration
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

log(`\`install\` (${VERSION} - ${PLATFORM}) is awake`)

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
    .option('-P, --prod [dependencies]', 'Install `dependencies`', false)
    .option('-D, --dev [devDependencies]', 'Install `devDependencies`', false)
    .option('-O, --optional [optionalDependencies]', 'Install `optionalDependencies`', false)
    .option('-B, --bundle [bundleDependencies]', 'Install `bundleDependencies`', false)
    .option('-p, --peer [peerDependencies]', 'Install `peerDependencies`', false)
    .option('-s, --save [save]', 'Install `peerDependencies`', false)
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
    prod: P,
    dev: D,
    optional: O,
    bundle: B,
    peer: p,
    save,
    registry,
    force,
    author
  } = commander.opts()

  log({
    prod: P,
    dev: D,
    optional: O,
    bundle: B,
    peer: p,
    save,
    ...(registry ? { registry } : {}),
    ...(force ? { force } : {})
  })

  if (P) {
    log('Prod')

    try {
      await execute(DEPS_PATH, getProdDependencies(PACKAGE), getProdDependencies(CONFIGURATION), save, registry, force, author)
    } catch (e) {
      handleError(e)
    }
  } else {
    if (D) {
      log('Dev')

      try {
        await execute(DEPS_PATH, getDevDependencies(PACKAGE), getDevDependencies(CONFIGURATION), save, registry, force, author)
      } catch (e) {
        handleError(e)
      }
    } else {
      if (O) {
        log('Optional')

        try {
          await execute(DEPS_PATH, getOptionalDependencies(PACKAGE), getOptionalDependencies(CONFIGURATION), save, registry, force, author)
        } catch (e) {
          handleError(e)
        }
      } else {
        if (B) {
          log('Bundle')

          try {
            await execute(DEPS_PATH, getBundleDependencies(PACKAGE), getBundleDependencies(CONFIGURATION), save, registry, force, author)
          } catch (e) {
            handleError(e)
          }
        } else {
          if (p) {
            log('Peer')

            try {
              await execute(DEPS_PATH, getPeerDependencies(PACKAGE), getPeerDependencies(CONFIGURATION), save, registry, force, author)
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
