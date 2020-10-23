import {
  spawn
} from 'child_process'

import debug from 'debug'

import {
  transform,
  getDepsExact,
  getDeps
} from '@modernpoacher/deps/common'

const log = debug('@modernpoacher/deps:install')

log('`install` is awake')

export const getCommands = (v, c, s, r, e = false) => (
  ['install']
    .concat(transform(v, c)) // string or array
    .concat(s ? [] : '--no-save')
    .concat(r ? ['--registry', r] : [])
    .concat(e ? '--save-exact' : [])
)

export function installExact (d, v, c, s, r) {
  log('installExact')

  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(v, c, s, r, true)

      log(commands.join(String.fromCharCode(32)).trim())

      spawn(`cd '${d}' && npm`, commands, { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
        .on('close', resolve)
        .on('error', reject)
    })
  )
}

export function install (d, v, c, s, r) {
  return (
    new Promise((resolve, reject) => {
      const commands = getCommands(v, c, s, r)

      log(commands.join(String.fromCharCode(32)).trim())

      spawn(`cd '${d}' && npm`, commands, { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
        .on('close', resolve)
        .on('error', reject)
    })
  )
}

export async function execute (dir = '.', packages = {}, configuration = {}, save = false, registry) {
  log('execute')

  const depsExact = getDepsExact(packages, configuration)

  if (depsExact.length) await installExact(dir, depsExact, configuration, save, registry)

  const deps = getDeps(packages)

  if (deps.length) await install(dir, deps, configuration, save, registry)
}
