import debug from 'debug'

import {
  dirname
} from 'node:path'

import {
  fileURLToPath
} from 'node:url'

const log = debug('@modernpoacher/deps')

const PATH = dirname(fileURLToPath(import.meta.url))

log(PATH)

export default PATH
