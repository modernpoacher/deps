import debug from 'debug'

import {
  normalize
} from 'node:path'

import {
  exec
} from 'node:child_process'

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

const CAT_GIT_REFS_REMOTES_ORIGIN_HEAD = `
DIR=$(echo "./.git/refs/remotes/origin/HEAD'" | sed -e "s/\\//\\\\\\/g" -e "s/://" | cat 2> /dev/null)
[[ $DIR =~ "[-0-9a-zA-Z]*$" ]]
echo "\${BASH_REMATCH[0]}"
`

const GIT_PULL = `
eval $(ssh-agent) 1> /dev/null
git pull
eval $(ssh-agent -k) 1> /dev/null
`

const GIT_PUSH = `
eval $(ssh-agent) 1> /dev/null
git push
eval $(ssh-agent -k) 1> /dev/null
`

const GIT_PUSH_TAGS = `
eval $(ssh-agent) 1> /dev/null
git push --tags
eval $(ssh-agent -k) 1> /dev/null
`

const OPTIONS = {
  maxBuffer: 1024 * 2000,
  stdio: 'inherit',
  env: {
    DEBUG_COLORS: 'yes',
    FORCE_COLOR: PLATFORM === 'win32'
      ? 3
      : 2,
    PATH: process.env.PATH
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
 *  @return {number}
 */
const getErrorCode = ({ code = 0 } = {}) => code

/**
 *  @function getErrorMessage
 *
 *  Get an error message from an error
 *
 *  @param {Error}
 *
 *  @return {string}
 */
const getErrorMessage = ({ message = '' } = {}) => message

/**
 *  @function isCommandError
 *
 *  Determine whether an error is a safe non-zero exit from a Git command
 *
 *  @param {Error}
 *
 *  @return {boolean}
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
 *  @param {string} directory - A directory configured for Git
 *
 *  @return {Promise<string>}
 */
export function catGitRefsRemotesOriginHead (directory = DIRECTORY) {
  log('catGitRefsRemotesOriginHead')

  return (
    new Promise((resolve, reject) => {
      const commands = CAT_GIT_REFS_REMOTES_ORIGIN_HEAD.trim()

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
 *  @function awkGitRemoteShowOriginHead
 *
 *  Get the remote default branch
 *
 *  @param {string} directory - A directory configured for Git
 *
 *  @return {Promise<string>}
 */
export function awkGitRemoteShowOriginHead (directory = DIRECTORY) {
  log('awkGitRemoteShowOriginHead')

  return (
    new Promise((resolve, reject) => {
      const command = 'git remote show origin | awk \'/HEAD branch/ {print $NF}\''

      const {
        stdout,
        stderr
      } = exec(command, { ...OPTIONS, cwd: normalize(directory) }, (e, v = '') => {
        (!e)
          ? resolve(trim(v))
          : reject(e)
      })

      stdout.on('data', out('git-remote-show-origin-head', directory.trim()))
      stderr.on('data', err('git-remote-show-origin-head', directory.trim()))
    })
  )
}

/**
 *  @function gitRevParseShowTopLevel
 *
 *  Determine whether a directory is configured for Git
 *
 *  @param {string} directory - A directory
 *
 *  @return {Promise<string>}
 */
export function gitRevParseShowTopLevel (directory = DIRECTORY) {
  log('gitRevParseShowTopLevel')

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

      stdout.on('data', out('git-rev-parse-show-toplevel', directory.trim()))
      stderr.on('data', err('git-rev-parse-show-toplevel', directory.trim()))
    })
  )
}

/**
 *  @function gitRevParseAbbrevRefHead
 *
 *  Determine which branch is HEAD
 *
 *  @param {string} directory - A directory
 *
 *  @return {Promise<string>}
 */
export function gitRevParseAbbrevRefHead (directory = DIRECTORY) {
  log('gitRevParseAbbrevRefHead')

  return (
    new Promise((resolve, reject) => {
      const command = 'git rev-parse --abbrev-ref HEAD'

      const {
        stdout,
        stderr
      } = exec(command, { ...OPTIONS, cwd: normalize(directory) }, (e, v = '') => {
        (!e)
          ? resolve(trim(v))
          : reject(e)
      })

      stdout.on('data', out('git-rev-parse-abbrev-ref-head', directory.trim()))
      stderr.on('data', err('git-rev-parse-abbrev-ref-head', directory.trim()))
    })
  )
}

/**
 *  @function gitCheckout
 *
 *  Switch to the default value if none is supplied
 *
 *  @param {string} directory - A directory configured for Git
 *  @param {string} branch - The Git branch
 *
 *  @return {Promise<string>}
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
 *  @param {string} directory - A directory configured for Git
 *
 *  @return {Promise<string>}
 */
export function gitPull (directory = DIRECTORY) {
  log('gitPull')

  return (
    new Promise((resolve, reject) => {
      const commands = GIT_PULL.trim()

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
 *  @param {string} directory - A directory configured for Git
 *
 *  @return {Promise<string>}
 */
export function gitPush (directory = DIRECTORY) {
  log('gitPush')

  return (
    new Promise((resolve, reject) => {
      const commands = GIT_PUSH.trim()

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
 *  @param {string} directory - A directory configured for Git
 *
 *  @return {Promise<string>}
 */
export function gitPushTags (directory = DIRECTORY) {
  log('gitPushTags')

  return (
    new Promise((resolve, reject) => {
      const commands = GIT_PUSH_TAGS.trim()

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
 *  @param {string} directory - A directory configured for Git
 *  @param {string} add - An add parameter
 *
 *  @return {Promise<string>}
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
 *  @param {string} directory - A directory configured for Git
 *  @param {string} message - A commit message
 *
 *  @return {Promise<string>}
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
