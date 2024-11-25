#!/usr/bin/env node

import debug from 'debug'

import {
  exec
} from 'node:child_process'

import {
  join
} from 'node:path'

import {
  getArgs,
  use,
  handleComplete
} from '#deps/bin/common'

import {
  PLATFORM,
  BIN
} from '#deps/src/common/env'

import {
  getOptions
} from '#deps/src/common/options'

const {
  env: {
    DEBUG = '@modernpoacher/deps*'
  }
} = process

debug.enable(DEBUG)

const command = (
  PLATFORM === 'win32'
    ? `bash "${join(BIN, '.\\bash\\wipe.sh')}"`
    : `bash '${join(BIN, './bash/wipe.sh')}'`
)

const args = getArgs()

const {
  stdout,
  stderr
} = exec(`${command} ${args}`, getOptions(), handleComplete)

stdout.on('data', use('deps-wipe'))
stderr.on('data', use('deps-wipe:error'))
