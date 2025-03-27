#!/usr/bin/env node

import debug from 'debug'

import {
  resolve,
  dirname
} from 'node:path'

import {
  glob
} from 'glob'

import {
  Command
} from 'commander'

import '#deps/src/common/debug'

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

const log = debug('@modernpoacher/deps')
const info = debug('@modernpoacher/deps:info')

log(`\`execute\` (${VERSION} - ${PLATFORM}) is awake`)

/**
 *  @param {{ code?: number, message?: string }} [e]
 */
function handleCommandError (e = {}) {
  const {
    code = 0
  } = e

  if (code !== 128) handleError(e)
}

/**
 *  @param {string} directory
 *  @returns {Promise<string>}
 */
async function getDefaultBranch (directory) {
  const branch = await catGitRefsRemotesOriginHead(directory)
  if (branch) return branch
  return (
    await awkGitRemoteShowOriginHead(directory)
  )
}

/**
 *  @param {string} directory
 *  @returns {Promise<string>}
 */
async function getCurrentBranch (directory) {
  return (
    await gitRevParseAbbrevRefHead(directory)
  )
}

/**
 *  @param {string} directory
 *  @returns {Promise<boolean>}
 */
async function isHeadDefaultBranch (directory) {
  const defaultBranch = await getDefaultBranch(directory)
  const currentBranch = await getCurrentBranch(directory)
  return (
    defaultBranch === currentBranch
  )
}

/**
 *  @function getIgnoreFromConfiguration
 *
 *  Interrogates `.depsrc` or `.depsrc.json` for an `ignore` value
 *
 *  @param {string} directory
 *  @returns {Promise<boolean>}
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
 *  @function getAuthorFromConfiguration
 *
 *  Interrogates `.depsrc` or `.depsrc.json` for an `author` value
 *
 *  @param {string} directory
 *  @returns {Promise<string | null>}
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
 *  @function getAuthorFromPackage
 *
 *  Interrogates `package.json` for an `author` value
 *
 *  @param {string} directory
 *  @returns {Promise<string | null>}
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
 *  @function getMessageFromConfiguration
 *
 *  Interrogates `.depsrc` or `.depsrc.json` for a `message` value
 *
 *  @param {string} directory
 *  @returns {Promise<string | null>}
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
 *  @function toAuthor
 *
 *  Ensures that the `author` is set either from the command line,
 *  configuration, package, or a default
 *
 *  Since it can be null `author` may not default in function arguments
 *
 *  @param {string | { name: string; email: string }} author
 *  @param {string} directory
 *  @returns {Promise<string | { name: string; email: string }>}
 */
async function toAuthor (author, directory) {
  return author || await getAuthorFromConfiguration(directory) || await getAuthorFromPackage(directory) || AUTHOR
}

/**
 *  @function toMessage
 *
 *  Ensures that the `message` is set either from the command line,
 *  configuration, or a default
 *
 *  Since it can be null `message` may not default in function arguments
 *
 *  @param {string | null} message
 *  @param {string} directory
 *  @returns {Promise<string>}
 */
async function toMessage (message, directory) {
  return message || await getMessageFromConfiguration(directory) || MESSAGE
}

/**
 *  @param {string | undefined} v
 *  @returns {boolean}
 */
const filterDeps = (v) => Boolean(v) // de-falsy

/**
 *  @param {string[]} a
 *  @param {string} v
 *  @returns {string[]}
 */
const reduceDeps = (a, v = '') => a.includes(v) ? a : a.concat(v) // de-dupe

/**
 *  @param {string[]} directories
 */
function * genDirsList (directories = []) {
  while (directories.length) yield directories.shift()
}

/**
 *  @param {string} directory
 *  @returns {Promise<string[]>}
 */
async function getPathList (directory) {
  log('getPathList')

  const array = await glob(`${directory}/*/package.json`)

  return (
    array
      .map(dirname)
      .sort()
  )
}

/**
 *  @param {Array<string | undefined>} [directories]
 *  @returns {Promise<string[]>}
 */
async function getDepsList (directories = []) {
  log('getDepsList')

  /**
   *  Transform `directories` to create `alpha`
   */
  const alpha = (
    directories
      .filter(filterDeps)
      .reduce(reduceDeps, [])
      .sort()
  )

  try {
    /**
     *  Recreate `directories` from `alpha`
     *
     *  @type {Array<string | undefined>}
     */
    const directories = (
      await Promise.all(
        alpha
          .map(mapRevParseShowTopLevel)
      )
    )

    /**
     *  Transform `directories` to create `omega`
     */
    const omega = (
      directories
        .filter(filterDeps)
        .reduce(reduceDeps, [])
        .sort()
    )

    return omega
  } catch (e) {
    if (e instanceof Error) handleError(e)
  }

  return []
}

/**
 *  @param {string} directory
 *  @returns {Promise<string | undefined>}
 */
async function mapRevParseShowTopLevel (directory) {
  log('mapRevParseShowTopLevel')

  try {
    return (
      await gitRevParseShowTopLevel(directory)
    )
  } catch (e) {
    if (e instanceof Error) handleCommandError(e)
  }
}

/**
 *  @param {string} directory
 *  @param {string} registry
 *  @param {boolean} force
 *  @param {string} message
 *  @param {string | { name: string; email: string }} author
 */
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
      if (e instanceof Error) handleCommandError(e)
    }
  }
}

/**
 *  @param {string} directory
 *  @param {string} registry
 *  @param {boolean} force
 *  @param {string} message
 *  @param {string | { name: string; email: string }} author
 */
async function iteratePath (directory, registry, force, message, author) {
  log('iteratePath')

  if (directory) {
    const D = resolve(directory)

    const pathList = await getPathList(D)

    if (pathList.length) {
      const depsList = await getDepsList(pathList)

      if (depsList.length) {
        for (const d of genDirsList(depsList)) if (d) await iterate(d, registry, force, message, author)
      }
    }
  }
}

/**
 *  @param {string} directory
 *  @param {string} registry
 *  @param {boolean} force
 *  @param {string} message
 *  @param {string | { name: string; email: string }} author
 */
async function execute (directory = DIRECTORY, registry = REGISTRY, force = false, message = MESSAGE, author = AUTHOR) {
  log('execute')

  try {
    info(`Directory is "${directory}"`)
    info(`Registry is "${registry}"`)
    info(`Force is "${force}"`)
    info(`Message is "${message}"`)
    info(`Author is "${author}"`)

    await gitPull(directory)
    await rmrf(directory)
    await npmi(directory, registry, force)
    await deps(directory, registry, force)
    await gitAdd(directory)
    await gitCommit(directory, message, author)
    await gitPush(directory)
    await gitPushTags(directory)
  } catch (e) {
    if (e instanceof Error) handleError(e)
  }
}

/**
 *  @param {string} directory
 *  @param {string} registry
 *  @param {boolean} force
 *  @param {string} message
 *  @param {string | { name: string; email: string }} author
 */
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
      if (e instanceof Error) handleCommandError(e)
    }
  }
}

/**
 *  @param {string} directory
 *  @param {string} registry
 *  @param {boolean} force
 *  @param {string} message
 *  @param {string | { name: string; email: string }} author
 */
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
      if (e instanceof Error) handleCommandError(e)
    }
  }
}

/**
 *  @param {string} directory
 *  @param {string} registry
 *  @param {boolean} force
 *  @param {string} message
 *  @param {string | { name: string; email: string }} author
 */
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
      const { // @ts-expect-error
        code
      } = e

      if (code === 128) {
        return (
          await iteratePath(directory, registry, force, message, author)
        )
      }

      if (e instanceof Error) handleCommandError(e)
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
      if (e instanceof Error) handleError(e)
    }
  } else {
    if (F) {
      log('From')

      try {
        await executeFrom(P, registry, force, message, author)
      } catch (e) {
        if (e instanceof Error) handleError(e)
      }
    } else {
      if (O) {
        log('Only')

        try {
          await executeOnly(P, registry, force, message, author)
        } catch (e) {
          if (e instanceof Error) handleError(e)
        }
      }
    }
  }

  log('Done.')
}

export default app()
