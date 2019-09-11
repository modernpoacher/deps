import {
  resolve
} from 'path'

import {
  spawn
} from 'child_process'

import {
  readFile
} from 'sacred-fs'

import commander from 'commander'

import debug from 'debug'

const transform = (v) => Array.isArray(v) ? v.map(([module, version]) => `${module}@${version || 'latest'}`).join(String.fromCharCode(32)).trim() : v.trim()

const install = (d, v, s, r) => (
  new Promise((resolve, reject) => {
    const commands = (
      ['install']
        .concat(s ? [] : ['--no-save'])
        .concat(transform(v))
        .concat(r ? ['--registry', r] :[])
    )

    spawn(`cd "${d}" && npm`, commands, { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
      .on('close', resolve)
      .on('error', reject)
  })
)

const execute = async (dir = '.', dependencies = {}, { save, registry }) => install(dir, Object.entries(dependencies), save, registry)

const error = debug('deps:error')
const log = debug('deps:log')

const app = async () => {
  const {
    argv,
    env: {
      DEPS_PATH = process.cwd()
    }
  } = process

  let PACKAGE
  try {
    const p = resolve(DEPS_PATH, 'package.json')
    const s = await readFile(p, 'utf8')
    PACKAGE = JSON.parse(s)
  } catch ({ message }) {
    error(message)
  }

  const {
    name = '@modernpoacher/deps',
    version
  } = PACKAGE

  log(name, version)

  commander
    .version(version)
    .option('-P, --prod [dependencies]', 'Install `dependencies`', false)
    .option('-D, --dev [devDependencies]', 'Install `devDependencies`', false)
    .option('-O, --optional [optionalDependencies]', 'Install `optionalDependencies`', false)
    .option('-B, --bundle [bundleDependencies]', 'Install `bundleDependencies`', false)
    .option('-p, --peer [peerDependencies]', 'Install `peerDependencies`', false)
    .option('-s, --save [save]', 'Install `peerDependencies`', false)
    .option('--registry [registry]', 'Installation registry')
    .parse(argv)

  const {
    prod: P,
    dev: D,
    optional: O,
    bundle: B,
    peer: p,
    save,
    registry
  } = commander

  log({
    prod: P,
    dev: D,
    optional: O,
    bundle: B,
    peer: p,
    save,
    registry
  })

  if (P) {
    const {
      dependencies = {},
    } = PACKAGE

    try {
      await execute(DEPS_PATH, dependencies, { save, registry })
    } catch ({ message }) {
      error(message)
    }
  } else {
    if (D) {
      const {
        devDependencies = {},
      } = PACKAGE

      try {
        await execute(DEPS_PATH, devDependencies, { save, registry })
      } catch ({ message }) {
        error(message)
      }
    } else {
      if (O) {
        const {
          optionalDependencies = {},
        } = PACKAGE

        try {
          await execute(DEPS_PATH, optionalDependencies, { save, registry })
        } catch ({ message }) {
          error(message)
        }
      } else {
        if (B) {
          const {
            bundleDependencies = {},
          } = PACKAGE

          try {
            await execute(DEPS_PATH, bundleDependencies, { save, registry })
          } catch ({ message }) {
            error(message)
          }
        } else {
          if (p) {
            const {
              peerDependencies = {},
            } = PACKAGE

            try {
              await execute(DEPS_PATH, peerDependencies, { save, registry })
            } catch ({ message }) {
              error(message)
            }
          }
        }
      }
    }
  }
}

export default app()
