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

const handleError = ({ code = 'NONE', message = 'No error message defined' }) => log({ code, message })

const handlePackageError = ({ message }) => log(`Package error: "${message}"`)

const handleConfigurationError = ({ message }) => log(`Configuration error: "${message}"`)

const getPackageJsonPath = (p = '.') => resolve(p, 'package.json')

const getDepsRcPath = (p = '.') => resolve(p, '.depsrc')

const getDepsRcJsonPath = (p = '.') => resolve(p, '.depsrc.json')

async function getPackageJson (p = '.') {
  const f = getPackageJsonPath(p)
  const s = await readFile(f, 'utf8')
  return JSON.parse(s)
}

async function getDepsRc (p = '.') {
  const f = getDepsRcPath(p)
  const s = await readFile(f, 'utf8')
  return JSON.parse(s)
}

async function getDepsRcJson (p = '.') {
  const f = getDepsRcJsonPath(p)
  const s = await readFile(f, 'utf8')
  return JSON.parse(s)
}

function rmrf (d = '.') {
  log('rmrf')

  return (
    new Promise((resolve, reject) => {
      const {
        stdout,
        stderr
      } = exec(`cd '${d}' && rm -rf node_modules package-lock.json`, { cwd: d }, (e, v) => (!e) ? resolve(v) : reject(e))

      const log = use('rmrf')

      stdout.on('data', log)
      stderr.on('data', log)
    })
  )
}

function npmi (d = '.', r = 'https://registry.npmjs.org') {
  log('npmi')

  return (
    new Promise((resolve, reject) => {
      const {
        stdout,
        stderr
      } = exec(`cd '${d}' && npm i --registry ${r}`, { cwd: d }, (e, v) => (!e) ? resolve(v) : reject(e))

      const log = use('npmi')

      stdout.on('data', log)
      stderr.on('data', log)
    })
  )
}

function deps (d = '.', r = 'https://registry.npmjs.org') {
  log('deps')

  return (
    new Promise((resolve, reject) => {
      const {
        stdout,
        stderr
      } = exec(`cd '${d}' && deps --registry ${r}`, { cwd: d }, (e, v) => (!e) ? resolve(v) : reject(e))

      const log = use('deps')

      stdout.on('data', log)
      stderr.on('data', log)
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
