#!/usr/bin/env node

import debug from 'debug'

import {
  resolve
} from 'node:path'

import glob from 'glob-all'

import {
  Command
} from 'commander'

import {
  VERSION,
  PLATFORM
} from '#deps/src/common/env'

import {
  MESSAGE,
  AUTHOR,
  catGitRefsRemotesOriginHead,
  awkGitRemoteShowOriginHead,
  gitRevParseShowTopLevel,
  gitRevParseAbbrevRefHead,
  gitPull,
  gitPush,
  gitPushTags,
  gitAdd,
  gitCommit
} from '#deps/src/common/git'

import {
  DIRECTORY,
  REGISTRY,
  getIgnore,
  getAuthor,
  getMessage
} from '#deps/src/common'

import {
  handleError,
  rmrf,
  npmi,
  deps,
  hasConfiguration,
  getConfiguration,
  hasPackage,
  getPackage
} from '#deps/bin/common'

const {
  env: {
    DEBUG = '@modernpoacher/deps*'
  }
} = process

debug.enable(DEBUG)

const log = debug('@modernpoacher/deps')

log(`\`execute\` (${VERSION} - ${PLATFORM}) is awake`)

function handleCommandError (e) {
  const {
    code = 0
  } = e

  if (code !== 128) handleError(e)
}

async function getDefaultBranch (directory) {
  const branch = await catGitRefsRemotesOriginHead(directory)
  if (branch) return branch
  return (
    await awkGitRemoteShowOriginHead(directory)
  )
}

async function getCurrentBranch (directory) {
  return (
    await gitRevParseAbbrevRefHead(directory)
  )
}

async function isHeadDefaultBranch (directory) {
  const defaultBranch = await getDefaultBranch(directory)
  const currentBranch = await getCurrentBranch(directory)
  return (
    defaultBranch === currentBranch
  )
}

/**
 * @function getIgnoreFromConfiguration
 *
 * Interrogates `.depsrc` or `.depsrc.json` for an `ignore` value
 *
 * @param {string} directory
 *
 * @return {Promise<boolean>}
 */
async function getIgnoreFromConfiguration (directory) {
  log('getIgnoreFromConfiguration')

  const CONFIGURATION = (
    await hasConfiguration(directory)
      ? await getConfiguration(directory)
      : {}
  )

  return (
    getIgnore(CONFIGURATION)
  )
}

/**
 * @function getAuthorFromConfiguration
 *
 * Interrogates `.depsrc` or `.depsrc.json` for an `author` value
 *
 * @param {string} directory
 *
 * @return {Promise<string|null>}
 */
async function getAuthorFromConfiguration (directory) {
  log('getAuthorFromConfiguration')

  const CONFIGURATION = (
    await hasConfiguration(directory)
      ? await getConfiguration(directory)
      : {}
  )

  return (
    getAuthor(CONFIGURATION)
  )
}

/**
 * @function getAuthorFromPackage
 *
 * Interrogates `package.json` for an `author` value
 *
 * @param {string} directory
 *
 * @return {Promise<string|null>}
 */
async function getAuthorFromPackage (directory) {
  log('getAuthorFromPackage')

  const PACKAGE = (
    await hasPackage(directory)
      ? await getPackage(directory)
      : {}
  )

  return (
    getAuthor(PACKAGE)
  )
}

/**
 * @function getMessageFromConfiguration
 *
 * Interrogates `.depsrc` or `.depsrc.json` for a `message` value
 *
 * @param {string} directory
 *
 * @return {Promise<string|null>}
 */
async function getMessageFromConfiguration (directory) {
  log('getMessageFromConfiguration')

  const CONFIGURATION = (
    await hasConfiguration(directory)
      ? await getConfiguration(directory)
      : {}
  )

  return (
    getMessage(CONFIGURATION)
  )
}

/**
 * @function toAuthor
 *
 * Ensures that the `author` is set either from the command line,
 * configuration, package, or a default
 *
 * Since it can be null `author` may not default in function arguments
 *
 * @param {string|null} author
 * @param {string} directory
 *
 * @return {Promise<string>}
 */
async function toAuthor (author, directory) {
  return author || await getAuthorFromConfiguration(directory) || await getAuthorFromPackage(directory) || AUTHOR
}

/**
 * @function toMessage
 *
 * Ensures that the `message` is set either from the command line,
 * configuration, or a default
 *
 * Since it can be null `message` may not default in function arguments
 *
 * @param {string|null} message
 * @param {string} directory
 *
 * @return {Promise<string>}
 */
async function toMessage (message, directory) {
  return message || await getMessageFromConfiguration(directory) || MESSAGE
}

const filterDeps = (v) => !!v // de-falsy

const reduceDeps = (a, v) => a.includes(v) ? a : a.concat(v) // de-dupe

function * genDirsList (directories = []) {
  while (directories.length) yield directories.shift()
}

function getPathList (directory) {
  log('getPathList')

  return (
    new Promise((resolve, reject) => {
      glob(`${directory}/*/`, (error, array) => {
        (!error)
          ? resolve(array.sort())
          : reject(error)
      })
    })
  )
}

async function getDepsList (directories = []) {
  log('getDepsList')

  const alpha = (
    directories
      .filter(filterDeps)
      .reduce(reduceDeps, [])
      .sort()
  )

  try {
    const omega = await Promise.all(alpha.map(mapRevParseShowTopLevel))

    return (
      omega
        .filter(filterDeps)
        .reduce(reduceDeps, [])
        .sort()
    )
  } catch (e) {
    handleError(e)
  }
}

async function mapRevParseShowTopLevel (directory) {
  log('mapRevParseShowTopLevel')

  try {
    return (
      await gitRevParseShowTopLevel(directory)
    )
  } catch (e) {
    handleCommandError(e)
  }
}

async function iterate (directory, registry, force, message, author) {
  log('iterate')

  if (directory) {
    const D = resolve(directory)

    try {
      if (D === await gitRevParseShowTopLevel(D)) {
        const B = await isHeadDefaultBranch(D)
        if (B) {
          const ignore = await getIgnoreFromConfiguration(D)
          if (!ignore) {
            await execute(D, registry, force, await toMessage(message, D), await toAuthor(author, D))
          }
        }
      }
    } catch (e) {
      handleCommandError(e)
    }
  }
}

async function iteratePath (directory, registry, force, message, author) {
  log('iteratePath')

  if (directory) {
    const D = resolve(directory)

    const pathList = await getPathList(D)

    if (pathList.length) {
      const depsList = await getDepsList(pathList)

      for (const d of genDirsList(depsList)) await iterate(d, registry, force, message, author)
    }
  }
}

async function execute (directory = DIRECTORY, registry = REGISTRY, force = false, message = MESSAGE, author = AUTHOR) {
  log('execute')

  try {
    log({ directory, registry, force, message, author })

    await gitPull(directory)
    await rmrf(directory)
    await npmi(directory, registry, force)
    await deps(directory, registry, force)
    await gitAdd(directory)
    await gitCommit(directory, message, author)
    await gitPush(directory)
    await gitPushTags(directory)
  } catch (e) {
    handleError(e)
  }
}

async function executeFrom (directory, registry, force, message, author) {
  log('executeFrom')

  if (directory) {
    const D = resolve(directory)

    try {
      if (D === await gitRevParseShowTopLevel(D)) {
        const B = await isHeadDefaultBranch(D)
        if (B) {
          const ignore = await getIgnoreFromConfiguration(D)
          if (!ignore) {
            await execute(D, registry, force, await toMessage(message, D), await toAuthor(author, D))
          }
        }
      }
    } catch (e) {
      handleCommandError(e)
    }
  }
}

async function executeOnly (directory, registry, force, message, author) {
  log('executeOnly')

  if (directory) {
    const D = resolve(directory)

    try {
      if (D === await gitRevParseShowTopLevel(D)) {
        const B = await isHeadDefaultBranch(D)
        if (B) {
          const ignore = await getIgnoreFromConfiguration(D)
          if (!ignore) {
            await execute(D, registry, force, await toMessage(message, D), await toAuthor(author, D))
          }
        }
      }
    } catch (e) {
      handleCommandError(e)
    }
  }
}

async function executePath (directory, registry, force, message, author) {
  log('executePath')

  if (directory) {
    const D = resolve(directory)

    try {
      if (D === await gitRevParseShowTopLevel(D)) {
        const B = await isHeadDefaultBranch(D)
        if (B) {
          const ignore = await getIgnoreFromConfiguration(D)
          if (!ignore) {
            await execute(D, registry, force, await toMessage(message, D), await toAuthor(author, D))
          }
        }
      }
    } catch (e) {
      const {
        code
      } = e

      if (code === 128) {
        return (
          await iteratePath(directory, registry, force, message, author)
        )
      }

      handleCommandError(e)
    }
  }
}

async function app () {
  log('Deps')

  const commander = new Command()

  const {
    argv
  } = process

  /*
   *  `version` is printed into this file at pre-commit
   */
  commander
    .version(VERSION)
    .option('-p, --path [path]', 'Update path', '.')
    .option('-f, --from [from]', 'Update from directory')
    .option('-o, --only [only]', 'Update only directory')
    .option('--registry [registry]', 'Installation registry')
    .option('--force [force]', 'Force installation`', false)
    .option('-m, --message [message]', 'Git commit message')
    .option('-a, --author [author]', 'Git commit author')
    .parse(argv)

  const {
    path: P,
    from: F,
    only: O,
    registry,
    force,
    message,
    author
  } = commander.opts()

  log({
    ...(P ? { path: P } : {}),
    ...(F ? { from: F } : {}),
    ...(O ? { only: O } : {}),
    ...(registry ? { registry } : {}),
    ...(force ? { force } : {}),
    ...(message ? { message } : {}),
    ...(author ? { author } : {})
  })

  if (P || (!F && !O)) {
    log('Path')

    try {
      await executePath(P, registry, force, message, author)
    } catch (e) {
      handleError(e)
    }
  } else {
    if (F) {
      log('From')

      try {
        await executeFrom(P, registry, force, message, author)
      } catch (e) {
        handleError(e)
      }
    } else {
      if (O) {
        log('Only')

        try {
          await executeOnly(P, registry, force, message, author)
        } catch (e) {
          handleError(e)
        }
      }
    }
  }

  log('Done.')
}

export default app()
