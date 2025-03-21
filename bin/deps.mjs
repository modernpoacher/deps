#!/usr/bin/env node

import debug from 'debug'

import {
  Command
} from 'commander'

import '#deps/src/common/debug'

import {
  VERSION,
  PLATFORM
} from '#deps/src/common/env'

import {
  getProdDependencies,
  getDevDependencies,
  getOptionalDependencies,
  getBundleDependencies
} from '#deps/src/common'

import {
  handleError,
  hasPackage,
  getPackage,
  hasConfiguration,
  getConfiguration
} from '#deps/bin/common'

import {
  executeProd,
  executeDev,
  executeOptional,
  executeBundle
} from '#deps/src'

const log = debug('@modernpoacher/deps')

log(`\`deps\` (${VERSION} - ${PLATFORM}) is awake`)

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
    .option('-P, --save-prod [dependencies]', 'Install `dependencies`', false)
    .option('-D, --save-dev [devDependencies]', 'Install `devDependencies`', false)
    .option('-O, --save-optional [optionalDependencies]', 'Install `optionalDependencies`', false)
    .option('-B, --save-bundle [bundleDependencies]', 'Install `bundleDependencies`', false)
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
    saveProd: P,
    saveDev: D,
    saveOptional: O,
    saveBundle: B,
    force,
    registry
  } = commander.opts()

  log({
    saveProd: P,
    saveDev: D,
    saveOptional: O,
    saveBundle: B,
    ...(registry ? { registry } : {}),
    ...(force ? { force } : {})
  })

  const {
    env: {
      PWD,
      DEPS_PATH = PWD
    }
  } = process

  const PACKAGE = (
    await hasPackage(DEPS_PATH)
      ? await getPackage(DEPS_PATH)
      : {}
  )

  const CONFIGURATION = (
    await hasConfiguration(DEPS_PATH)
      ? await getConfiguration(DEPS_PATH)
      : {}
  )

  if ((P && D) || (!P && !D && !O && !B)) {
    log('Prod')

    try {
      await executeProd(DEPS_PATH, getProdDependencies(PACKAGE), getProdDependencies(CONFIGURATION), registry, force)
    } catch (e) {
      handleError(e)
    }

    log('Dev')

    try {
      await executeDev(DEPS_PATH, getDevDependencies(PACKAGE), getDevDependencies(CONFIGURATION), registry, force)
    } catch (e) {
      handleError(e)
    }
  } else {
    if (P) {
      log('Prod')

      try {
        await executeProd(DEPS_PATH, getProdDependencies(PACKAGE), getProdDependencies(CONFIGURATION), registry, force)
      } catch (e) {
        handleError(e)
      }
    } else {
      if (D) {
        log('Dev')

        try {
          await executeDev(DEPS_PATH, getDevDependencies(PACKAGE), getDevDependencies(CONFIGURATION), registry, force)
        } catch (e) {
          handleError(e)
        }
      } else {
        if (O) {
          log('Optional')

          try {
            await executeOptional(DEPS_PATH, getOptionalDependencies(PACKAGE), getOptionalDependencies(CONFIGURATION), registry, force)
          } catch (e) {
            handleError(e)
          }
        } else {
          if (B) {
            log('Bundle')

            try {
              await executeBundle(DEPS_PATH, getBundleDependencies(PACKAGE), getBundleDependencies(CONFIGURATION), registry, force)
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
