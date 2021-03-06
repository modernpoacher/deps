#!/usr/bin/env node

require('module-alias/register')

const debug = require('debug')

const {
  exec
} = require('child_process')

const {
  resolve,
  relative
} = require('path')

const {
  constants
} = require('fs')

const {
  access,
  readFile
} = require('fs/promises')

const {
  DIRECTORY,
  REGISTRY,
  NVM
} = require('@modernpoacher/deps/common')

const log = debug('@modernpoacher/deps')

log('`common` is awake')

const normalise = (value) => value.replace(/\n\n/gm, String.fromCharCode(10)).trim()

const getRmrfCommands = (directory = DIRECTORY) => normalise(`
#!/bin/bash

cd "${directory}"

rm -rf node_modules package-lock.json

exit 0
`)

const getNpmiCommands = (directory = DIRECTORY, registry = REGISTRY) => normalise(`
#!/bin/bash

cd "${directory}"

. "${NVM}"

npm i --registry ${registry}

exit 0
`)

const getDepsCommands = (directory = DIRECTORY, registry = REGISTRY) => normalise(`
#!/bin/bash

cd "${directory}"

deps --registry ${registry}

exit 0
`)

const toRelativePath = (to) => relative(process.cwd(), to) // const toRelativePath = relative.bind(null, process.cwd())

function use (n) {
  const log = debug(`@modernpoacher/deps:${n}`)

  return function use (v) {
    log(v.trim()) // .replace(/(\s+)$/g, '')
  }
}

function handleError ({ code = 'NONE', message = 'No error message defined' }) {
  log({
    code,
    message
  })
}

const handlePackageError = ({ message }) => log(`Package error: "${message}"`)

const handleConfigurationError = ({ message }) => log(`Configuration error: "${message}"`)

const getPackageJsonPath = (directory = DIRECTORY) => resolve(directory, 'package.json')

const getDepsRcPath = (directory = DIRECTORY) => resolve(directory, '.depsrc')

const getDepsRcJsonPath = (directory = DIRECTORY) => resolve(directory, '.depsrc.json')

async function getPackageJson (directory = DIRECTORY) {
  log('getPackageJson')

  return JSON.parse(
    await readFile(getPackageJsonPath(directory), 'utf8')
  )
}

async function getDepsRc (directory = DIRECTORY) {
  log('getDepsRc')

  return JSON.parse(
    await readFile(getDepsRcPath(directory), 'utf8')
  )
}

async function getDepsRcJson (directory = DIRECTORY) {
  log('getDepsRcJson')

  return JSON.parse(
    await readFile(getDepsRcJsonPath(directory), 'utf8')
  )
}

async function hasPackage (directory = DIRECTORY) {
  try {
    await access(getPackageJsonPath(directory), constants.R_OK)

    log(`Package at "${toRelativePath(getPackageJsonPath(directory))}"`)
    return true
  } catch (e) {
    log(`No package at "${toRelativePath(getPackageJsonPath(directory))}"`)
    return false
  }
}

async function getPackage (directory = DIRECTORY) {
  try {
    return await getPackageJson(directory)
  } catch (e) {
    handlePackageError(e)
  }
}

async function hasConfiguration (directory = DIRECTORY) {
  try {
    await access(getDepsRcPath(directory), constants.R_OK)

    log(`Configuration at "${toRelativePath(getDepsRcPath(directory))}"`)
    return true
  } catch (e) {
    const {
      code
    } = e

    if (code !== 'ENOENT') {
      handleConfigurationError(e)
    } else {
      try {
        await access(getDepsRcJsonPath(directory), constants.R_OK)

        log(`Configuration at "${toRelativePath(getDepsRcJsonPath(directory))}"`)
        return true
      } catch (e) {
        const {
          code
        } = e

        if (code !== 'ENOENT') {
          handleConfigurationError(e)
        }
      }
    }
  }

  log(`No configuration at "${toRelativePath(getDepsRcPath(directory))}" or "${toRelativePath(getDepsRcJsonPath(directory))}"`)
  return false
}

async function getConfiguration (directory = DIRECTORY) {
  try {
    return await getDepsRc(directory)
  } catch (e) {
    const {
      code
    } = e

    if (code !== 'ENOENT') {
      handleConfigurationError(e)
    } else {
      try {
        return await getDepsRcJson(directory)
      } catch (e) {
        const {
          code
        } = e

        if (code !== 'ENOENT') {
          handleConfigurationError(e)
        }
      }
    }
  }
}

function rmrf (directory = DIRECTORY) {
  log('rmrf')

  return (
    new Promise((resolve, reject) => {
      const commands = getRmrfCommands(directory)

      const {
        stdout,
        stderr
      } = exec(commands, { cwd: directory }, (e, v) => (!e) ? resolve(v) : reject(e))

      stdout.on('data', use('rmrf'))
      stderr.on('data', use('rmrf'))
    })
  )
}

function npmi (directory = DIRECTORY, registry = REGISTRY) {
  log('npmi')

  return (
    new Promise((resolve, reject) => {
      const commands = getNpmiCommands(directory, registry)

      const {
        stdout,
        stderr
      } = exec(commands, { cwd: directory }, (e, v) => (!e) ? resolve(v) : reject(e))

      stdout.on('data', use('npmi'))
      stderr.on('data', use('npmi'))
    })
  )
}

function deps (directory = DIRECTORY, registry = REGISTRY) {
  log('deps')

  return (
    new Promise((resolve, reject) => {
      const commands = getDepsCommands(directory, registry)

      const {
        stdout,
        stderr
      } = exec(commands, { cwd: directory }, (e, v) => (!e) ? resolve(v) : reject(e))

      stdout.on('data', use('deps'))
      stderr.on('data', use('deps'))
    })
  )
}

module.exports = {
  DIRECTORY,
  REGISTRY,
  NVM,
  handleError,
  handlePackageError,
  handleConfigurationError,
  getPackageJsonPath,
  getDepsRcPath,
  getDepsRcJsonPath,
  getPackageJson,
  getDepsRc,
  getDepsRcJson,
  hasPackage,
  getPackage,
  hasConfiguration,
  getConfiguration,
  rmrf,
  npmi,
  deps
}
