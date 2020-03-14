import {
  spawn
} from 'child_process'

import debug from 'debug'

const log = debug('deps:install')

const getDepsExact = (v) => Object.entries(v).reduce((accumulator, [module, version]) => /^\d/.test(version) ? accumulator.concat(module) : accumulator, [])
const getDeps = (v) => Object.entries(v).reduce((accumulator, [module, version]) => /^\d/.test(version) ? accumulator : accumulator.concat(module), [])
const transform = (v) => Array.isArray(v) ? v.map((module) => module.trim().concat('@latest')).join(String.fromCharCode(32)).trim() : v.trim()

const getCommmands = (v, s, r, e = false) => (
  ['install']
    .concat(transform(v)) // array  or string
    .concat(s ? [] : '--no-save')
    .concat(r ? ['--registry', r] : [])
    .concat(e ? '--save-exact' : [])
)

const installExact = (d, v, s, r) => (
  new Promise((resolve, reject) => {
    const commands = getCommmands(v, s, r, true)

    log(commands.join(String.fromCharCode(32)).trim())

    spawn(`cd "${d}" && npm`, getCommmands(v, s, r, true), { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
      .on('close', resolve)
      .on('error', reject)
  })
)

const install = (d, v, s, r) => (
  new Promise((resolve, reject) => {
    const commands = getCommmands(v, s, r)

    log(commands.join(String.fromCharCode(32)).trim())

    spawn(`cd "${d}" && npm`, commands, { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
      .on('close', resolve)
      .on('error', reject)
  })
)

export const execute = async (dir = '.', dependencies = {}, { save, registry }) => {
  const depsExact = getDepsExact(dependencies)
  const deps = getDeps(dependencies)

  if (depsExact.length) await installExact(dir, depsExact, save, registry)

  if (deps.length) await install(dir, deps, save, registry)
}
