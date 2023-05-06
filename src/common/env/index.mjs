import debug from 'debug'

import PATH from '#where-am-i'

import {
  join
} from 'node:path'

import {
  readFileSync
} from 'node:fs'

import {
  platform
} from 'node:os'

const {
  name: NAME,
  version: VERSION
} = JSON.parse(readFileSync(join(PATH, 'package.json')))

const PLATFORM = platform()

const log = debug('@modernpoacher/deps')

log(`\`env\` (${NAME} - ${VERSION} - ${PLATFORM}) is awake at "${PATH}"`)

export {
  NAME,
  VERSION,
  PLATFORM
}
