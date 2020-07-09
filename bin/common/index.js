const debug = require('debug')

const {
  exec
} = require('child_process')

const log = debug('@modernpoacher/deps')
const use = (l) => (d) => l(d.trim())

const handleError = ({ code = 'NONE', message = 'No error message defined' }) => log({ code, message })

function rmrf (p = '.') {
  log('rmrf')

  return (
    new Promise((resolve, reject) => {
      const {
        stdout,
        stderr
      } = exec(`cd '${p}' && rm -rf node_modules package-lock.json`, { cwd: p }, (e, v) => (!e) ? resolve(v) : reject(e))

      const log = use(debug('@modernpoacher/deps:rmrf'))

      stdout.on('data', log)
      stderr.on('data', log)
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

      const log = use(debug('@modernpoacher/deps:npmi'))

      stdout.on('data', log)
      stderr.on('data', log)
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

      const log = use(debug('@modernpoacher/deps:rmrf'))

      stdout.on('data', log)
      stderr.on('data', log)
    })
  )
}

module.exports = {
  handleError,
  rmrf,
  npmi,
  deps
}
