#!/usr/bin/env node

require('module-alias/register')

const debug = require('debug')

const {
  resolve
} = require('path')

const glob = require('glob-all')

const commander = require('commander')

const {
  gitRevParse,
  gitCheckout,
  gitPull,
  gitPush,
  gitAdd,
  gitCommit
} = require('@modernpoacher/deps/common/git')

const {
  handleError,
  rmrf,
  npmi,
  deps
} = require('~/bin/common')

const log = debug('@modernpoacher/deps')

log('`execute` is awake')

const DIRECTORY = process.cwd()
const REGISTRY = 'https://registry.npmjs.org'

const filterDeps = (v) => v // de-falsy

const reduceDeps = (accumulator = [], v) => ( // de-dupe
  accumulator.includes(v)
    ? accumulator
    : accumulator.concat(v)
)

function getPathList (directory) {
  log('getPathList')

  return (
    new Promise((resolve, reject) => {
      glob(`${directory}/*/`, (e, a) => (!e) ? resolve(a) : reject(e))
    })
  )
}

async function getDepsList (pathList) {
  log('getDepsList')

  try {
    const depsList = await Promise.all(pathList.map(mapRevParse))

    return (
      depsList
        .filter(filterDeps)
        .reduce(reduceDeps, [])
        .sort()
    )
  } catch (e) {
    handleError(e)
  }
}

async function mapRevParse (p) {
  log('mapRevParse')

  try {
    return (
      await gitRevParse(p)
    )
  } catch (e) {
    const {
      code = 'NONE'
    } = e

    if (code !== 128) {
      const {
        message
      } = e

      log({ code, message })
    }
  }
}

async function iterate ([directory, ...directories] = [], registry = REGISTRY) {
  log('iterate')

  await execute(directory, registry)

  if (directories.length) {
    const log = debug('@modernpoacher/deps:iterate')

    log({ directories, registry })

    return (
      await iterate(directories, registry)
    )
  }
}

async function execute (directory = DIRECTORY, registry = REGISTRY) {
  log('execute')

  try {
    const log = debug('@modernpoacher/deps:execute')

    log({ directory, registry })

    await gitCheckout(directory)
    await gitPull(directory)
    await rmrf(directory)
    await npmi(directory, registry)
    await deps(directory, registry)
    await gitAdd(directory)
    await gitCommit(directory)
    await gitPush(directory)
  } catch (e) {
    handleError(e)
  }
}

async function executeFrom (directory = DIRECTORY, registry = REGISTRY) {
  log('executeFrom')

  const path = resolve(directory)

  try {
    if (path === await gitRevParse(path)) {
      return (
        await execute(path, registry)
      )
    }
  } catch (e) {
    const {
      code = 'NONE'
    } = e

    if (code !== 128) {
      const {
        message
      } = e

      log({ code, message })
    }
  }
}

async function executeOnly (directory = DIRECTORY, registry = REGISTRY) {
  log('executeOnly')

  const path = resolve(directory)

  try {
    if (path === await gitRevParse(path)) {
      return (
        await execute(path, registry)
      )
    }
  } catch (e) {
    const {
      code = 'NONE'
    } = e

    if (code !== 128) {
      const {
        message
      } = e

      log({ code, message })
    }
  }
}

async function executePath (directory = DIRECTORY, registry = REGISTRY) {
  log('executePath')

  const path = resolve(directory)

  try {
    if (path === await gitRevParse(path)) {
      return (
        await execute(path, registry)
      )
    }
  } catch (e) {
    const {
      code = 'NONE'
    } = e

    if (code !== 128) {
      const {
        message
      } = e

      log({ code, message })
    }
  }

  const pathList = await getPathList(path)

  if (pathList.length) {
    const depsList = await getDepsList(pathList)

    if (depsList.length) {
      return (
        await iterate(depsList, registry)
      )
    }
  }
}

async function app () {
  log('Deps')

  const {
    argv,
    env: {
      DEBUG = '@modernpoacher/deps:*'
    }
  } = process

  debug.enable(DEBUG)

  /*
   *  `version` is printed into this file at pre-commit
   */
  commander
    .version('1.0.23')
    .option('-p, --path [path]', 'Update path')
    .option('-f, --from [from]', 'Update from directory')
    .option('-o, --only [only]', 'Update only directory')
    .option('--registry [registry]', 'Installation registry')
    .parse(argv)

  const {
    path: P,
    from: F,
    only: O,
    registry
  } = commander

  log({
    path: P,
    from: F,
    only: O,
    ...(registry ? { registry } : {})
  })

  if (P || (!F && !O)) {
    try {
      await executePath(P, registry)
    } catch (e) {
      handleError(e)
    }
  } else {
    if (F) {
      try {
        await executeFrom(P, registry)
      } catch (e) {
        handleError(e)
      }
    } else {
      if (O) {
        try {
          await executeOnly(P, registry)
        } catch (e) {
          handleError(e)
        }
      }
    }
  }

  log('Done.')
}

module.exports = app()
