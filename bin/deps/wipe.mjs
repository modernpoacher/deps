#!/usr/bin/env node

import debug from 'debug'

import PATH from '#where-am-i'

import {
  exec
} from 'node:child_process'

import {
  resolve
} from 'node:path'

import {
  getArgs,
  use,
  handleComplete
} from '#deps/bin/common'

import {
  PLATFORM
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
    ? `bash "${resolve(PATH, '.\\bin\\bash\\wipe.sh')}"`
    : `bash '${resolve(PATH, './bin/bash/wipe.sh')}'`
)

const args = getArgs()

const {
  stdout,
  stderr
} = exec(`${command} ${args}`, getOptions(), handleComplete)

stdout.on('data', use('deps-wipe'))
stderr.on('data', use('deps-wipe:error'))
