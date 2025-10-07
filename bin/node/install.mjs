#!/usr/bin/env node

import {
  Command
} from 'commander'

import '#deps/src/common/write'

import debug from '#deps/src/common/debug'

import {
  NAME,
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

const log = debug('@modernpoacher/deps')

log(`\`install\` (${NAME} - ${VERSION} - ${PLATFORM}) is awake`)

/**
 *  @function app
 */
async function app () {
  log('Deps')

  const commander = new Command(NAME)

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

  if (P) {
    log('Prod')

    try {
      await execute(DEPS_PATH, getProdDependencies(PACKAGE), getProdDependencies(CONFIGURATION), save, registry, force)
    } catch (e) {
      if (e instanceof Error) handleError(e)
    }
  } else {
    if (D) {
      log('Dev')

      try {
        await execute(DEPS_PATH, getDevDependencies(PACKAGE), getDevDependencies(CONFIGURATION), save, registry, force)
      } catch (e) {
        if (e instanceof Error) handleError(e)
      }
    } else {
      if (O) {
        log('Optional')

        try {
          await execute(DEPS_PATH, getOptionalDependencies(PACKAGE), getOptionalDependencies(CONFIGURATION), save, registry, force)
        } catch (e) {
          if (e instanceof Error) handleError(e)
        }
      } else {
        if (B) {
          log('Bundle')

          try {
            await execute(DEPS_PATH, getBundleDependencies(PACKAGE), getBundleDependencies(CONFIGURATION), save, registry, force)
          } catch (e) {
            if (e instanceof Error) handleError(e)
          }
        } else {
          if (p) {
            log('Peer')

            try {
              await execute(DEPS_PATH, getPeerDependencies(PACKAGE), getPeerDependencies(CONFIGURATION), save, registry, force)
            } catch (e) {
              if (e instanceof Error) handleError(e)
            }
          }
        }
      }
    }
  }

  log('Done.')
}

export default app()
