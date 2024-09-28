import debug from 'debug'

import stripAnsi from 'strip-ansi'

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

import {
  getOptions
} from '#deps/src/common/options'

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

const log = debug('@modernpoacher/deps')

log(`\`common/git\` (${VERSION} - ${PLATFORM}) is awake`)

const trim = (v) => v.split(String.fromCharCode(10)).map((v) => v.trimEnd()).join(String.fromCharCode(10)).trim()

function filter (v) {
  return Boolean(stripAnsi(v).trim())
}

function getIsDirectory (directory) {
  return function isDirectory (s) {
    return directory === s
  }
}

function isFatal (s) {
  return s.toLowerCase().startsWith('fatal: not a git repository')
}

export function use (key) {
  const log = debug(`@modernpoacher/deps:${key}`)

  function write (v) {
    log(v.trimEnd())
  }

  return function use (value) {
    value.split(String.fromCharCode(10))
      .filter(filter)
      .forEach(write)
  }
}

export function out (key, directory) {
  const log = debug(`@modernpoacher/deps:${key}`)

  const isDirectory = getIsDirectory(directory)

  function filterOut (v) {
    const s = v.trim()

    return (
      !isDirectory(s)
    )
  }

  function write (v) {
    if (v.trim()) log(v.trimEnd())
  }

  return function out (value) {
    value.split(String.fromCharCode(10))
      .filter(filter).filter(filterOut)
      .forEach(write)
  }
}

export function err (key, directory) {
  const log = debug(`@modernpoacher/deps:${key}`)

  const isDirectory = getIsDirectory(directory)

  function filterErr (v) {
    const s = v.trim()

    return (
      !isDirectory(s) && !isFatal(s)
    )
  }

  function write (v) {
    if (v.trim()) log(v.trimEnd())
  }

  return function err (value) {
    value.split(String.fromCharCode(10))
      .filter(filter).filter(filterErr)
      .forEach(write)
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
 *  @param {string} d - A directory configured for Git
 *
 *  @return {Promise<string>}
 */
export function catGitRefsRemotesOriginHead (d = DIRECTORY) {
  log('catGitRefsRemotesOriginHead')

  const directory = normalize(d.trim())

  return (
    new Promise((resolve, reject) => {
      const commands = CAT_GIT_REFS_REMOTES_ORIGIN_HEAD.trim()
      const options = getOptions(directory)

      const {
        stdout,
        stderr
      } = exec(commands, options, (e, v = '') => {
        (!e)
          ? resolve(trim(v))
          : reject(e)
      })

      stdout.on('data', out('cat-git-refs-remotes-origin-head', directory))
      stderr.on('data', err('cat-git-refs-remotes-origin-head', directory))
    })
  )
}

/**
 *  @function awkGitRemoteShowOriginHead
 *
 *  Get the remote default branch
 *
 *  @param {string} d - A directory configured for Git
 *
 *  @return {Promise<string>}
 */
export function awkGitRemoteShowOriginHead (d = DIRECTORY) {
  log('awkGitRemoteShowOriginHead')

  const directory = normalize(d.trim())

  return (
    new Promise((resolve, reject) => {
      const command = 'git remote show origin | awk \'/HEAD branch/ {print $NF}\''
      const options = getOptions(directory)

      const {
        stdout,
        stderr
      } = exec(command, options, (e, v = '') => {
        (!e)
          ? resolve(trim(v))
          : reject(e)
      })

      stdout.on('data', out('git-remote-show-origin-head', directory))
      stderr.on('data', err('git-remote-show-origin-head', directory))
    })
  )
}

/**
 *  @function gitRevParseShowTopLevel
 *
 *  Determine whether a directory is configured for Git
 *
 *  @param {string} d - A directory
 *
 *  @return {Promise<string>}
 */
export function gitRevParseShowTopLevel (d = DIRECTORY) {
  log('gitRevParseShowTopLevel')

  const directory = normalize(d.trim())

  return (
    new Promise((resolve, reject) => {
      const commands = 'git rev-parse --show-toplevel'
      const options = getOptions(directory)

      const {
        stdout,
        stderr
      } = exec(commands, options, (e, v = '') => {
        (!e)
          ? resolve(trim(v))
          : reject(e)
      })

      stdout.on('data', out('git-rev-parse-show-toplevel', directory))
      stderr.on('data', err('git-rev-parse-show-toplevel', directory))
    })
  )
}

/**
 *  @function gitRevParseAbbrevRefHead
 *
 *  Determine which branch is HEAD
 *
 *  @param {string} d - A directory
 *
 *  @return {Promise<string>}
 */
export function gitRevParseAbbrevRefHead (d = DIRECTORY) {
  log('gitRevParseAbbrevRefHead')

  const directory = normalize(d.trim())

  return (
    new Promise((resolve, reject) => {
      const command = 'git rev-parse --abbrev-ref HEAD'
      const options = getOptions(directory)

      const {
        stdout,
        stderr
      } = exec(command, options, (e, v = '') => {
        (!e)
          ? resolve(trim(v))
          : reject(e)
      })

      stdout.on('data', out('git-rev-parse-abbrev-ref-head', directory))
      stderr.on('data', err('git-rev-parse-abbrev-ref-head', directory))
    })
  )
}

/**
 *  @function gitCheckout
 *
 *  Switch to the default value if none is supplied
 *
 *  @param {string} d - A directory configured for Git
 *  @param {string} branch - The Git branch
 *
 *  @return {Promise<string>}
 */
export function gitCheckout (d = DIRECTORY, branch = BRANCH) {
  log('gitCheckout')

  const directory = normalize(d.trim())

  return (
    new Promise((resolve, reject) => {
      const commands = `git checkout ${branch}`
      const options = getOptions(directory)

      const {
        stdout,
        stderr
      } = exec(commands, options, (e, v) => {
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
 *  @param {string} d - A directory configured for Git
 *
 *  @return {Promise<string>}
 */
export function gitPull (d = DIRECTORY) {
  log('gitPull')

  const directory = normalize(d.trim())

  return (
    new Promise((resolve, reject) => {
      const commands = GIT_PULL.trim()
      const options = getOptions(directory)

      const {
        stdout,
        stderr
      } = exec(commands, options, (e, v) => {
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
 *  @param {string} d - A directory configured for Git
 *
 *  @return {Promise<string>}
 */
export function gitPush (d = DIRECTORY) {
  log('gitPush')

  const directory = normalize(d.trim())

  return (
    new Promise((resolve, reject) => {
      const commands = GIT_PUSH.trim()
      const options = getOptions(directory)

      const {
        stdout,
        stderr
      } = exec(commands, options, (e, v) => {
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
 *  @param {string} d - A directory configured for Git
 *
 *  @return {Promise<string>}
 */
export function gitPushTags (d = DIRECTORY) {
  log('gitPushTags')

  const directory = normalize(d.trim())

  return (
    new Promise((resolve, reject) => {
      const commands = GIT_PUSH_TAGS.trim()
      const options = getOptions(directory)

      const {
        stdout,
        stderr
      } = exec(commands, options, (e, v) => {
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
 *  @param {string} d - A directory configured for Git
 *  @param {string} add - An add parameter
 *
 *  @return {Promise<string>}
 */
export function gitAdd (d = DIRECTORY, add = ADD) {
  log('gitAdd')

  const directory = normalize(d.trim())

  return (
    new Promise((resolve, reject) => {
      const commands = `git add ${add}`
      const options = getOptions(directory)

      const {
        stdout,
        stderr
      } = exec(commands, options, (e, v) => {
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
 *  @param {string} c - A directory configured for Git
 *  @param {string} message - A commit message
 *  @param {string} author - The commit author
 *
 *  @return {Promise<string>}
 */
export function gitCommit (d = DIRECTORY, message = MESSAGE, author = AUTHOR) {
  log('gitCommit')

  const directory = normalize(d.trim())

  return (
    new Promise((resolve, reject) => {
      const commands = `git commit -m "${message}" --author "${author}"`
      const options = getOptions(directory)

      const {
        stdout,
        stderr
      } = exec(commands, options, (e, v) => {
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
