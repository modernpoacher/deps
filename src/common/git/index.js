import debug from 'debug'

import {
  exec
} from 'child_process'

const log = debug('@modernpoacher/deps')

export function gitRevParse (p) {
  log('gitRevParse')

  return (
    new Promise((resolve, reject) => {
      exec('git rev-parse --show-toplevel', { cwd: p, stdio: 'inherit' }, (e, v = '') => (!e) ? resolve(v.trim()) : reject(e))
    })
  )
}

export function gitCheckout (p = '.', b = 'master') {
  log('gitCheckout')

  return (
    new Promise((resolve, reject) => {
      exec(`cd '${p}' && git checkout ${b}`, { cwd: p, stdio: 'inherit' }, (e, v) => (!e) ? resolve(v) : reject(e))
    })
  )
}

export function gitPull (p = '.') {
  log('gitPull')

  return (
    new Promise((resolve, reject) => {
      exec(`cd '${p}' && git pull`, { cwd: p, stdio: 'inherit' }, (e, v) => (!e) ? resolve(v) : reject(e))
    })
  )
}

export function gitPush (p = '.') {
  log('gitPush')

  return (
    new Promise((resolve, reject) => {
      exec(`cd '${p}' && git push`, { cwd: p, stdio: 'inherit' }, (e, v) => (!e) ? resolve(v) : reject(e))
    })
  )
}

export function gitAdd (p = '.', a = 'package.json package-lock.json') {
  log('gitAdd')

  return (
    new Promise((resolve, reject) => {
      exec(`cd '${p}' && git add ${a}`, { cwd: p, stdio: 'inherit' }, (e, v) => (!e) ? resolve(v) : reject(e))
    })
  )
}

export function gitCommit (p = '.', m = 'Updated `package.json` &/ `package-lock.json`') {
  log('gitCommit')

  return (
    new Promise((resolve, reject) => {
      exec(`cd '${p}' && git commit -m '${m}'`, { cwd: p, stdio: 'inherit' }, (e, v) => (!e) ? resolve(v) : reject(e))
    })
  )
}
