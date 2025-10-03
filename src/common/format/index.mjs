import debug from 'debug'

import {
  homedir
} from 'node:os'

import stripAnsi from 'strip-ansi'

import {
  PLATFORM
} from '#deps/src/common/env'

const HOMEDIR = homedir()

/**
 *  @function toHomeDir
 *  @type {(directory: string) => string}
 */
export const toHomeDir = PLATFORM === 'win32'
  ? (directory) => directory
  : (directory) => directory.includes(HOMEDIR) ? directory.replace(HOMEDIR, '~') : directory

const LF = String.fromCodePoint(10)

/**
 *  @param {string} v
 *  @returns {string}
 */
export function trim (v) {
  return v.split(LF).map(trimEnd).join(LF).trim()
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
  return v.replace(/\n{2,}}/gm, LF).trim()
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
    log(v.trimEnd())
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
