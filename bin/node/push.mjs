#!/usr/bin/env node

import {
  exec
} from 'node:child_process'

import {
  join
} from 'node:path'

import '#deps/src/common/debug'

import {
  PLATFORM,
  BIN
} from '#deps/src/common/env'

import {
  getOptions
} from '#deps/src/common/options'

import {
  getArgs,
  use,
  handleComplete
} from '#deps/bin/common'

const command = (
  PLATFORM === 'win32'
    ? `bash "${join(BIN, '.\\bash\\push.sh')}"`
    : `bash '${join(BIN, './bash/push.sh')}'`
)

const args = getArgs()

const {
  stdout,
  stderr
} = exec(`${command} ${args}`, getOptions(), handleComplete)

stdout.on('data', use('deps-push'))
stderr.on('data', use('deps-push:error'))
