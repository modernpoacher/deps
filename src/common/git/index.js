import debug from 'debug'

import {
  exec
} from 'child_process'

const OPTIONS = {
  maxBuffer: 1024 * 2000
}

const log = debug('@modernpoacher/deps')

log('`git` is awake')

const use = (n) => {
  const log = debug(`@modernpoacher/deps:${n}`)

  return (v) => {
    log(v.trim()) // .replace(/(\s+)$/g, '')
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
      const log = debug('@modernpoacher/deps:git-rev-parse')

      log({ d })

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
      const log = debug('@modernpoacher/deps:git-checkout')

      log({ d, b })

      const {
        stdout,
        stderr
      } = exec(`cd '${d}' && git checkout ${b}`, { ...OPTIONS, cwd: d }, (e, v) => (!e) ? resolve(v) : reject(e))

      stdout.on('data', use('git-checkout'))
      stderr.on('data', use('git-checkout'))
    })
  )
}

export function gitPull (d = '.') {
  log('gitPull')

  return (
    new Promise((resolve, reject) => {
      const log = debug('@modernpoacher/deps:git-pull')

      log({ d })

      const {
        stdout,
        stderr
      } = exec(`cd '${d}' && git pull`, { ...OPTIONS, cwd: d }, (e, v) => (!e) ? resolve(v) : reject(e))

      stdout.on('data', use('git-pull'))
      stderr.on('data', use('git-pull'))
    })
  )
}

export function gitPush (d = '.') {
  log('gitPush')

  return (
    new Promise((resolve, reject) => {
      const log = debug('@modernpoacher/deps:git-push')

      log({ d })

      const {
        stdout,
        stderr
      } = exec(`cd '${d}' && git push`, { ...OPTIONS, cwd: d }, (e, v) => (!e) ? resolve(v) : reject(e))

      stdout.on('data', use('git-push'))
      stderr.on('data', use('git-push'))
    })
  )
}

export function gitAdd (d = '.', a = 'package.json package-lock.json') {
  log('gitAdd')

  return (
    new Promise((resolve, reject) => {
      const log = debug('@modernpoacher/deps:git-add')

      log({ d, a })

      const {
        stdout,
        stderr
      } = exec(`cd '${d}' && git add ${a}`, { ...OPTIONS, cwd: d }, (e, v) => (!e) ? resolve(v) : reject(e))

      stdout.on('data', use('git-add'))
      stderr.on('data', use('git-add'))
    })
  )
}

export function gitCommit (d = '.', m = 'Updated `package.json` &/ `package-lock.json`') {
  log('gitCommit')

  return (
    new Promise((resolve, reject) => {
      const log = debug('@modernpoacher/deps:git-commit')

      log({ d, m })

      const {
        stdout,
        stderr
      } = exec(`cd '${d}' && git commit -m '${m}'`, { ...OPTIONS, cwd: d }, (e, v) => (!e) ? resolve(v) : reject(e))

      stdout.on('data', use('git-commit'))
      stderr.on('data', use('git-commit'))
    })
  )
}
