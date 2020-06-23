#!/usr/bin/env node

require('@babel/register')({
  cwd: process.cwd() // __dirname
})

const {
  resolve
} = require('path')

const {
  readFile
} = require('sacred-fs')

const commander = require('commander')

const debug = require('debug')

const {
  executeProd,
  executeDev,
  executeOptional,
  executeBundle
} = require('./lib')

const error = debug('@modernpoacher/deps:error')
const log = debug('@modernpoacher/deps:log')

const app = async () => {
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
  } catch ({ message }) {
    error(message)
  }

  const {
    name = '@modernpoacher/deps',
    version
  } = PACKAGE

  log(name, version)

  commander
    .version(version)
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
    registry
  })

  if ((P && D) || (!P && !D && !O && !B)) {
    const {
      dependencies = {},
      devDependencies = {}
    } = PACKAGE

    try {
      await executeProd(DEPS_PATH, dependencies, registry)
      await executeDev(DEPS_PATH, devDependencies, registry)
    } catch ({ message }) {
      error(message)
    }
  } else if (P) {
    const {
      dependencies = {}
    } = PACKAGE

    try {
      await executeProd(DEPS_PATH, dependencies, registry)
    } catch ({ message }) {
      error(message)
    }
  } else if (D) {
    const {
      devDependencies = {}
    } = PACKAGE

    try {
      await executeDev(DEPS_PATH, devDependencies, registry)
    } catch ({ message }) {
      error(message)
    }
  } else if (O) {
    const {
      optionalDependencies = {}
    } = PACKAGE

    try {
      await executeOptional(DEPS_PATH, optionalDependencies, registry)
    } catch ({ message }) {
      error(message)
    }
  } else if (B) {
    const {
      bundleDependencies = {}
    } = PACKAGE

    try {
      await executeBundle(DEPS_PATH, bundleDependencies, registry)
    } catch ({ message }) {
      error(message)
    }
  }
}

module.exports = app()
