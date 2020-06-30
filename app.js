#!/usr/bin/env node

const {
  resolve
} = require('path')

const {
  readFile
} = require('sacred-fs')

const commander = require('commander')

const debug = require('debug')

const {
  getProdDependencies,
  getDevDependencies,
  getOptionalDependencies,
  getBundleDependencies
} = require('./lib/common')

const {
  executeProd,
  executeDev,
  executeOptional,
  executeBundle
} = require('./lib')

const log = debug('@modernpoacher/deps')

async function app () {
  const {
    argv,
    env: {
      PWD,
      DEPS_PATH = PWD || process.cwd()
    }
  } = process

  let PACKAGE
  try {
    const p = resolve(DEPS_PATH, 'package.json')
    const s = await readFile(p, 'utf8')
    PACKAGE = JSON.parse(s)
  } catch (e) {
    const {
      code
    } = e

    if (code === 'ENOENT') log(`No package at "${DEPS_PATH}"`)
    else {
      const {
        message
      } = e

      log(`Package error: "${message}"`)
    }

    return
  }

  let CONFIGURATION
  try {
    const p = resolve(DEPS_PATH, '.depsrc')
    const s = await readFile(p, 'utf8')
    CONFIGURATION = JSON.parse(s)
  } catch (e) {
    const {
      code
    } = e

    if (code === 'ENOENT') CONFIGURATION = {}
    else {
      const {
        message
      } = e

      log(`Configuration error: "${message}"`)
      return
    }
  }

  const {
    version
  } = PACKAGE

  commander
    .version(version, '-v, --version', 'Version')
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
    } catch ({ message }) {
      log(message)
    }
  } else {
    if (P) {
      try {
        await executeProd(DEPS_PATH, getProdDependencies(PACKAGE), getProdDependencies(CONFIGURATION), registry)
      } catch ({ message }) {
        log(message)
      }
    } else {
      if (D) {
        try {
          await executeDev(DEPS_PATH, getDevDependencies(PACKAGE), getDevDependencies(CONFIGURATION), registry)
        } catch ({ message }) {
          log(message)
        }
      } else {
        if (O) {
          try {
            await executeOptional(DEPS_PATH, getOptionalDependencies(PACKAGE), getOptionalDependencies(CONFIGURATION), registry)
          } catch ({ message }) {
            log(message)
          }
        } else {
          if (B) {
            try {
              await executeBundle(DEPS_PATH, getBundleDependencies(PACKAGE), getBundleDependencies(CONFIGURATION), registry)
            } catch ({ message }) {
              log(message)
            }
          }
        }
      }
    }
  }
}

module.exports = app()
