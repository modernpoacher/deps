import {
  spawn
} from 'child_process'

import debug from 'debug'

const log = debug('@modernpoacher/deps')

const getDepsExact = (v) => Object.entries(v).reduce((accumulator, [module, version]) => /^\d/.test(version) ? accumulator.concat(module) : accumulator, [])
const getDeps = (v) => Object.entries(v).reduce((accumulator, [module, version]) => /^\d/.test(version) ? accumulator : accumulator.concat(module), [])
const transform = (v) => Array.isArray(v) ? v.map((s) => s.trim().concat('@latest')).join(String.fromCharCode(32)).trim() : v.concat('@latest')

const getCommands = (v, r, e) => (
  ['install']
    .concat(transform(v)) // string or array
    .concat(r ? ['--registry', r] : [])
    .concat(e ? '--save-exact' : [])
)

const getSaveBundleCommands = (v, r, e = false) => (
  getCommands(v, r, e).concat('--save-bundle')
)

const getSaveOptionalCommands = (v, r, e = false) => (
  getCommands(v, r, e).concat('--save-optional')
)

const getSaveDevCommands = (v, r, e = false) => (
  getCommands(v, r, e).concat('--save-dev')
)

const getSavProdCommands = (v, r, e = false) => (
  getCommands(v, r, e).concat('--save-prod')
)

const installSaveBundleExact = (d, v, r) => (
  new Promise((resolve, reject) => {
    const commands = getSaveBundleCommands(v, r, true)

    log(commands.join(String.fromCharCode(32)).trim())

    spawn(`cd "${d}" && npm`, commands, { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
      .on('close', resolve)
      .on('error', reject)
  })
)

const installSaveBundle = (d, v, r) => (
  new Promise((resolve, reject) => {
    const commands = getSaveBundleCommands(v, r)

    log(commands.join(String.fromCharCode(32)).trim())

    spawn(`cd "${d}" && npm`, commands, { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
      .on('close', resolve)
      .on('error', reject)
  })
)

const installSaveOptionalExact = (d, v, r) => (
  new Promise((resolve, reject) => {
    const commands = getSaveOptionalCommands(v, r, true)

    log(commands.join(String.fromCharCode(32)).trim())

    spawn(`cd "${d}" && npm`, commands, { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
      .on('close', resolve)
      .on('error', reject)
  })
)

const installSaveOptional = (d, v, r) => (
  new Promise((resolve, reject) => {
    const commands = getSaveOptionalCommands(v, r)

    log(commands.join(String.fromCharCode(32)).trim())

    spawn(`cd "${d}" && npm`, commands, { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
      .on('close', resolve)
      .on('error', reject)
  })
)

const installSaveDevExact = (d, v, r) => (
  new Promise((resolve, reject) => {
    const commands = getSaveDevCommands(v, r, true)

    log(commands.join(String.fromCharCode(32)).trim())

    spawn(`cd "${d}" && npm`, commands, { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
      .on('close', resolve)
      .on('error', reject)
  })
)

const installSaveDev = (d, v, r) => (
  new Promise((resolve, reject) => {
    const commands = getSaveDevCommands(v, r)

    log(commands.join(String.fromCharCode(32)).trim())

    spawn(`cd "${d}" && npm`, commands, { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
      .on('close', resolve)
      .on('error', reject)
  })
)

const installSaveProdExact = (d, v, r) => (
  new Promise((resolve, reject) => {
    const commands = getSavProdCommands(v, r, true)

    log(commands.join(String.fromCharCode(32)).trim())

    spawn(`cd "${d}" && npm`, commands, { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
      .on('close', resolve)
      .on('error', reject)
  })
)

const installSaveProd = (d, v, r) => (
  new Promise((resolve, reject) => {
    const commands = getSavProdCommands(v, r)

    log(commands.join(String.fromCharCode(32)).trim())

    spawn(`cd "${d}" && npm`, commands, { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
      .on('close', resolve)
      .on('error', reject)
  })
)

export async function executeEachBundle (dir = '.', [entry, ...array] = [], registry) {
  const [
    module,
    version
  ] = entry

  if (module) {
    if (/^\d/.test(version)) {
      await installSaveBundleExact(dir, entry, registry)
    } else {
      await installSaveBundle(dir, entry, registry)
    }
  }

  return (array.length) ? executeEachBundle(dir, array, registry) : array
}

export async function executeEachOptional (dir = '.', [entry, ...array] = [], registry) {
  const [
    module,
    version
  ] = entry

  if (module) {
    if (/^\d/.test(version)) {
      await installSaveOptionalExact(dir, entry, registry)
    } else {
      await installSaveOptional(dir, entry, registry)
    }
  }

  return (array.length) ? executeEachOptional(dir, array, registry) : array
}

export async function executeEachDev (dir = '.', [entry, ...array] = [], registry) {
  const [
    module,
    version
  ] = entry

  if (module) {
    if (/^\d/.test(version)) {
      await installSaveDevExact(dir, entry, registry)
    } else {
      await installSaveDev(dir, entry, registry)
    }
  }

  return (array.length) ? executeEachDev(dir, array, registry) : array
}

export async function executeEach (dir = '.', [entry, ...array] = [], registry) {
  const [
    module,
    version
  ] = entry

  if (module) {
    if (/^\d/.test(version)) {
      await installSaveProdExact(dir, entry, registry)
    } else {
      await installSaveProd(dir, entry, registry)
    }
  }

  return (array.length) ? executeEach(dir, array, registry) : array
}

export const executeBundle = async (dir = '.', dependencies = {}, registry) => {
  const depsExact = getDepsExact(dependencies)
  const deps = getDeps(dependencies)

  if (depsExact.length) await installSaveBundleExact(dir, depsExact, registry)

  if (deps.length) await installSaveBundle(dir, deps, registry)
}

export const executeOptional = async (dir = '.', dependencies = {}, registry) => {
  const depsExact = getDepsExact(dependencies)
  const deps = getDeps(dependencies)

  if (depsExact.length) await installSaveOptionalExact(dir, depsExact, registry)

  if (deps.length) await installSaveOptional(dir, deps, registry)
}

export const executeDev = async (dir = '.', dependencies = {}, registry) => {
  const depsExact = getDepsExact(dependencies)
  const deps = getDeps(dependencies)

  if (depsExact.length) await installSaveDevExact(dir, depsExact, registry)

  if (deps.length) await installSaveDev(dir, deps, registry)
}

export const executeProd = async (dir = '.', dependencies = {}, registry) => {
  const depsExact = getDepsExact(dependencies)
  const deps = getDeps(dependencies)

  if (depsExact.length) await installSaveProdExact(dir, depsExact, registry)

  if (deps.length) await installSaveProd(dir, deps, registry)
}
