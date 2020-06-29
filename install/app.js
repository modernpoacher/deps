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
  getBundleDependencies,
  getPeerDependencies
} = require('../lib/common')

const {
  execute
} = require('../lib/install')

const error = debug('@modernpoacher/deps:error')
const log = debug('@modernpoacher/deps:log')

async function app () {
  const {
    argv,
    env: {
      DEPS_PATH = process.cwd()
    }
  } = process

  let PACKAGE
  try {
    const p = resolve(DEPS_PATH, 'package.json')
    const s = await readFile(p, 'utf8')
    PACKAGE = JSON.parse(s)
  } catch ({ message }) {
    error(message)
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

      log({ code, message })
      return
    }
  }

  const {
    version
  } = PACKAGE

  commander
    .version(version)
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
    } catch ({ message }) {
      error(message)
    }
  } else {
    if (D) {
      try {
        await execute(DEPS_PATH, getDevDependencies(PACKAGE), getDevDependencies(CONFIGURATION), save, registry)
      } catch ({ message }) {
        error(message)
      }
    } else {
      if (O) {
        try {
          await execute(DEPS_PATH, getOptionalDependencies(PACKAGE), getOptionalDependencies(CONFIGURATION), save, registry)
        } catch ({ message }) {
          error(message)
        }
      } else {
        if (B) {
          try {
            await execute(DEPS_PATH, getBundleDependencies(PACKAGE), getBundleDependencies(CONFIGURATION), save, registry)
          } catch ({ message }) {
            error(message)
          }
        } else {
          if (p) {
            try {
              await execute(DEPS_PATH, getPeerDependencies(PACKAGE), getPeerDependencies(CONFIGURATION), save, registry)
            } catch ({ message }) {
              error(message)
            }
          }
        }
      }
    }
  }
}

module.exports = app()
