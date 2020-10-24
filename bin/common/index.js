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

const use = (n) => {
  const log = debug(`@modernpoacher/deps:${n}`)

  return (v) => {
    log(v.trim()) // .replace(/(\s+)$/g, '')
  }
}

function handleError ({ code = 'NONE', message = 'No error message defined' }) {
  if (code === 1) {
    log(message)
  } else {
    log({
      code,
      message
    })
  }
}

const handlePackageError = ({ message }) => log(`Package error: "${message}"`)

const handleConfigurationError = ({ message }) => log(`Configuration error: "${message}"`)

const getPackageJsonPath = (p = '.') => resolve(p, 'package.json')

const getDepsRcPath = (p = '.') => resolve(p, '.depsrc')

const getDepsRcJsonPath = (p = '.') => resolve(p, '.depsrc.json')

async function getPackageJson (p = '.') {
  log('getPackageJson')

  return JSON.parse(
    await readFile(getPackageJsonPath(p), 'utf8')
  )
}

async function getDepsRc (p = '.') {
  log('getDepsRc')

  return JSON.parse(
    await readFile(getDepsRcPath(p), 'utf8')
  )
}

async function getDepsRcJson (p = '.') {
  log('getDepsRcJson')

  return JSON.parse(
    await readFile(getDepsRcJsonPath(p), 'utf8')
  )
}

function rmrf (d = '.') {
  log('rmrf')

  return (
    new Promise((resolve, reject) => {
      const command = `cd '${d}' && rm -rf node_modules package-lock.json`

      const {
        stdout,
        stderr
      } = exec(command, { cwd: d }, (e, v) => (!e) ? resolve(v) : reject(e))

      stdout.on('data', use('rmrf'))
      stderr.on('data', use('rmrf'))
    })
  )
}

function npmi (d = '.', r = 'https://registry.npmjs.org') {
  log('npmi')

  return (
    new Promise((resolve, reject) => {
      const command = `cd '${d}' && npm i --registry ${r}`

      const {
        stdout,
        stderr
      } = exec(command, { cwd: d }, (e, v) => (!e) ? resolve(v) : reject(e))

      stdout.on('data', use('npmi'))
      stderr.on('data', use('npmi'))
    })
  )
}

function deps (d = '.', r = 'https://registry.npmjs.org') {
  log('deps')

  return (
    new Promise((resolve, reject) => {
      const command = `cd '${d}' && deps --registry ${r}`

      const {
        stdout,
        stderr
      } = exec(command, { cwd: d }, (e, v) => (!e) ? resolve(v) : reject(e))

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
