import debug from 'debug'

import {
  exec
} from 'child_process'

const OPTIONS = {
  maxBuffer: 1024 * 2000
}

const log = debug('@modernpoacher/deps')

const use = (n) => {
  const log = debug(`@modernpoacher/deps:${n}`)

  return (v) => {
    log(v.trim())
  }
}

function out (n, d) {
  const log = debug(`@modernpoacher/deps:${n}`)

  return function out (v) {
    const s = v.trim()

    if (d === s) return

    return (
      log(s)
    )
  }
}

function err (n, d) {
  const log = debug(`@modernpoacher/deps:${n}`)

  return function err (v) {
    const s = v.trim()

    if (d === s || s.toLowerCase().startsWith('fatal: not a git repository')) return

    return (
      log(s)
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

      stdout.on('data', out('git-rev-parse', d))
      stderr.on('data', err('git-rev-parse', d))
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

      const log = use('git-checkout')

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

      const log = use('git-pull')

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

      const log = use('git-push')

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

      const log = use('git-add')

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

      const log = use('git-commit')

      stdout.on('data', log)
      stderr.on('data', log)
    })
  )
}
