import debug from 'debug'

import {
  platform
} from 'os'

const PLATFORM = platform()

const log = debug('@modernpoacher/deps')

log(`\`env\` (${PLATFORM}) is awake`)

export {
  PLATFORM
}
