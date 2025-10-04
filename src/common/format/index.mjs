import stripAnsi from 'strip-ansi'

import debug from '#deps/src/common/debug'

import {
  PLATFORM,
  HOMEDIR
} from '#deps/src/common/env'

const log = debug('@modernpoacher/deps')

log('`common/format` is awake')

/**
 *  @function formatAuthor
 *  @type {(name: string, email: string) => string | null}
 */
export function formatAuthor (name, email) {
  const n = name.trim()
  const e = email.trim()

  return (
    n && e
      ? `${n} <${e}>`
      : null
  )
}

/**
 *  @function formatDirectory
 *  @type {(directory: string) => string}
 */
export const formatDirectory = PLATFORM === 'win32'
  ? (directory) => directory
  : (directory) => directory.includes(HOMEDIR) ? directory.replace(HOMEDIR, '~') : directory

const LF = String.fromCodePoint(10)

/**
 *  @param {string} v
 *  @returns {string}
 */
export function trim (v) {
  return (
    v
      .split(LF)
      .map(mapTrim)
      .filter(Boolean)
      .join(LF)
      .trim()
  )
}

/**
 *  @param {string} v
 *  @returns {string}
 */
export function mapTrim (v) {
  return v.trim() ? v.trimEnd() : ''
}

/**
 *  @param {string} v
 *  @returns {string}
 */
export function trimEnd (v) {
  return v.trimEnd()
}

/**
 *  @param {string} v
 *  @returns {string}
 */
export function tidy (v) {
  let s = v
  while (/\n{2,}/gm.test(s)) s = s.replace(/\n{2,}/gm, LF)
  return s
}

/**
 *  @param {string} v
 *  @returns {boolean}
 */
function filter (v) {
  return Boolean(stripAnsi(v).trim())
}

/**
 *  @param {string} key
 *  @returns {(value: string) => void}
 */
export function use (key) {
  const log = debug(`@modernpoacher/deps:${key}`)

  /**
   *  @param {string} v
   *  @returns {void}
   */
  function write (v) {
    if (v.trim()) log(v.trimEnd())
  }

  /**
   *  @param {string} value
   *  @returns {void}
   */
  return function use (value) {
    value.split(LF)
      .filter(filter)
      .forEach(write)
  }
}
