import {
  spawn
} from 'child_process'

const transform = (v) => Array.isArray(v) ? v.map((s) => s.trim()).join(String.fromCharCode(32)) : v

const installSaveBundle = (v) => (
  new Promise((resolve, reject) => {
    spawn('npm', ['install', '--save-bundle', transform(v)], { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
      .on('close', resolve)
      .on('error', reject)
  })
)

const installSaveOptional = (v) => (
  new Promise((resolve, reject) => {
    spawn('npm', ['install', '--save-optional', transform(v)], { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
      .on('close', resolve)
      .on('error', reject)
  })
)

const installSaveDev = (v) => (
  new Promise((resolve, reject) => {
    spawn('npm', ['install', '--save-dev', transform(v)], { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
      .on('close', resolve)
      .on('error', reject)
  })
)

const installSaveProd = (v) => (
  new Promise((resolve, reject) => {
    spawn('npm', ['install', '--save-prod', transform(v)], { shell: true, stdio: 'inherit' }, (e) => (!e) ? resolve() : reject(e))
      .on('close', resolve)
      .on('error', reject)
  })
)

export async function executeEachBundle ([key, ...array] = []) {
  if (key) await installSaveBundle(key)

  return (array.length) ? executeEachBundle(array) : array
}

export async function executeEachOptional ([key, ...array] = []) {
  if (key) await installSaveOptional(key)

  return (array.length) ? executeEachOptional(array) : array
}

export async function executeEachDev ([key, ...array] = []) {
  if (key) await installSaveDev(key)

  return (array.length) ? executeEachDev(array) : array
}

export async function executeEach ([key, ...array] = []) {
  if (key) await installSaveProd(key)

  return (array.length) ? executeEach(array) : array
}

export const executeBundle = async (dependencies = {}) => installSaveBundle(Object.keys(dependencies))

export const executeOptional = async (dependencies = {}) => installSaveOptional(Object.keys(dependencies))

export const executeDev = async (dependencies = {}) => installSaveDev(Object.keys(dependencies))

export const executeProd = async (dependencies = {}) => installSaveProd(Object.keys(dependencies))
