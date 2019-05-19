import {
  spawn
} from 'child_process'

const transform = (v) => Array.isArray(v) ? v.map((s) => s.trim().concat('@latest')).join(String.fromCharCode(32)) : v.concat('@latest')

const installSaveBundle = (d, v) => (
  new Promise((resolve, reject) => {
    spawn(`cd "${d}" && npm`, ['install', '--save-bundle', transform(v)], { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
      .on('close', resolve)
      .on('error', reject)
  })
)

const installSaveOptional = (d, v) => (
  new Promise((resolve, reject) => {
    spawn(`cd "${d}" && npm`, ['install', '--save-optional', transform(v)], { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
      .on('close', resolve)
      .on('error', reject)
  })
)

const installSaveDev = (d, v) => (
  new Promise((resolve, reject) => {
    spawn(`cd "${d}" && npm`, ['install', '--save-dev', transform(v)], { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
      .on('close', resolve)
      .on('error', reject)
  })
)

const installSaveProd = (d, v) => (
  new Promise((resolve, reject) => {
    spawn(`cd "${d}" && npm`, ['install', '--save-prod', transform(v)], { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
      .on('close', resolve)
      .on('error', reject)
  })
)

export async function executeEachBundle (dir = '.', [key, ...array] = []) {
  if (key) await installSaveBundle(dir, key)

  return (array.length) ? executeEachBundle(dir, array) : array
}

export async function executeEachOptional (dir = '.', [key, ...array] = []) {
  if (key) await installSaveOptional(dir, key)

  return (array.length) ? executeEachOptional(dir, array) : array
}

export async function executeEachDev (dir = '.', [key, ...array] = []) {
  if (key) await installSaveDev(dir, key)

  return (array.length) ? executeEachDev(dir, array) : array
}

export async function executeEach (dir = '.', [key, ...array] = []) {
  if (key) await installSaveProd(dir, key)

  return (array.length) ? executeEach(dir, array) : array
}

export const executeBundle = async (dir = '.', dependencies = {}) => installSaveBundle(dir, Object.keys(dependencies))

export const executeOptional = async (dir = '.', dependencies = {}) => installSaveOptional(dir, Object.keys(dependencies))

export const executeDev = async (dir = '.', dependencies = {}) => installSaveDev(dir, Object.keys(dependencies))

export const executeProd = async (dir = '.', dependencies = {}) => installSaveProd(dir, Object.keys(dependencies))
