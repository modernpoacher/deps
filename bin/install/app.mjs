#!/usr/bin/env node

import debug from 'debug'

import {
  Command
} from 'commander'

import {
  VERSION,
  PLATFORM
} from '#deps/src/common/env'

import {
  getProdDependencies,
  getDevDependencies,
  getOptionalDependencies,
  getBundleDependencies,
  getPeerDependencies
} from '#deps/src/common'

import {
  handleError,
  hasPackage,
  getPackage,
  hasConfiguration,
  getConfiguration
} from '#deps/bin/common'

import {
  execute
} from '#deps/src/install'

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

  const commander = new Command()

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
    .option('-s, --save [save]', 'Save installed dependencies', false)
    .option('--registry [registry]', 'Installation registry')
    .option('--force [force]', 'Force installation`', false)
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
    force
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
      await execute(DEPS_PATH, getProdDependencies(PACKAGE), getProdDependencies(CONFIGURATION), save, registry, force)
    } catch (e) {
      handleError(e)
    }
  } else {
    if (D) {
      log('Dev')

      try {
        await execute(DEPS_PATH, getDevDependencies(PACKAGE), getDevDependencies(CONFIGURATION), save, registry, force)
      } catch (e) {
        handleError(e)
      }
    } else {
      if (O) {
        log('Optional')

        try {
          await execute(DEPS_PATH, getOptionalDependencies(PACKAGE), getOptionalDependencies(CONFIGURATION), save, registry, force)
        } catch (e) {
          handleError(e)
        }
      } else {
        if (B) {
          log('Bundle')

          try {
            await execute(DEPS_PATH, getBundleDependencies(PACKAGE), getBundleDependencies(CONFIGURATION), save, registry, force)
          } catch (e) {
            handleError(e)
          }
        } else {
          if (p) {
            log('Peer')

            try {
              await execute(DEPS_PATH, getPeerDependencies(PACKAGE), getPeerDependencies(CONFIGURATION), save, registry, force)
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

export default app()
