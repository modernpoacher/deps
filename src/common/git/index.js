import debug from 'debug'

import {
  exec
} from 'child_process'

const OPTIONS = {
  maxBuffer: 1024 * 2000
}

const log = debug('@modernpoacher/deps')

log('`git` is awake')

function use (key) {
  const log = debug(`@modernpoacher/deps:${key}`)

  return function use (v) {
    log(v.trim()) // .replace(/(\s+)$/g, '')
  }
}

function out (key, directory) {
  const log = debug(`@modernpoacher/deps:${key}`)

  return function out (v) {
    const s = v.trim()

    if (directory === s) return

    return (
      log(s)
    )
  }
}

function err (key, directory) {
  const log = debug(`@modernpoacher/deps:${key}`)

  return function err (v) {
    const s = v.trim()

    if (directory === s || s.toLowerCase().startsWith('fatal: not a git repository')) return

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

export function gitRevParse (directory = '.') {
  log('gitRevParse')

  return (
    new Promise((resolve, reject) => {
      const command = 'git rev-parse --show-toplevel'

      const {
        stdout,
        stderr
      } = exec(command, { ...OPTIONS, cwd: directory }, (e, v = '') => (!e) ? resolve(v.trim()) : reject(e))

      stdout.on('data', out('git-rev-parse', directory))
      stderr.on('data', err('git-rev-parse', directory))
    })
  )
}

export function gitCheckout (directory = '.', branch = 'master') {
  log('gitCheckout')

  return (
    new Promise((resolve, reject) => {
      const command = `cd '${directory}' && git checkout ${branch}`

      const {
        stdout,
        stderr
      } = exec(command, { ...OPTIONS, cwd: directory }, (e, v) => (e) ? isCommandError(e) ? resolve(v) : reject(e) : resolve(v))

      stdout.on('data', use('git-checkout'))
      stderr.on('data', use('git-checkout'))
    })
  )
}

export function gitPull (directory = '.') {
  log('gitPull')

  return (
    new Promise((resolve, reject) => {
      const command = `cd '${directory}' && git pull`

      const {
        stdout,
        stderr
      } = exec(command, { ...OPTIONS, cwd: directory }, (e, v) => (e) ? isCommandError(e) ? resolve(v) : reject(e) : resolve(v))

      stdout.on('data', use('git-pull'))
      stderr.on('data', use('git-pull'))
    })
  )
}

export function gitPush (directory = '.') {
  log('gitPush')

  return (
    new Promise((resolve, reject) => {
      const command = `cd '${directory}' && git push`

      const {
        stdout,
        stderr
      } = exec(command, { ...OPTIONS, cwd: directory }, (e, v) => (e) ? isCommandError(e) ? resolve(v) : reject(e) : resolve(v))

      stdout.on('data', use('git-push'))
      stderr.on('data', use('git-push'))
    })
  )
}

export function gitAdd (directory = '.', add = 'package.json package-lock.json') {
  log('gitAdd')

  return (
    new Promise((resolve, reject) => {
      const command = `cd '${directory}' && git add ${add}`

      const {
        stdout,
        stderr
      } = exec(command, { ...OPTIONS, cwd: directory }, (e, v) => (e) ? isCommandError(e) ? resolve(v) : reject(e) : resolve(v))

      stdout.on('data', use('git-add'))
      stderr.on('data', use('git-add'))
    })
  )
}

export function gitCommit (directory = '.', message = 'Updated `package.json` &/ `package-lock.json`') {
  log('gitCommit')

  return (
    new Promise((resolve, reject) => {
      const command = `cd '${directory}' && git commit -m '${message}'`

      const {
        stdout,
        stderr
      } = exec(command, { ...OPTIONS, cwd: directory }, (e, v) => (e) ? isCommandError(e) ? resolve(v) : reject(e) : resolve(v))

      stdout.on('data', use('git-commit'))
      stderr.on('data', use('git-commit'))
    })
  )
}
