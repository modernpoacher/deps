const debug = require('debug')

const {
  exec
} = require('child_process')

const log = debug('@modernpoacher/deps')
const use = (l) => (d) => l(d.trim())

const handleError = ({ code = 'NONE', message = 'No error message defined' }) => log({ code, message })

function rmrf (d = '.') {
  log('rmrf')

  return (
    new Promise((resolve, reject) => {
      const {
        stdout,
        stderr
      } = exec(`cd '${d}' && rm -rf node_modules package-lock.json`, { cwd: d }, (e, v) => (!e) ? resolve(v) : reject(e))

      const log = use(debug('@modernpoacher/deps:rmrf'))

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

      const log = use(debug('@modernpoacher/deps:npmi'))

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

      const log = use(debug('@modernpoacher/deps:deps'))

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
