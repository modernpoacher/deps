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
  handlePackageError,
  handleConfigurationError,
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

const log = debug('@modernpoacher/deps')

log('`deps` is awake')

async function app () {
  log('Deps')

  const {
    argv,
    env: {
      PWD,
      DEPS_PATH = PWD || process.cwd()
    }
  } = process

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
    .option('-P, --save-prod [dependencies]', 'Install `dependencies`', false)
    .option('-D, --save-dev [devDependencies]', 'Install `devDependencies`', false)
    .option('-O, --save-optional [optionalDependencies]', 'Install `optionalDependencies`', false)
    .option('-B, --save-bundle [bundleDependencies]', 'Install `bundleDependencies`', false)
    .option('--registry [registry]', 'Installation registry')
    .parse(argv)

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
