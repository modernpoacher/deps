require('@babel/register')({
  cwd: __dirname
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
} = require('./src')

const error = debug('deps:error')
const log = debug('deps:log')

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
    .option('-P, --save-prod [dependencies]', 'Install `dependencies`')
    .option('-D, --save-dev [devDependencies]', 'Install `devDependencies`')
    .option('-O, --save-optional [optionalDependencies]', 'Install `optionalDependencies`')
    .option('-B, --save-bundle [bundleDependencies]', 'Install `bundleDependencies`')
    .parse(argv)

  const {
    saveProd: P = false,
    saveDev: D = false,
    saveOptional: O = false,
    saveBundle: B = false
  } = commander

  log({
    saveProd: P,
    saveDev: D,
    saveOptional: O,
    saveBundle: B
  })

  if ((P && D) || (!P && !D && !O && !B)) {
    const {
      dependencies = {},
      devDependencies = {}
    } = PACKAGE

    try {
      await executeProd(DEPS_PATH, dependencies)
      await executeDev(DEPS_PATH, devDependencies)
    } catch ({ message }) {
      error(message)
    }
  } else if (P) {
    const {
      dependencies = {}
    } = PACKAGE

    try {
      await executeProd(DEPS_PATH, dependencies)
    } catch ({ message }) {
      error(message)
    }
  } else if (D) {
    const {
      devDependencies = {}
    } = PACKAGE

    try {
      await executeDev(DEPS_PATH, devDependencies)
    } catch ({ message }) {
      error(message)
    }
  } else if (O) {
    const {
      optionalDependencies = {}
    } = PACKAGE

    try {
      await executeOptional(DEPS_PATH, optionalDependencies)
    } catch ({ message }) {
      error(message)
    }
  } else if (B) {
    const {
      bundleDependencies = {}
    } = PACKAGE

    try {
      await executeBundle(DEPS_PATH, bundleDependencies)
    } catch ({ message }) {
      error(message)
    }
  }
}

module.exports = app()
