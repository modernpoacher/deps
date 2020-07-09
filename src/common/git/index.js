import debug from 'debug'

import {
  exec
} from 'child_process'

const OPTIONS = {
  maxBuffer: 1024 * 2000
}

const log = debug('@modernpoacher/deps')

export function gitRevParse (p) {
  log('gitRevParse')

  return (
    new Promise((resolve, reject) => {
      const {
        stdout,
        stderr
      } = exec('git rev-parse --show-toplevel', { ...OPTIONS, cwd: p /* , stdio: 'inherit' */ }, (e, v = '') => (!e) ? resolve(v.trim()) : reject(e))

      stdout.on('data', (data) => {
        const s = data.trim()

        if (s === p) return

        debug('@modernpoacher/deps:gitRevParse')(s)
      })
      stderr.on('data', (data) => {
        const s = data.trim()

        if (s === p || s.startsWith('fatal: not a git repository')) return

        debug('@modernpoacher/deps:gitRevParse')(s)
      })
    })
  )
}

export function gitCheckout (p = '.', b = 'master') {
  log('gitCheckout')

  return (
    new Promise((resolve, reject) => {
      const {
        stdout,
        stderr
      } = exec(`cd "${p}" && git checkout ${b}`, { ...OPTIONS, cwd: p /* , stdio: 'inherit' */ }, (e, v) => (!e) ? resolve(v) : reject(e))

      stdout.on('data', (data) => debug('@modernpoacher/deps:gitCheckout')(data.trim()))
      stderr.on('data', (data) => debug('@modernpoacher/deps:gitCheckout')(data.trim()))
    })
  )
}

export function gitPull (p = '.') {
  log('gitPull')

  return (
    new Promise((resolve, reject) => {
      const {
        stdout,
        stderr
      } = exec(`cd "${p}" && git pull`, { ...OPTIONS, cwd: p /* , stdio: 'inherit' */ }, (e, v) => (!e) ? resolve(v) : reject(e))

      stdout.on('data', (data) => debug('@modernpoacher/deps:gitPull')(data.trim()))
      stderr.on('data', (data) => debug('@modernpoacher/deps:gitPull')(data.trim()))
    })
  )
}

export function gitPush (p = '.') {
  log('gitPush')

  return (
    new Promise((resolve, reject) => {
      const {
        stdout,
        stderr
      } = exec(`cd "${p}" && git push`, { ...OPTIONS, cwd: p /* , stdio: 'inherit' */ }, (e, v) => (!e) ? resolve(v) : reject(e))

      stdout.on('data', (data) => debug('@modernpoacher/deps:gitPush')(data.trim()))
      stderr.on('data', (data) => debug('@modernpoacher/deps:gitPush')(data.trim()))
    })
  )
}

export function gitAdd (p = '.', a = 'package.json package-lock.json') {
  log('gitAdd')

  return (
    new Promise((resolve, reject) => {
      const {
        stdout,
        stderr
      } = exec(`cd "${p}" && git add ${a}`, { ...OPTIONS, cwd: p /* , stdio: 'inherit' */ }, (e, v) => (!e) ? resolve(v) : reject(e))

      stdout.on('data', (data) => debug('@modernpoacher/deps:gitPush')(data.trim()))
      stderr.on('data', (data) => debug('@modernpoacher/deps:gitPush')(data.trim()))
    })
  )
}

export function gitCommit (p = '.', m = 'Updated `package.json` &/ `package-lock.json`') {
  log('gitCommit')

  return (
    new Promise((resolve, reject) => {
      const {
        stdout,
        stderr
      } = exec(`cd "${p}" && git commit -m '${m}'`, { ...OPTIONS, cwd: p /* , stdio: 'inherit' */ }, (e, v) => (!e) ? resolve(v) : reject(e))

      stdout.on('data', (data) => debug('@modernpoacher/deps:gitPush')(data.trim()))
      stderr.on('data', (data) => debug('@modernpoacher/deps:gitPush')(data.trim()))
    })
  )
}
