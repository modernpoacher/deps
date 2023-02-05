import debug from 'debug'

import {
  dirname
} from 'node:path'

import {
  fileURLToPath
} from 'node:url'

const {
  env: {
    DEBUG // = '@modernpoacher/deps*'
  }
} = process

if (DEBUG) debug.enable(DEBUG)

const log = debug('@modernpoacher/deps:where-am-i')

const PATH = dirname(fileURLToPath(import.meta.url))

log(PATH)

export default PATH
