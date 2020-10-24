const debug = require('debug')

const {
  exec
} = require('child_process')

const {
  resolve
} = require('path')

const {
  readFile
} = require('fs/promises')

const log = debug('@modernpoacher/deps')

log('`common` is awake')

const DIRECTORY = '.'
const REGISTRY = 'https://registry.npmjs.org'

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

function rmrf (directory = DIRECTORY) {
  log('rmrf')

  return (
    new Promise((resolve, reject) => {
      const command = `cd '${directory}' && rm -rf node_modules package-lock.json`

      const {
        stdout,
        stderr
      } = exec(command, { cwd: directory }, (e, v) => (!e) ? resolve(v) : reject(e))

      stdout.on('data', use('rmrf'))
      stderr.on('data', use('rmrf'))
    })
  )
}

function npmi (directory = DIRECTORY, registry = REGISTRY) {
  log('npmi')

  return (
    new Promise((resolve, reject) => {
      const command = `cd '${directory}' && npm i --registry ${registry}`

      const {
        stdout,
        stderr
      } = exec(command, { cwd: directory }, (e, v) => (!e) ? resolve(v) : reject(e))

      stdout.on('data', use('npmi'))
      stderr.on('data', use('npmi'))
    })
  )
}

function deps (directory = DIRECTORY, registry = REGISTRY) {
  log('deps')

  return (
    new Promise((resolve, reject) => {
      const command = `cd '${directory}' && deps --registry ${registry}`

      const {
        stdout,
        stderr
      } = exec(command, { cwd: directory }, (e, v) => (!e) ? resolve(v) : reject(e))

      stdout.on('data', use('deps'))
      stderr.on('data', use('deps'))
    })
  )
}

module.exports = {
  handleError,
  handlePackageError,
  handleConfigurationError,
  getPackageJsonPath,
  getDepsRcPath,
  getDepsRcJsonPath,
  getPackageJson,
  getDepsRc,
  getDepsRcJson,
  rmrf,
  npmi,
  deps
}
