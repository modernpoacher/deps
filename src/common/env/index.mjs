import {
  join
} from 'node:path'

import {
  readFileSync
} from 'node:fs'

import {
  platform,
  homedir
} from 'node:os'

import PATH from '#where-am-i'

import debug from '#deps/src/common/debug'

const {
  name: NAME,
  version: VERSION
} = JSON.parse(readFileSync(join(PATH, 'package.json')).toString('utf8'))

const PLATFORM = platform()

const {
  env: {
    HOME = homedir()
  }
} = process

const NVM = join(PATH, 'nvm.sh')

const BIN = PLATFORM === 'win32'
  ? join(PATH, '.\\bin') // \\bash')
  : join(PATH, './bin') // /bash')

const log = debug('@modernpoacher/deps')

log('`common/env` is awake')

export {
  NAME,
  VERSION,
  PLATFORM,
  HOME,
  NVM,
  BIN
}
