import debug from 'debug'

import {
  exec
} from 'child_process'

const DIRECTORY = '.'

const BRANCH = 'master'

const ADD = 'package.json package-lock.json'

const COMMIT = 'Updated \\`package.json\\` &/ \\`package-lock.json\\`' /* eslint-disable-line no-useless-escape */

const OPTIONS = {
  maxBuffer: 1024 * 2000
}

const log = debug('@modernpoacher/deps')

log('`git` is awake')

const trim = (v) => v.split('\n').map((v) => v.trimEnd()).join('\n').trim()

function use (key) {
  const log = debug(`@modernpoacher/deps:${key}`)

  return function use (v) {
    log(trim(v)) // log(v.trim()) // .replace(/(\s+)$/g, '')
  }
}

function out (key, directory) {
  const log = debug(`@modernpoacher/deps:${key}`)

  return function out (v) {
    const s = v.trim()

    if (directory === s) return

    return (
      log(trim(s))
    )
  }
}

function err (key, directory) {
  const log = debug(`@modernpoacher/deps:${key}`)

  return function err (v) {
    const s = v.trim()

    if (directory === s || s.toLowerCase().startsWith('fatal: not a git repository')) return

    return (
      log(trim(s))
    )
  }
}

/**
 *  @function getErrorCode
 *
 *  Get an error code from an error
 *
 *  @param {Error}
 *
 *  @return {Number}
 */
const getErrorCode = ({ code = 0 } = {}) => code

/**
 *  @function getErrorMessage
 *
 *  Get an error message from an error
 *
 *  @param {Error}
 *
 *  @return {String}
 */
const getErrorMessage = ({ message = '' } = {}) => message

/**
 *  @function getCatGitRefsRemotesOriginHeadCommand
 *
 *  Compatible with MacOS and Windows
 *
 *  @param {String} directory - A directory configured for Git
 *
 *  @return {String}
 */
function getCatGitRefsRemotesOriginHeadCommand (directory = DIRECTORY) { /* eslint-disable no-useless-escape */
  log('getCatGitRefsRemotesOriginHeadCommand')

  return `
DIR=$(echo "${directory}/.git/refs/remotes/origin/HEAD" | sed -e "s/\\//\\\\\\/g" -e "s/://" | cat 2> /dev/null)
[[ $DIR =~ "[-0-9a-zA-Z]*$" ]]
echo "$\{BASH_REMATCH[0]}"
` /* eslint-enable no-useless-escape */
}

/**
 *  @function isCommandError
 *
 *  Determine whether an error is a safe non-zero exit from a Git command
 *
 *  @param {Error}
 *
 *  @return {Boolean}
 */
function isCommandError (e) {
  log('isCommandError')

  return (
    getErrorCode(e) === 1 &&
    getErrorMessage(e).toLowerCase().startsWith('command failed:')
  )
}

/**
 *  @function catGitRefsRemotesOriginHead
 *
 *  Get the default branch from `.git/refs/remotes/origin/HEAD`
 *
 *  @param {String} directory - A directory configured for Git
 *
 *  @return {Promise}
 */
export function catGitRefsRemotesOriginHead (directory = DIRECTORY) {
  log('catGitRefsRemotesOriginHead')

  return (
    new Promise((resolve, reject) => {
      const command = getCatGitRefsRemotesOriginHeadCommand(directory)

      /**
       *  log(command)
       */

      const {
        stdout,
        stderr
      } = exec(command, { ...OPTIONS, cwd: directory }, (e, v = '') => (!e) ? resolve(trim(v)) : reject(e))

      stdout.on('data', out('cat-git-refs-remotes-origin-head', directory))
      stderr.on('data', err('cat-git-refs-remotes-origin-head', directory))
    })
  )
}

/**
 *  @function gitRevParse
 *
 *  Determine whether a directory is configured for Git
 *
 *  @param {String} directory - A directory
 *
 *  @return {Promise}
 */
export function gitRevParse (directory = DIRECTORY) {
  log('gitRevParse')

  return (
    new Promise((resolve, reject) => {
      const command = 'git rev-parse --show-toplevel'

      /**
       *  log(command)
       */

      const {
        stdout,
        stderr
      } = exec(command, { ...OPTIONS, cwd: directory }, (e, v = '') => (!e) ? resolve(trim(v)) : reject(e))

      stdout.on('data', out('git-rev-parse', directory))
      stderr.on('data', err('git-rev-parse', directory))
    })
  )
}

/**
 *  @function gitCheckout
 *
 *  Switch to the default value if none is supplied
 *
 *  @param {String} directory - A directory configured for Git
 *
 *  @return {Promise}
 */
export function gitCheckout (directory = DIRECTORY, branch = BRANCH) {
  log('gitCheckout')

  return (
    new Promise((resolve, reject) => {
      const command = `cd "${directory}" && git checkout ${branch}`

      /**
       *  log(command)
       */

      const {
        stdout,
        stderr
      } = exec(command, { ...OPTIONS, cwd: directory }, (e, v) => (e) ? isCommandError(e) ? resolve(v) : reject(e) : resolve(v))

      stdout.on('data', use('git-checkout'))
      stderr.on('data', use('git-checkout'))
    })
  )
}

/**
 *  @function gitPull
 *
 *  Pull changes from the Git remote
 *
 *  @param {String} directory - A directory configured for Git
 *
 *  @return {Promise}
 */
export function gitPull (directory = DIRECTORY) {
  log('gitPull')

  return (
    new Promise((resolve, reject) => {
      const command = `cd "${directory}" && git pull`

      /**
       *  log(command)
       */

      const {
        stdout,
        stderr
      } = exec(command, { ...OPTIONS, cwd: directory }, (e, v) => (e) ? isCommandError(e) ? resolve(v) : reject(e) : resolve(v))

      stdout.on('data', use('git-pull'))
      stderr.on('data', use('git-pull'))
    })
  )
}

/**
 *  @function gitPush
 *
 *  Push changes to the Git remote
 *
 *  @param {String} directory - A directory configured for Git
 *
 *  @return {Promise}
 */
export function gitPush (directory = DIRECTORY) {
  log('gitPush')

  return (
    new Promise((resolve, reject) => {
      const command = `cd "${directory}" && git push`

      /**
       *  log(command)
       */

      const {
        stdout,
        stderr
      } = exec(command, { ...OPTIONS, cwd: directory }, (e, v) => (e) ? isCommandError(e) ? resolve(v) : reject(e) : resolve(v))

      stdout.on('data', use('git-push'))
      stderr.on('data', use('git-push'))
    })
  )
}

/**
 *  @function gitAdd
 *
 *  Add changes to Git with a default value if none is supplied
 *
 *  @param {String} directory - A directory configured for Git
 *  @param {String} add - An add parameter
 *
 *  @return {Promise}
 */
export function gitAdd (directory = DIRECTORY, add = ADD) {
  log('gitAdd')

  return (
    new Promise((resolve, reject) => {
      const command = `cd "${directory}" && git add ${add}`

      /**
       *  log(command)
       */

      const {
        stdout,
        stderr
      } = exec(command, { ...OPTIONS, cwd: directory }, (e, v) => (e) ? isCommandError(e) ? resolve(v) : reject(e) : resolve(v))

      stdout.on('data', use('git-add'))
      stderr.on('data', use('git-add'))
    })
  )
}

/**
 *  @function gitCommit
 *
 *  Commit changes to Git with a default value if none is supplied
 *
 *  @param {String} directory - A directory configured for Git
 *  @param {String} commit - A commit message
 *
 *  @return {Promise}
 */
export function gitCommit (directory = DIRECTORY, commit = COMMIT) {
  log('gitCommit')

  return (
    new Promise((resolve, reject) => {
      const command = `cd "${directory}" && git commit -m "${commit}"`

      /**
       *  log(command)
       */

      const {
        stdout,
        stderr
      } = exec(command, { ...OPTIONS, cwd: directory }, (e, v) => (e) ? isCommandError(e) ? resolve(v) : reject(e) : resolve(v))

      stdout.on('data', use('git-commit'))
      stderr.on('data', use('git-commit'))
    })
  )
}
