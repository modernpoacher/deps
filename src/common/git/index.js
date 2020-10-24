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

const getErrorCode = ({ code = 0 }) => code

const getErrorMessage = ({ message = '' }) => message

function isCommandError (e) {
  log('isCommandError')

  return (
    getErrorCode(e) === 1 &&
    getErrorMessage(e).toLowerCase().startsWith('command failed:')
  )
}

export function gitRevParse (d = '.') {
  log('gitRevParse')

  return (
    new Promise((resolve, reject) => {
      const command = 'git rev-parse --show-toplevel'

      const {
        stdout,
        stderr
      } = exec(command, { ...OPTIONS, cwd: d }, (e, v = '') => (!e) ? resolve(v.trim()) : reject(e))

      stdout.on('data', out('git-rev-parse', d))
      stderr.on('data', err('git-rev-parse', d))
    })
  )
}

export function gitCheckout (d = '.', b = 'master') {
  log('gitCheckout')

  return (
    new Promise((resolve, reject) => {
      const command = `cd '${d}' && git checkout ${b}`

      const {
        stdout,
        stderr
      } = exec(command, { ...OPTIONS, cwd: d }, (e, v) => (e) ? isCommandError(e) ? resolve(v) : reject(e) : resolve(v))

      stdout.on('data', use('git-checkout'))
      stderr.on('data', use('git-checkout'))
    })
  )
}

export function gitPull (d = '.') {
  log('gitPull')

  return (
    new Promise((resolve, reject) => {
      const command = `cd '${d}' && git pull`

      const {
        stdout,
        stderr
      } = exec(command, { ...OPTIONS, cwd: d }, (e, v) => (e) ? isCommandError(e) ? resolve(v) : reject(e) : resolve(v))

      stdout.on('data', use('git-pull'))
      stderr.on('data', use('git-pull'))
    })
  )
}

export function gitPush (d = '.') {
  log('gitPush')

  return (
    new Promise((resolve, reject) => {
      const command = `cd '${d}' && git push`

      const {
        stdout,
        stderr
      } = exec(command, { ...OPTIONS, cwd: d }, (e, v) => (e) ? isCommandError(e) ? resolve(v) : reject(e) : resolve(v))

      stdout.on('data', use('git-push'))
      stderr.on('data', use('git-push'))
    })
  )
}

export function gitAdd (d = '.', a = 'package.json package-lock.json') {
  log('gitAdd')

  return (
    new Promise((resolve, reject) => {
      const command = `cd '${d}' && git add ${a}`

      const {
        stdout,
        stderr
      } = exec(command, { ...OPTIONS, cwd: d }, (e, v) => (e) ? isCommandError(e) ? resolve(v) : reject(e) : resolve(v))

      stdout.on('data', use('git-add'))
      stderr.on('data', use('git-add'))
    })
  )
}

export function gitCommit (d = '.', m = 'Updated `package.json` &/ `package-lock.json`') {
  log('gitCommit')

  return (
    new Promise((resolve, reject) => {
      const command = `cd '${d}' && git commit -m '${m}'`

      const {
        stdout,
        stderr
      } = exec(command, { ...OPTIONS, cwd: d }, (e, v) => (e) ? isCommandError(e) ? resolve(v) : reject(e) : resolve(v))

      stdout.on('data', use('git-commit'))
      stderr.on('data', use('git-commit'))
    })
  )
}
