/**
 *  @typedef {DepsTypes.Options} Options
 */

import debug from 'debug'

import {
  VERSION,
  PLATFORM
} from '#deps/src/common/env'

const {
  env: {
    NODE_OPTIONS = '--disable-warning=ExperimentalWarning',
    SSH_AUTH_SOCK,
    HOME,
    PATH
  }
} = process

/**
 *  @type {Options}
 */
export const OPTIONS = {
  maxBuffer: 1024 * 2000,
  stdio: 'inherit',
  env: {
    DEBUG_COLORS: 'yes',
    FORCE_COLOR: PLATFORM === 'win32'
      ? '3'
      : '2',
    NODE_OPTIONS,
    SSH_AUTH_SOCK,
    HOME,
    PATH
  }
}

const log = debug('@modernpoacher/deps')

log(`\`common/options\` (${VERSION} - ${PLATFORM}) is awake`)

/**
 *  @function getOptions
 *  @description
 *  `exec` shell options
 *  @param {string} [cwd] normalized directory
 *  @returns {Options & { cwd?: string }}
 */
export function getOptions (cwd) {
  log('getOptions')

  return {
    ...OPTIONS,
    ...(cwd ? { cwd } : {})
  }
}
