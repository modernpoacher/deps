import debug from 'debug'

import {
  spawn
} from 'child_process'

import {
  transform,
  getDepsExact,
  getDeps
} from './common'

const log = debug('@modernpoacher/deps')

log('`deps` is awake')

export const getCommands = (v, c, r, e) => (
  ['install']
    .concat(transform(v, c)) // string or array
    .concat(r ? ['--registry', r] : [])
    .concat(e ? '--save-exact' : [])
)

export function getSaveBundleCommands (v, c, r, e = false) {
  log('getSaveBundleCommands')

  return (
    getCommands(v, c, r, e).concat('--save-bundle')
  )
}

export function getSaveOptionalCommands (v, c, r, e = false) {
  log('getSaveOptionalCommands')

  return (
    getCommands(v, c, r, e).concat('--save-optional')
  )
}

export function getSaveDevCommands (v, c, r, e = false) {
  log('getSaveDevCommands')

  return (
    getCommands(v, c, r, e).concat('--save-dev')
  )
}

export function getSaveProdCommands (v, c, r, e = false) {
  log('getSaveProdCommands')

  return (
    getCommands(v, c, r, e).concat('--save-prod')
  )
}

export function installSaveBundleExact (d, v, c, r) {
  log('installSaveBundleExact')

  return (
    new Promise((resolve, reject) => {
      const commands = getSaveBundleCommands(v, c, r, true)

      spawn(`cd '${d}' && npm`, commands, { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
        .on('close', resolve)
        .on('error', reject)
    })
  )
}

export function installSaveBundle (d, v, c, r) {
  log('installSaveBundle')

  return (
    new Promise((resolve, reject) => {
      const commands = getSaveBundleCommands(v, c, r)

      spawn(`cd '${d}' && npm`, commands, { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
        .on('close', resolve)
        .on('error', reject)
    })
  )
}

export function installSaveOptionalExact (d, v, c, r) {
  log('installSaveOptionalExact')

  return (
    new Promise((resolve, reject) => {
      const commands = getSaveOptionalCommands(v, c, r, true)

      spawn(`cd '${d}' && npm`, commands, { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
        .on('close', resolve)
        .on('error', reject)
    })
  )
}

export function installSaveOptional (d, v, c, r) {
  log('installSaveOptional')

  return (
    new Promise((resolve, reject) => {
      const commands = getSaveOptionalCommands(v, c, r)

      spawn(`cd '${d}' && npm`, commands, { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
        .on('close', resolve)
        .on('error', reject)
    })
  )
}

export function installSaveDevExact (d, v, c, r) {
  log('installSaveDevExact')

  return (
    new Promise((resolve, reject) => {
      const commands = getSaveDevCommands(v, c, r, true)

      spawn(`cd '${d}' && npm`, commands, { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
        .on('close', resolve)
        .on('error', reject)
    })
  )
}

export function installSaveDev (d, v, c, r) {
  log('installSaveDev')

  return (
    new Promise((resolve, reject) => {
      const commands = getSaveDevCommands(v, c, r)

      spawn(`cd '${d}' && npm`, commands, { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
        .on('close', resolve)
        .on('error', reject)
    })
  )
}

export function installSaveProdExact (d, v, c, r) {
  log('installSaveProdExact')

  return (
    new Promise((resolve, reject) => {
      const commands = getSaveProdCommands(v, c, r, true)

      spawn(`cd '${d}' && npm`, commands, { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
        .on('close', resolve)
        .on('error', reject)
    })
  )
}

export function installSaveProd (d, v, c, r) {
  log('installSaveProd')

  return (
    new Promise((resolve, reject) => {
      const commands = getSaveProdCommands(v, c, r)

      spawn(`cd '${d}' && npm`, commands, { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
        .on('close', resolve)
        .on('error', reject)
    })
  )
}

export async function executeBundle (dir = '.', packages = {}, configuration = {}, registry) {
  log('executeBundle')

  const depsExact = getDepsExact(packages, configuration)

  if (depsExact.length) await installSaveBundleExact(dir, depsExact, configuration, registry)

  const deps = getDeps(packages)

  if (deps.length) await installSaveBundle(dir, deps, configuration, registry)
}

export async function executeOptional (dir = '.', packages = {}, configuration = {}, registry) {
  log('executeOptional')

  const depsExact = getDepsExact(packages, configuration)

  if (depsExact.length) await installSaveOptionalExact(dir, depsExact, configuration, registry)

  const deps = getDeps(packages)

  if (deps.length) await installSaveOptional(dir, deps, configuration, registry)
}

export async function executeDev (dir = '.', packages = {}, configuration = {}, registry) {
  log('executeDev')

  const depsExact = getDepsExact(packages, configuration)

  if (depsExact.length) await installSaveDevExact(dir, depsExact, configuration, registry)

  const deps = getDeps(packages)

  if (deps.length) await installSaveDev(dir, deps, configuration, registry)
}

export async function executeProd (dir = '.', packages = {}, configuration = {}, registry) {
  log('executeProd')

  const depsExact = getDepsExact(packages, configuration)

  if (depsExact.length) await installSaveProdExact(dir, depsExact, configuration, registry)

  const deps = getDeps(packages)

  if (deps.length) await installSaveProd(dir, deps, configuration, registry)
}
