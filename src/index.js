import {
  spawn
} from 'child_process'

const transform = (v) => Array.isArray(v) ? v.map((s) => s.trim().concat('@latest')).join(String.fromCharCode(32)) : v.concat('@latest')

const installSaveBundle = (d, v, r) => (
  new Promise((resolve, reject) => {
    const commands = ['install', '--save-bundle', transform(v)]

    spawn(`cd "${d}" && npm`, (!r) ? commands : commands.concat('--registry', r), { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
      .on('close', resolve)
      .on('error', reject)
  })
)

const installSaveOptional = (d, v, r) => (
  new Promise((resolve, reject) => {
    const commands = ['install', '--save-optional', transform(v)]

    spawn(`cd "${d}" && npm`, (!r) ? commands : commands.concat('--registry', r), { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
      .on('close', resolve)
      .on('error', reject)
  })
)

const installSaveDev = (d, v, r) => (
  new Promise((resolve, reject) => {
    const commands = ['install', '--save-dev', transform(v)]

    spawn(`cd "${d}" && npm`, (!r) ? commands : commands.concat('--registry', r), { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
      .on('close', resolve)
      .on('error', reject)
  })
)

const installSaveProd = (d, v, r) => (
  new Promise((resolve, reject) => {
    const commands = ['install', '--save-prod', transform(v)]

    spawn(`cd "${d}" && npm`, (!r) ? commands : commands.concat('--registry', r), { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
      .on('close', resolve)
      .on('error', reject)
  })
)

export async function executeEachBundle (dir = '.', [key, ...array] = [], registry) {
  if (key) await installSaveBundle(dir, key, registry)

  return (array.length) ? executeEachBundle(dir, array, registry) : array
}

export async function executeEachOptional (dir = '.', [key, ...array] = [], registry) {
  if (key) await installSaveOptional(dir, key, registry)

  return (array.length) ? executeEachOptional(dir, array, registry) : array
}

export async function executeEachDev (dir = '.', [key, ...array] = [], registry) {
  if (key) await installSaveDev(dir, key, registry)

  return (array.length) ? executeEachDev(dir, array, registry) : array
}

export async function executeEach (dir = '.', [key, ...array] = [], registry) {
  if (key) await installSaveProd(dir, key, registry)

  return (array.length) ? executeEach(dir, array, registry) : array
}

export const executeBundle = async (dir = '.', dependencies = {}, registry) => installSaveBundle(dir, Object.keys(dependencies), registry)

export const executeOptional = async (dir = '.', dependencies = {}, registry) => installSaveOptional(dir, Object.keys(dependencies), registry)

export const executeDev = async (dir = '.', dependencies = {}, registry) => installSaveDev(dir, Object.keys(dependencies), registry)

export const executeProd = async (dir = '.', dependencies = {}, registry) => installSaveProd(dir, Object.keys(dependencies), registry)
