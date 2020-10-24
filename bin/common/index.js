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
      const log = debug('@modernpoacher/deps:rmrf')

      log({ d })

      const {
        stdout,
        stderr
      } = exec(`cd '${d}' && rm -rf node_modules package-lock.json`, { cwd: d }, (e, v) => (!e) ? resolve(v) : reject(e))

      stdout.on('data', use('rmrf'))
      stderr.on('data', use('rmrf'))
    })
  )
}

function npmi (d = '.', r = 'https://registry.npmjs.org') {
  log('npmi')

  return (
    new Promise((resolve, reject) => {
      const log = debug('@modernpoacher/deps:npmi')

      log({ d, r })

      const {
        stdout,
        stderr
      } = exec(`cd '${d}' && npm i --registry ${r}`, { cwd: d }, (e, v) => (!e) ? resolve(v) : reject(e))

      stdout.on('data', use('npmi'))
      stderr.on('data', use('npmi'))
    })
  )
}

function deps (d = '.', r = 'https://registry.npmjs.org') {
  log('deps')

  return (
    new Promise((resolve, reject) => {
      const log = debug('@modernpoacher/deps:deps')

      log({ d, r })

      const {
        stdout,
        stderr
      } = exec(`cd '${d}' && deps --registry ${r}`, { cwd: d }, (e, v) => (!e) ? resolve(v) : reject(e))

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
