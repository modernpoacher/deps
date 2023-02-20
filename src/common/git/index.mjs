import debug from 'debug'

import {
  normalize
} from 'path'

import {
  exec
} from 'child_process'

import {
  VERSION,
  PLATFORM
} from '#deps/src/common/env'

export const DIRECTORY = '.'

const BRANCH = 'master'

const ADD = 'package.json package-lock.json'

export const MESSAGE = PLATFORM === 'win32'
  ? 'Updated `package.json` &/ `package-lock.json`'
  : 'Updated \\`package.json\\` &/ \\`package-lock.json\\`' /* eslint-disable-line no-useless-escape */

export const AUTHOR = 'Modern Poacher Limited <modernpoacher@modernpoacher.com>'

const OPTIONS = {
  maxBuffer: 1024 * 2000,
  shell: true,
  stdio: 'inherit',
  env: {
    DEBUG_COLORS: 'yes',
    FORCE_COLOR: PLATFORM === 'win32'
      ? 3
      : 2
  }
}

const log = debug('@modernpoacher/deps')

log(`\`git\` (${VERSION} - ${PLATFORM}) is awake`)

const trim = (v) => v.split('\n').map((v) => v.trimEnd()).join('\n').trim()

function use (key) {
  const log = debug(`@modernpoacher/deps:${key}`)

  return function use (v) {
    if (v.trim() === '') return

    return (
      log(trim(v))
    )
  }
}

function out (key, directory) {
  const log = debug(`@modernpoacher/deps:${key}`)

  return function out (v) {
    const s = v.trim()

    if (s === '' || directory === s) return

    return (
      log(trim(s))
    )
  }
}

function err (key, directory) {
  const log = debug(`@modernpoacher/deps:${key}`)

  return function err (v) {
    const s = v.trim()

    if (s === '' || directory === s || s.toLowerCase().startsWith('fatal: not a git repository')) return

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
 *  @function getCatGitRefsRemotesOriginHeadCommands
 *
 *  Compatible with MacOS and Windows
 *
 *  @return {String}
 */
function getCatGitRefsRemotesOriginHeadCommands () { /* eslint-disable no-useless-escape */
  log('getCatGitRefsRemotesOriginHeadCommands')

  return `
DIR=$(echo "./.git/refs/remotes/origin/HEAD'" | sed -e "s/\\//\\\\\\/g" -e "s/://" | cat 2> /dev/null)
[[ $DIR =~ "[-0-9a-zA-Z]*$" ]]
echo "\${BASH_REMATCH[0]}"
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
      const commands = getCatGitRefsRemotesOriginHeadCommands()

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: normalize(directory) }, (e, v = '') => {
        (!e)
          ? resolve(trim(v))
          : reject(e)
      })

      stdout.on('data', out('cat-git-refs-remotes-origin-head', directory.trim()))
      stderr.on('data', err('cat-git-refs-remotes-origin-head', directory.trim()))
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
      const commands = 'git rev-parse --show-toplevel'

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: normalize(directory) }, (e, v = '') => {
        (!e)
          ? resolve(trim(v))
          : reject(e)
      })

      stdout.on('data', out('git-rev-parse', directory.trim()))
      stderr.on('data', err('git-rev-parse', directory.trim()))
    })
  )
}

/**
 *  @function gitCheckout
 *
 *  Switch to the default value if none is supplied
 *
 *  @param {String} directory - A directory configured for Git
 *  @param {String} branch - The Git branch
 *
 *  @return {Promise}
 */
export function gitCheckout (directory = DIRECTORY, branch = BRANCH) {
  log('gitCheckout')

  return (
    new Promise((resolve, reject) => {
      const commands = `git checkout ${branch}`

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: normalize(directory) }, (e, v) => {
        (!e)
          ? resolve(v)
          : isCommandError(e)
            ? resolve(v)
            : reject(e)
      })

      const log = use('git-checkout')

      stdout.on('data', log)
      stderr.on('data', log)
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
      const commands = `
        eval $(ssh-agent) 1> /dev/null
        git pull
        eval $(ssh-agent -k) 1> /dev/null
      `.trim()

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: normalize(directory) }, (e, v) => {
        (!e)
          ? resolve(v)
          : isCommandError(e)
            ? resolve(v)
            : reject(e)
      })

      const log = use('git-pull')

      stdout.on('data', log)
      stderr.on('data', log)
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
      const commands = `
        eval $(ssh-agent) 1> /dev/null
        git push
        eval $(ssh-agent -k) 1> /dev/null
      `.trim()

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: normalize(directory) }, (e, v) => {
        (!e)
          ? resolve(v)
          : isCommandError(e)
            ? resolve(v)
            : reject(e)
      })

      const log = use('git-push')

      stdout.on('data', log)
      stderr.on('data', log)
    })
  )
}

/**
 *  @function gitPushTags
 *
 *  Push tags changes to the Git remote
 *
 *  @param {String} directory - A directory configured for Git
 *
 *  @return {Promise}
 */
export function gitPushTags (directory = DIRECTORY) {
  log('gitPushTags')

  return (
    new Promise((resolve, reject) => {
      const commands = `
        eval $(ssh-agent) 1> /dev/null
        git push --tags
        eval $(ssh-agent -k) 1> /dev/null
      `.trim()

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: normalize(directory) }, (e, v) => {
        (!e)
          ? resolve(v)
          : isCommandError(e)
            ? resolve(v)
            : reject(e)
      })

      const log = use('git-push-tags')

      stdout.on('data', log)
      stderr.on('data', log)
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
      const commands = `git add ${add}`

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: normalize(directory) }, (e, v) => {
        (!e)
          ? resolve(v)
          : isCommandError(e)
            ? resolve(v)
            : reject(e)
      })

      const log = use('git-add')

      stdout.on('data', log)
      stderr.on('data', log)
    })
  )
}

/**
 *  @function gitCommit
 *
 *  Commit changes to Git with a default value if none is supplied
 *
 *  @param {String} directory - A directory configured for Git
 *  @param {String} message - A commit message
 *
 *  @return {Promise}
 */
export function gitCommit (directory = DIRECTORY, message = MESSAGE, author = AUTHOR) {
  log('gitCommit')

  return (
    new Promise((resolve, reject) => {
      const commands = `git commit -m "${message}" --author "${author}"`

      const {
        stdout,
        stderr
      } = exec(commands, { ...OPTIONS, cwd: normalize(directory) }, (e, v) => {
        (!e)
          ? resolve(v)
          : isCommandError(e)
            ? resolve(v)
            : reject(e)
      })

      const log = use('git-commit')

      stdout.on('data', log)
      stderr.on('data', log)
    })
  )
}
