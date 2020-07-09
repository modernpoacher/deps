import debug from 'debug'

import {
  exec
} from 'child_process'

const OPTIONS = {
  maxBuffer: 1024 * 2000
}

const log = debug('@modernpoacher/deps')
const use = (l) => (d) => l(d.trim())

export function gitRevParse (p) {
  log('gitRevParse')

  return (
    new Promise((resolve, reject) => {
      const {
        stdout,
        stderr
      } = exec('git rev-parse --show-toplevel', { ...OPTIONS, cwd: p }, (e, v = '') => (!e) ? resolve(v.trim()) : reject(e))

      stdout.on('data', ((l) => (d) => {
        const s = d.trim()

        if (s !== p) return

        l(s)
      })(debug('@modernpoacher/deps:git-rev-parse')))
      stderr.on('data', ((l) => (d) => {
        const s = d.trim()

        if (s === p || s.startsWith('fatal: not a git repository')) return

        l(s)
      })(debug('@modernpoacher/deps:git-rev-parse')))
    })
  )
}

export function gitCheckout (p = '.', b = 'master') {
  log('gitCheckout')

  return (
    new Promise((resolve, reject) => {
      const {
        stdout,
        stderr
      } = exec(`cd '${p}' && git checkout ${b}`, { ...OPTIONS, cwd: p }, (e, v) => (!e) ? resolve(v) : reject(e))

      const log = debug('@modernpoacher/deps:git-checkout')

      stdout.on('data', use(log))
      stderr.on('data', use(log))
    })
  )
}

export function gitPull (p = '.') {
  log('gitPull')

  return (
    new Promise((resolve, reject) => {
      const {
        stdout,
        stderr
      } = exec(`cd '${p}' && git pull`, { ...OPTIONS, cwd: p }, (e, v) => (!e) ? resolve(v) : reject(e))

      const log = debug('@modernpoacher/deps:git-pull')

      stdout.on('data', use(log))
      stderr.on('data', use(log))
    })
  )
}

export function gitPush (p = '.') {
  log('gitPush')

  return (
    new Promise((resolve, reject) => {
      const {
        stdout,
        stderr
      } = exec(`cd '${p}' && git push`, { ...OPTIONS, cwd: p }, (e, v) => (!e) ? resolve(v) : reject(e))

      const log = debug('@modernpoacher/deps:git-push')

      stdout.on('data', use(log))
      stderr.on('data', use(log))
    })
  )
}

export function gitAdd (p = '.', a = 'package.json package-lock.json') {
  log('gitAdd')

  return (
    new Promise((resolve, reject) => {
      const {
        stdout,
        stderr
      } = exec(`cd '${p}' && git add ${a}`, { ...OPTIONS, cwd: p }, (e, v) => (!e) ? resolve(v) : reject(e))

      const log = debug('@modernpoacher/deps:git-add')

      stdout.on('data', use(log))
      stderr.on('data', use(log))
    })
  )
}

export function gitCommit (p = '.', m = 'Updated `package.json` &/ `package-lock.json`') {
  log('gitCommit')

  return (
    new Promise((resolve, reject) => {
      const {
        stdout,
        stderr
      } = exec(`cd '${p}' && git commit -m '${m}'`, { ...OPTIONS, cwd: p }, (e, v) => (!e) ? resolve(v) : reject(e))

      const log = debug('@modernpoacher/deps:git-commit')

      stdout.on('data', use(log))
      stderr.on('data', use(log))
    })
  )
}
