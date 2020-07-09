#!/usr/bin/env node

require('module-alias/register')

const {
  resolve
} = require('path')

const glob = require('glob-all')

const {
  readFile
} = require('sacred-fs')

const commander = require('commander')

const debug = require('debug')

const {
  gitRevParse,
  gitCheckout,
  gitPull,
  gitPush,
  gitAdd,
  gitCommit
} = require('@modernpoacher/deps/common/git')

const {
  rmrf,
  npmi,
  deps
} = require('../common')

const log = debug('@modernpoacher/deps')

const CWD = process.cwd()
const REGISTRY = 'https://registry.npmjs.org'

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
      depsList.reduce((accumulator, v) => (
        accumulator.includes(v)
          ? accumulator
          : accumulator.concat(v)
      ), [])
    )
  } catch (e) {
    log('Whoops', e)
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
      code
    } = e

    if (code !== 128) {
      const {
        message
      } = e

      log({ code, message })
    }
  }
}

async function iterate ([directory, ...depsList] = [], registry = REGISTRY) {
  log('iterate')

  await execute(directory, registry)

  if (depsList.length) {
    return (
      await iterate(depsList, registry)
    )
  }
}

async function execute (directory = CWD, registry = REGISTRY) {
  log('execute')

  try {
    await gitCheckout(directory)
    await gitPull(directory)
    await rmrf(directory)
    await npmi(directory, registry)
    await deps(directory, registry)
    await gitAdd(directory)
    await gitCommit(directory)
    await gitPush(directory)
  } catch ({ code, message }) {
    log(code, message)
  }
}

async function executeFrom (directory = CWD, registry = REGISTRY) {
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
      code
    } = e

    if (code !== 128) {
      const {
        message
      } = e

      log({ code, message })

      return
    }
  }

  log('Done.')
}

async function executeOnly (directory = CWD, registry = REGISTRY) {
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
      code
    } = e

    if (code !== 128) {
      const {
        message
      } = e

      log({ code, message })

      return
    }
  }

  log('Done.')
}

async function executePath (directory = CWD, registry = REGISTRY) {
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
      code
    } = e

    if (code !== 128) {
      const {
        message
      } = e

      log({ code, message })

      return
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

  log('Done.')
}

async function app () {
  const {
    argv,
    env: {
      DEPS_PATH = CWD
    }
  } = process

  let PACKAGE
  try {
    const p = resolve(DEPS_PATH, 'package.json')
    const s = await readFile(p, 'utf8')
    PACKAGE = JSON.parse(s)
  } catch (e) {
    const {
      code
    } = e

    if (code === 'ENOENT') log(`No package at "${DEPS_PATH}"`)
    else {
      const {
        message
      } = e

      log(`Package error: "${message}"`)
    }

    return
  }

  const {
    version
  } = PACKAGE

  commander
    .version(version, '-v, --version', 'Version')
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
    } catch ({ message }) {
      log(message)
    }
  } else {
    if (F) {
      try {
        await executeFrom(P, registry)
      } catch ({ message }) {
        log(message)
      }
    } else {
      if (O) {
        try {
          await executeOnly(P, registry)
        } catch ({ message }) {
          log(message)
        }
      }
    }
  }
}

module.exports = app()
