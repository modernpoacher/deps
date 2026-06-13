#!/usr/bin/env node

import {
  resolve,
  dirname
} from 'node:path'

import {
  glob
} from 'node:fs/promises'

import {
  Command
} from 'commander'

import '#deps/src/common/write'

import debug from '#deps/src/common/debug'

import {
  NAME,
  VERSION,
  PLATFORM
} from '#deps/src/common/env'

import {
  formatDirectory,
  formatAuthor
} from '#deps/src/common/format'

import {
  MESSAGE,
  AUTHOR,
  gitConfigUserName,
  gitConfigUserEmail,
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

log(`\`execute\` (${NAME} - ${VERSION} - ${PLATFORM}) is awake`)

const {
  table
} = console

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
 *  @description
 *  Interrogates `.depsrc` or `.depsrc.json` for an `ignore` value
 *  @param {string} directory
 *  @returns {Promise<boolean>}
 */
async function getIgnoreFromConfiguration (directory) {
  log('getIgnoreFromConfiguration')

  if (await hasConfiguration(directory)) {
    return (
      getIgnore(
        await getConfiguration(directory)
      )
    )
  }

  return false
}

/**
 *  @function getAuthorFromConfiguration
 *  @description
 *  Interrogates `.depsrc` or `.depsrc.json` for an `author` value
 *  @param {string} directory
 *  @returns {Promise<string | null>}
 */
async function getAuthorFromConfiguration (directory) {
  log('getAuthorFromConfiguration')

  if (await hasConfiguration(directory)) {
    return (
      getAuthor(
        await getConfiguration(directory)
      )
    )
  }

  return null
}

/**
 *  @function getAuthorFromGit
 *  @description
 *  Interrogates Git config for the user name and email
 *  @param {string} directory
 *  @returns {Promise<string | null>}
 */
async function getAuthorFromGit (directory) {
  log('getAuthorFromGitConfig')

  return (
    formatAuthor(
      await gitConfigUserName(directory) ?? '',
      await gitConfigUserEmail(directory) ?? ''
    )
  )
}

/**
 *  @function getAuthorFromPackage
 *  @description
 *  Interrogates `package.json` for an `author` value
 *  @param {string} directory
 *  @returns {Promise<string | null>}
 */
async function getAuthorFromPackage (directory) {
  log('getAuthorFromPackage')

  if (await hasPackage(directory)) {
    return (
      getAuthor(
        await getPackage(directory)
      )
    )
  }

  return null
}

/**
 *  @function getMessageFromConfiguration
 *  @description
 *  Interrogates `.depsrc` or `.depsrc.json` for a `message` value
 *  @param {string} directory
 *  @returns {Promise<string | null>}
 */
async function getMessageFromConfiguration (directory) {
  log('getMessageFromConfiguration')

  if (await hasConfiguration(directory)) {
    return (
      getMessage(
        await getConfiguration(directory)
      )
    )
  }

  return null
}

/**
 *  @function toAuthor
 *  @description
 *  Ensures that the `author` is set either from the command line,
 *  configuration, package, or a default
 *
 *  Since it can be null `author` will not default in function arguments
 *  @param {string | { name: string; email: string }} author
 *  @param {string} directory
 *  @returns {Promise<string | { name: string; email: string }>}
 */
async function toAuthor (author, directory) {
  return author || await getAuthorFromConfiguration(directory) || await getAuthorFromGit(directory) || await getAuthorFromPackage(directory) || AUTHOR
}

/**
 *  @function toMessage
 *  @description
 *  Ensures that the `message` is set either from the command line,
 *  configuration, or a default
 *
 *  Since it can be null `message` will not default in function arguments
 *  @param {string | null} message
 *  @param {string} directory
 *  @returns {Promise<string>}
 */
async function toMessage (message, directory) {
  return message || await getMessageFromConfiguration(directory) || MESSAGE
}

/**
 *  @param {string} directory
 *  @yields {string}
 */
async function * genDirectory (directory) {
  log('genDirectory')

  const p = [
    `${directory}/package.json`,
    `${directory}/**/package.json`
  ]

  const e = [
    `${directory}/node_modules`,
    `${directory}/**/node_modules`
  ]

  for await (const packageJson of await glob(p, { exclude: e })) yield dirname(packageJson)
}

/**
 *  @param {string} directory
 *  @param {string} registry
 *  @param {boolean} force
 *  @param {string} message
 *  @param {string | { name: string; email: string }} author
 *  @returns {Promise<void>}
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
 *  @returns {Promise<void>}
 */
async function iteratePath (directory, registry, force, message, author) {
  log('iteratePath')

  if (directory) {
    const D = resolve(directory)

    for await (const d of genDirectory(D)) await iterate(d, registry, force, message, author)
  }
}

/**
 *  @param {string} directory
 *  @param {string} registry
 *  @param {boolean} force
 *  @param {string} message
 *  @param {string | { name: string; email: string }} author
 *  @returns {Promise<void>}
 */
async function execute (directory = DIRECTORY, registry = REGISTRY, force = false, message = MESSAGE, author = AUTHOR) {
  log('execute')

  try {
    table({
      directory: formatDirectory(directory),
      registry,
      force,
      message
    })

    table(typeof author === 'string' ? { author } : author)

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
 *  @returns {Promise<void>}
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
 *  @returns {Promise<void>}
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
 *  @returns {Promise<void>}
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

/**
 *  @function app
 */
async function app () {
  log('Deps')

  const commander = new Command(NAME)

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

  table({
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
