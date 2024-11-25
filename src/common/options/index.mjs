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

export const OPTIONS = {
  maxBuffer: 1024 * 2000,
  stdio: 'inherit',
  env: {
    DEBUG_COLORS: 'yes',
    FORCE_COLOR: PLATFORM === 'win32'
      ? 3
      : 2,
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
 *
 *  Get the installation `exec` child process options
 *
 *  @param {string} cwd normalized directory
 *
 *  @return {{
*    maxBuffer: number,
*    stdio: string
*    env: {
*      DEBUG_COLORS: string,
*      FORCE_COLOR: number,
*      PROCESS: string
*    }
*    cwd: string
*  }}
*/
export function getOptions (cwd) {
  log('getOptions')

  return {
    ...OPTIONS,
    cwd
  }
}
