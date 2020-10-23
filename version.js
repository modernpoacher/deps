const debug = require('debug')

const {
  readFile,
  writeFile
} = require('fs/promises')

const glob = require('glob-all')

const log = debug('@modernpoacher/deps')

log('`deps` is awake')

const {
  version: VERSION
} = require('./package')

function getJs () {
  log('getJs')

  return (
    new Promise((resolve, reject) => {
      glob(['./src/**/*.js', './bin/**/*.js'], (e, a) => (!e) ? resolve(a) : reject(e))
    })
  )
}

async function execute (p) {
  log('execute', p)

  const r = await readFile(p, 'utf8')

  if (/version\('.*'\)/.test(r)) {
    const w = r.replace(/version\('.*'\)/g, `version('${VERSION}')`)

    await writeFile(p, w, 'utf8')
  }
}

async function recurse ([p, ...a]) {
  log('recurse', p)

  await execute(p)

  if (a.length) await recurse(a)
}

async function app () {
  const a = await getJs()

  await recurse(a)
}

module.exports = app()
