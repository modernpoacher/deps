const debug = require('debug')

const {
  exec
} = require('child_process')

const log = debug('@modernpoacher/deps')

function rmrf (p = '.') {
  log('rmrf')

  return (
    new Promise((resolve, reject) => {
      const {
        stdout,
        stderr
      } = exec(`cd '${p}' && rm -rf node_modules package-lock.json`, { cwd: p }, (e, v) => (!e) ? resolve(v) : reject(e))

      stdout.on('data', debug('@modernpoacher/deps:rmrf'))
      stderr.on('data', debug('@modernpoacher/deps:rmrf'))
    })
  )
}

function npmi (p = '.', r = 'https://registry.npmjs.org') {
  log('npmi')

  return (
    new Promise((resolve, reject) => {
      const {
        stdout,
        stderr
      } = exec(`cd '${p}' && npm i --registry ${r}`, { cwd: p }, (e, v) => (!e) ? resolve(v) : reject(e))

      stdout.on('data', debug('@modernpoacher/deps:npmi'))
      stderr.on('data', debug('@modernpoacher/deps:npmi'))
    })
  )
}

function deps (p = '.', r = 'https://registry.npmjs.org') {
  log('deps')

  return (
    new Promise((resolve, reject) => {
      const {
        stdout,
        stderr
      } = exec(`cd '${p}' && deps --registry ${r}`, { cwd: p }, (e, v) => (!e) ? resolve(v) : reject(e))

      stdout.on('data', debug('@modernpoacher/deps:rmrf'))
      stderr.on('data', debug('@modernpoacher/deps:rmrf'))
    })
  )
}

module.exports = {
  rmrf,
  npmi,
  deps
}
