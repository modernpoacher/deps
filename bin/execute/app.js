#!/usr/bin/env node

require('module-alias/register')

const debug = require('debug')

const {
  resolve
} = require('path')

const glob = require('glob-all')

const commander = require('commander')

const {
  version: VERSION
} = require('~/package')

const {
  PLATFORM
} = require('@modernpoacher/deps/common/env')

const {
  MESSAGE,
  AUTHOR,
  catGitRefsRemotesOriginHead,
  gitRevParse,
  gitCheckout,
  gitPull,
  gitPush,
  gitPushTags,
  gitAdd,
  gitCommit
} = require('@modernpoacher/deps/common/git')

const {
  REGISTRY,
  getAuthor
} = require('@modernpoacher/deps/common')

const {
  handleError,
  rmrf,
  npmi,
  deps,
  hasConfiguration,
  getConfiguration
} = require('~/bin/common')

const {
  env: {
    DEBUG = '@modernpoacher/deps*'
  }
} = process

debug.enable(DEBUG)

const log = debug('@modernpoacher/deps')

log(`\`execute\` (${VERSION} - ${PLATFORM}) is awake`)

const DIRECTORY = process.cwd()

function handleCommandError (e) {
  const {
    code = 0
  } = e

  if (code !== 128) {
    const {
      message
    } = e

    const log = debug('@modernpoacher/deps:error')
    if (code > 1) log(code)
    log(message)
  }
}

async function getAuthorFromConfiguration (path) {
  log('getAuthorFromConfiguration')

  const CONFIGURATION = await hasConfiguration(path)
    ? await getConfiguration(path)
    : {}

  return (
    getAuthor(CONFIGURATION)
  )
}

const filterDeps = (v) => !!v // de-falsy

const reduceDeps = (a, v) => a.includes(v) ? a : a.concat(v) // de-dupe

function getPathList (directory) {
  log('getPathList')

  return (
    new Promise((resolve, reject) => {
      glob(`${directory}/*/`, (error, array) => (!error) ? resolve(array) : reject(error))
    })
  )
}

async function getDepsList (directories) {
  log('getDepsList')

  try {
    const array = await Promise.all(directories.map(mapRevParse))

    return (
      array
        .filter(filterDeps)
        .reduce(reduceDeps, [])
        .sort()
    )
  } catch (e) {
    handleError(e)
  }
}

async function mapRevParse (directory) {
  log('mapRevParse')

  try {
    return (
      await gitRevParse(directory)
    )
  } catch (e) {
    handleCommandError(e)
  }
}

async function iterate ([directory, ...directories] = [], registry, force, message, author) {
  log('iterate')

  if (directory) {
    const path = resolve(directory)

    try {
      if (path === await gitRevParse(path)) {
        await execute(path, registry, force, message, author || await getAuthorFromConfiguration(path))
      }
    } catch (e) {
      handleCommandError(e)
    }
  }

  if (directories.length) {
    await iterate(directories, registry, force, message, author)
  }
}

async function execute (directory = DIRECTORY, registry = REGISTRY, force = false, message = MESSAGE, author = AUTHOR) {
  log('execute')

  try {
    log({ directory, registry, force, message, author })

    await gitCheckout(directory, await catGitRefsRemotesOriginHead(directory))
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

  const path = resolve(directory)

  try {
    if (path === await gitRevParse(path)) {
      return (
        await execute(path, registry, force, message, author || await getAuthorFromConfiguration(path))
      )
    }
  } catch (e) {
    handleCommandError(e)
  }
}

async function executeOnly (directory, registry, force, message, author) {
  log('executeOnly')

  const path = resolve(directory)

  try {
    if (path === await gitRevParse(path)) {
      return (
        await execute(path, registry, force, message, author || await getAuthorFromConfiguration(path))
      )
    }
  } catch (e) {
    handleCommandError(e)
  }
}

async function executePath (directory, registry, force, message, author) {
  log('executePath')

  const path = resolve(directory)

  try {
    if (path === await gitRevParse(path)) {
      return (
        await execute(path, registry, force, message, author || await getAuthorFromConfiguration(path))
      )
    }
  } catch (e) {
    handleCommandError(e)
  }

  const pathList = await getPathList(path)

  if (pathList.length) {
    const depsList = await getDepsList(pathList)

    if (depsList.length) {
      return (
        await iterate(depsList, registry, force, message, author)
      )
    }
  }
}

async function app () {
  log('Deps')

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
    .option('-m, --message [author]', 'Git commit message')
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
    ...(force ? { force } : {})
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

module.exports = app()
