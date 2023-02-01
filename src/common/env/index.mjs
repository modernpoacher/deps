import debug from 'debug'

import PATH from '#where-am-i'

import {
  join
} from 'path'

import {
  readFileSync
} from 'fs'

import {
  platform
} from 'os'

const {
  name: NAME,
  version: VERSION
} = JSON.parse(readFileSync(join(PATH, 'package.json')))

const PLATFORM = platform()

const log = debug('@modernpoacher/deps')

log(`\`env\` (${NAME} - ${VERSION} - ${PLATFORM}) is awake`)

export {
  NAME,
  VERSION,
  PLATFORM
}
