/**
 *  @typedef {import('node:child_process').ExecException} ExecException
 */

/**
 *  @callback HandleComplete
 *  @param {ExecException | null} e
 *  @param {string} v
 *  @returns {void}
 */

import stripAnsi from 'strip-ansi'

import {
  normalize
} from 'node:path'

import {
  exec
} from 'node:child_process'

import debug from '#deps/src/common/debug'

import {
  use,
} from '#deps/src/common/format'

import {
  BIN,
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
  : 'Updated \\`package.json\\` &/ \\`package-lock.json\\`'

export const AUTHOR = 'Modern Poacher Limited <modernpoacher@modernpoacher.com>'

const CAT_GIT_REFS_REMOTES_ORIGIN_HEAD = `
DIR=$(echo "./.git/refs/remotes/origin/HEAD'" | sed -e "s/\\//\\\\\\/g" -e "s/://" | cat 2> /dev/null)
[[ $DIR =~ "[-0-9a-zA-Z]*$" ]]
echo "\${BASH_REMATCH[0]}"
`

const GIT_PULL = `
source "${BIN}/common.sh"
source_home "${BIN}"
git pull
`

const GIT_PUSH = `
source "${BIN}/common.sh"
source_home "${BIN}"
git push
`

const GIT_PUSH_TAGS = `
source "${BIN}/common.sh"
source_home "${BIN}"
git push --tags
`

const log = debug('@modernpoacher/deps')

log(`\`common/git\` (${VERSION} - ${PLATFORM}) is awake`)

const LF = String.fromCodePoint(10)

export {
  trim
}

/**
 *  @param {string} v
 *  @returns {boolean}
 */
function filter (v) {
  return Boolean(stripAnsi(v).trim())
}

/**
 *  @param {string} directory
 *  @returns {(s: string) => boolean}
 */
function getIsDirectory (directory) {
  return function isDirectory (s) {
    return directory === s
  }
}

/**
 *  @param {string} v
 *  @returns {boolean}
 */
function isFatal (v) {
  return v.toLowerCase().startsWith('fatal: not a git repository')
}

/**
 *  @param {string} key
 *  @returns {(value: string) => void}
 */
export function use (key) {
  const log = debug(`@modernpoacher/deps:${key}`)

  /**
   *  @param {string} v
   *  @returns {void}
   */
  function write (v) {
    log(v.trimEnd())
  }

  /**
   *  @param {string} value
   *  @returns {void}
   */
  return function use (value) {
    value.split(LF)
      .filter(filter)
      .forEach(write)
  }
}

/**
 *  @param {string} key
 *  @param {string} directory
 *  @returns {(value: string) => void}
 */
export function out (key, directory) {
  const log = debug(`@modernpoacher/deps:${key}`)

  const isDirectory = getIsDirectory(directory)

  /**
   *  @param {string} v
   *  @returns {boolean}
   */
  function filterOut (v) {
    const s = v.trim()

    return (
      !isDirectory(s)
    )
  }

  /**
   *  @param {string} v
   *  @returns {void}
   */
  function write (v) {
    if (v.trim()) log(v.trimEnd())
  }

  return function out (value) {
    value.split(LF)
      .filter(filter).filter(filterOut)
      .forEach(write)
  }
}

/**
 *  @param {string} key
 *  @param {string} directory
 *  @returns {(value: string) => void}
 */
export function err (key, directory) {
  const log = debug(`@modernpoacher/deps:${key}`)

  const isDirectory = getIsDirectory(directory)

  /**
   *  @param {string} v
   *  @returns {boolean}
   */
  function filterErr (v) {
    const s = v.trim()

    return (
      !isDirectory(s) && !isFatal(s)
    )
  }

  /**
   *  @param {string} v
   *  @returns {void}
   */
  function write (v) {
    if (v.trim()) log(v.trimEnd())
  }

  return function err (value) {
    value.split(LF)
      .filter(filter).filter(filterErr)
      .forEach(write)
  }
}

/**
 *  @function getErrorCode
 *  @description
 *  Get an error code from an error
 *  @param {{code?: number, message?: string}} e
 *  @returns {number}
 */
const getErrorCode = ({ code = 0 }) => code

/**
 *  @function getErrorMessage
 *  @description
 *  Get an error message from an error
 *  @param {{code?: number, message?: string}} e
 *  @returns {string}
 */
const getErrorMessage = ({ message = '' }) => message

/**
 *  @function isCommandError
 *  @description
 *  Determine whether an error is a safe non-zero exit from a Git command
 *  @param {{code?: number, message?: string}} e
 *  @returns {boolean}
 */
function isCommandError (e) {
  log('isCommandError')

  return (
    getErrorCode(e) === 1 &&
    getErrorMessage(e).toLowerCase().startsWith('command failed:')
  )
}

/**
 *  @function gitConfigUserName
 *  @description
 *  Get the user email from Git config
 *  @param {string} d - A directory configured for Git
 *  @returns {Promise<string>}
 */
export function gitConfigUserName (d = DIRECTORY) {
  const directory = normalize(d.trim())

  return (
    new Promise((resolve, reject) => {
      const commands = 'git config user.name'
      const options = getOptions(directory)
      /**
       *  @type {HandleComplete}
       */
      function handleComplete (e, v) {
        if (!e) {
          resolve(trim(v))
        } else {
          reject(e)
        }
      }

      const {
        stdout,
        stderr
      } = exec(commands, options, handleComplete)

      if (stdout) stdout.on('data', out('git-config-user-name', directory))
      if (stderr) stderr.on('data', err('git-config-user-name', directory))
    })
  )
}

/**
 *  @function gitConfigUserEmail
 *  @description
 *  Get the user email from Git config
 *  @param {string} d - A directory configured for Git
 *  @returns {Promise<string>}
 */
export function gitConfigUserEmail (d = DIRECTORY) {
  const directory = normalize(d.trim())

  return (
    new Promise((resolve, reject) => {
      const commands = 'git config user.email'
      const options = getOptions(directory)
      /**
       *  @type {HandleComplete}
       */
      function handleComplete (e, v) {
        if (!e) {
          resolve(trim(v))
        } else {
          reject(e)
        }
      }

      const {
        stdout,
        stderr
      } = exec(commands, options, handleComplete)

      if (stdout) stdout.on('data', out('git-config-user-email', directory))
      if (stderr) stderr.on('data', err('git-config-user-email', directory))
    })
  )
}

/**
 *  @function catGitRefsRemotesOriginHead
 *  @description
 *  Get the default branch from `.git/refs/remotes/origin/HEAD`
 *  @param {string} d - A directory configured for Git
 *  @returns {Promise<string>}
 */
export function catGitRefsRemotesOriginHead (d = DIRECTORY) {
  log('catGitRefsRemotesOriginHead')

  const directory = normalize(d.trim())

  return (
    new Promise((resolve, reject) => {
      const commands = CAT_GIT_REFS_REMOTES_ORIGIN_HEAD.trim()
      const options = getOptions(directory)
      /**
       *  @type {HandleComplete}
       */
      function handleComplete (e, v) {
        if (!e) {
          resolve(trim(v))
        } else {
          reject(e)
        }
      }

      const {
        stdout,
        stderr
      } = exec(commands, options, handleComplete)

      if (stdout) stdout.on('data', out('cat-git-refs-remotes-origin-head', directory))
      if (stderr) stderr.on('data', err('cat-git-refs-remotes-origin-head', directory))
    })
  )
}

/**
 *  @function awkGitRemoteShowOriginHead
 *  @description
 *  Get the remote default branch
 *  @param {string} d - A directory configured for Git
 *  @returns {Promise<string>}
 */
export function awkGitRemoteShowOriginHead (d = DIRECTORY) {
  log('awkGitRemoteShowOriginHead')

  const directory = normalize(d.trim())

  return (
    new Promise((resolve, reject) => {
      const commands = 'git remote show origin | awk \'/HEAD branch/ {print $NF}\''
      const options = getOptions(directory)
      /**
       *  @type {HandleComplete}
       */
      function handleComplete (e = null, v = '') {
        if (!e) {
          resolve(trim(v))
        } else {
          reject(e)
        }
      }

      const {
        stdout,
        stderr
      } = exec(commands, options, handleComplete)

      if (stdout) stdout.on('data', out('git-remote-show-origin-head', directory))
      if (stderr) stderr.on('data', err('git-remote-show-origin-head', directory))
    })
  )
}

/**
 *  @function gitRevParseShowTopLevel
 *  @description
 *  Determine whether a directory is configured for Git
 *  @param {string} d - A directory
 *  @returns {Promise<string>}
 */
export function gitRevParseShowTopLevel (d = DIRECTORY) {
  log('gitRevParseShowTopLevel')

  const directory = normalize(d.trim())

  return (
    new Promise((resolve, reject) => {
      const commands = 'git rev-parse --show-toplevel'
      const options = getOptions(directory)
      /**
       *  @type {HandleComplete}
       */
      function handleComplete (e, v) {
        if (!e) {
          resolve(trim(v))
        } else {
          reject(e)
        }
      }

      const {
        stdout,
        stderr
      } = exec(commands, options, handleComplete)

      if (stdout) stdout.on('data', out('git-rev-parse-show-toplevel', directory))
      if (stderr) stderr.on('data', err('git-rev-parse-show-toplevel', directory))
    })
  )
}

/**
 *  @function gitRevParseAbbrevRefHead
 *  @description
 *  Determine which branch is HEAD
 *  @param {string} d - A directory
 *  @returns {Promise<string>}
 */
export function gitRevParseAbbrevRefHead (d = DIRECTORY) {
  log('gitRevParseAbbrevRefHead')

  const directory = normalize(d.trim())

  return (
    new Promise((resolve, reject) => {
      const commands = 'git rev-parse --abbrev-ref HEAD'
      const options = getOptions(directory)
      /**
       *  @type {HandleComplete}
       */
      function handleComplete (e, v) {
        if (!e) {
          resolve(trim(v))
        } else {
          reject(e)
        }
      }

      const {
        stdout,
        stderr
      } = exec(commands, options, handleComplete)

      if (stdout) stdout.on('data', out('git-rev-parse-abbrev-ref-head', directory))
      if (stderr) stderr.on('data', err('git-rev-parse-abbrev-ref-head', directory))
    })
  )
}

/**
 *  @function gitCheckout
 *  @description
 *  Switch to the default value if none is supplied
 *  @param {string} d - A directory configured for Git
 *  @param {string} branch - The Git branch
 *  @returns {Promise<string>}
 */
export function gitCheckout (d = DIRECTORY, branch = BRANCH) {
  log('gitCheckout')

  const directory = normalize(d.trim())

  return (
    new Promise((resolve, reject) => {
      const commands = `git checkout ${branch}`
      const options = getOptions(directory)

      /**
       *  @type {HandleComplete}
       */
      function handleComplete (e, v) {
        if (!e || isCommandError(e)) {
          resolve(v)
        } else {
          reject(e)
        }
      }

      const {
        stdout,
        stderr
      } = exec(commands, options, handleComplete)

      const log = use('git-checkout')

      if (stdout) stdout.on('data', log)
      if (stderr) stderr.on('data', log)
    })
  )
}

/**
 *  @function gitPull
 *  @description
 *  Pull changes from the Git remote
 *  @param {string} d - A directory configured for Git
 *  @returns {Promise<string>}
 */
export function gitPull (d = DIRECTORY) {
  log('gitPull')

  const directory = normalize(d.trim())

  return (
    new Promise((resolve, reject) => {
      const commands = GIT_PULL.trim()
      const options = getOptions(directory)
      /**
       *  @type {HandleComplete}
       */
      function handleComplete (e, v) {
        if (!e || isCommandError(e)) {
          resolve(v)
        } else {
          reject(e)
        }
      }

      const {
        stdout,
        stderr
      } = exec(commands, options, handleComplete)

      const log = use('git-pull')

      if (stdout) stdout.on('data', log)
      if (stderr) stderr.on('data', log)
    })
  )
}

/**
 *  @function gitPush
 *  @description
 *  Push changes to the Git remote
 *  @param {string} d - A directory configured for Git
 *  @returns {Promise<string>}
 */
export function gitPush (d = DIRECTORY) {
  log('gitPush')

  const directory = normalize(d.trim())

  return (
    new Promise((resolve, reject) => {
      const commands = GIT_PUSH.trim()
      const options = getOptions(directory)
      /**
       *  @type {HandleComplete}
       */
      function handleComplete (e, v) {
        if (!e || isCommandError(e)) {
          resolve(v)
        } else {
          reject(e)
        }
      }

      const {
        stdout,
        stderr
      } = exec(commands, options, handleComplete)

      const log = use('git-push')

      if (stdout) stdout.on('data', log)
      if (stderr) stderr.on('data', log)
    })
  )
}

/**
 *  @function gitPushTags
 *  @description
 *  Push tags changes to the Git remote
 *  @param {string} d - A directory configured for Git
 *  @returns {Promise<string>}
 */
export function gitPushTags (d = DIRECTORY) {
  log('gitPushTags')

  const directory = normalize(d.trim())

  return (
    new Promise((resolve, reject) => {
      const commands = GIT_PUSH_TAGS.trim()
      const options = getOptions(directory)
      /**
       *  @type {HandleComplete}
       */
      function handleComplete (e, v) {
        if (!e || isCommandError(e)) {
          resolve(v)
        } else {
          reject(e)
        }
      }

      const {
        stdout,
        stderr
      } = exec(commands, options, handleComplete)

      const log = use('git-push-tags')

      if (stdout) stdout.on('data', log)
      if (stderr) stderr.on('data', log)
    })
  )
}

/**
 *  @function gitAdd
 *  @description
 *  Add changes to Git with a default value if none is supplied
 *  @param {string} d - A directory configured for Git
 *  @param {string} add - An add parameter
 *  @returns {Promise<string>}
 */
export function gitAdd (d = DIRECTORY, add = ADD) {
  log('gitAdd')

  const directory = normalize(d.trim())

  return (
    new Promise((resolve, reject) => {
      const commands = `git add ${add}`
      const options = getOptions(directory)
      /**
       *  @type {HandleComplete}
       */
      function handleComplete (e, v) {
        if (!e || isCommandError(e)) {
          resolve(v)
        } else {
          reject(e)
        }
      }

      const {
        stdout,
        stderr
      } = exec(commands, options, handleComplete)

      const log = use('git-add')

      if (stdout) stdout.on('data', log)
      if (stderr) stderr.on('data', log)
    })
  )
}

/**
 *  @function gitCommit
 *  @description
 *  Commit changes to Git with a default value if none is supplied
 *  @param {string} d - A directory configured for Git
 *  @param {string} message - A commit message
 *  @param {string | { name: string; email: string }} author - The commit author
 *  @returns {Promise<string>}
 */
export function gitCommit (d = DIRECTORY, message = MESSAGE, author = AUTHOR) {
  log('gitCommit')

  const directory = normalize(d.trim())

  return (
    new Promise((resolve, reject) => {
      const commands = `git commit -m "${message}" --author "${author}"`
      const options = getOptions(directory)
      /**
       *  @type {HandleComplete}
       */
      function handleComplete (e, v) {
        if (!e || isCommandError(e)) {
          resolve(v)
        } else {
          reject(e)
        }
      }

      const {
        stdout,
        stderr
      } = exec(commands, options, handleComplete)

      const log = use('git-commit')

      if (stdout) stdout.on('data', log)
      if (stderr) stderr.on('data', log)
    })
  )
}
