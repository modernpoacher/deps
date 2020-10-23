#!/usr/bin/env node

require('module-alias/register')

const debug = require('debug')

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
  getPackageJson,
  getDepsRc,
  getDepsRcJson
} = require('~/bin/common')

const {
  execute
} = require('@modernpoacher/deps/install')

const log = debug('@modernpoacher/deps')

log('`install` is awake')

async function app () {
  log('Deps')

  const {
    argv,
    env: {
      DEBUG = '@modernpoacher/deps:*',
      DEPS_PATH = process.cwd()
    }
  } = process

  debug.enable(DEBUG)

  let PACKAGE
  try {
    PACKAGE = await getPackageJson(DEPS_PATH)
  } catch (e) {
    const {
      code
    } = e

    if (code === 'ENOENT') log(`No package at "${DEPS_PATH}"`)
    else handlePackageError(e)

    return
  }

  let CONFIGURATION
  try {
    CONFIGURATION = await getDepsRc(DEPS_PATH)

    log('Configuration at ".depsrc"') // proceed
  } catch (e) {
    const {
      code
    } = e

    if (code === 'ENOENT') {
      log('No configuration at ".depsrc"')

      try {
        CONFIGURATION = await getDepsRcJson(DEPS_PATH)

        log('Configuration at ".depsrc.json"') // proceed
      } catch (e) {
        const {
          code
        } = e

        if (code === 'ENOENT') {
          log('No configuration at ".depsrc.json"')

          return // halt
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

  commander
    .option('-P, --prod [dependencies]', 'Install `dependencies`', false)
    .option('-D, --dev [devDependencies]', 'Install `devDependencies`', false)
    .option('-O, --optional [optionalDependencies]', 'Install `optionalDependencies`', false)
    .option('-B, --bundle [bundleDependencies]', 'Install `bundleDependencies`', false)
    .option('-p, --peer [peerDependencies]', 'Install `peerDependencies`', false)
    .option('-s, --save [save]', 'Install `peerDependencies`', false)
    .option('--registry [registry]', 'Installation registry')
    .parse(argv)

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
