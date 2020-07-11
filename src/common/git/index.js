import debug from 'debug'

import {
  exec
} from 'child_process'

const OPTIONS = {
  maxBuffer: 1024 * 2000
}

const log = debug('@modernpoacher/deps')

const use = (l) => (v) => l(v.trim())

function out (d, l) {
  return function out (v) {
    const s = v.trim()

    if (d === s) return

    return (
      l(s)
    )
  }
}

function err (d, l) {
  return function err (v) {
    const s = v.trim()

    if (d === s || s.toLowerCase().startsWith('fatal: not a git repository')) return

    return (
      l(s)
    )
  }
}

export function gitRevParse (d = '.') {
  log('gitRevParse')

  return (
    new Promise((resolve, reject) => {
      const {
        stdout,
        stderr
      } = exec('git rev-parse --show-toplevel', { ...OPTIONS, cwd: d }, (e, v = '') => (!e) ? resolve(v.trim()) : reject(e))

      const log = debug('@modernpoacher/deps:git-rev-parse')

      stdout.on('data', out(d, log))
      stderr.on('data', err(d, log))
    })
  )
}

export function gitCheckout (d = '.', b = 'master') {
  log('gitCheckout')

  return (
    new Promise((resolve, reject) => {
      const {
        stdout,
        stderr
      } = exec(`cd '${d}' && git checkout ${b}`, { ...OPTIONS, cwd: d }, (e, v) => (!e) ? resolve(v) : reject(e))

      const log = use(debug('@modernpoacher/deps:git-checkout'))

      stdout.on('data', log)
      stderr.on('data', log)
    })
  )
}

export function gitPull (d = '.') {
  log('gitPull')

  return (
    new Promise((resolve, reject) => {
      const {
        stdout,
        stderr
      } = exec(`cd '${d}' && git pull`, { ...OPTIONS, cwd: d }, (e, v) => (!e) ? resolve(v) : reject(e))

      const log = use(debug('@modernpoacher/deps:git-pull'))

      stdout.on('data', log)
      stderr.on('data', log)
    })
  )
}

export function gitPush (d = '.') {
  log('gitPush')

  return (
    new Promise((resolve, reject) => {
      const {
        stdout,
        stderr
      } = exec(`cd '${d}' && git push`, { ...OPTIONS, cwd: d }, (e, v) => (!e) ? resolve(v) : reject(e))

      const log = use(debug('@modernpoacher/deps:git-push'))

      stdout.on('data', log)
      stderr.on('data', log)
    })
  )
}

export function gitAdd (d = '.', a = 'package.json package-lock.json') {
  log('gitAdd')

  return (
    new Promise((resolve, reject) => {
      const {
        stdout,
        stderr
      } = exec(`cd '${d}' && git add ${a}`, { ...OPTIONS, cwd: d }, (e, v) => (!e) ? resolve(v) : reject(e))

      const log = use(debug('@modernpoacher/deps:git-add'))

      stdout.on('data', log)
      stderr.on('data', log)
    })
  )
}

export function gitCommit (d = '.', m = 'Updated `package.json` &/ `package-lock.json`') {
  log('gitCommit')

  return (
    new Promise((resolve, reject) => {
      const {
        stdout,
        stderr
      } = exec(`cd '${d}' && git commit -m '${m}'`, { ...OPTIONS, cwd: d }, (e, v) => (!e) ? resolve(v) : reject(e))

      const log = use(debug('@modernpoacher/deps:git-commit'))

      stdout.on('data', log)
      stderr.on('data', log)
    })
  )
}
