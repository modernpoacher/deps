#!/usr/bin/env node

import debug from 'debug'

import PATH from '#where-am-i'

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
  PLATFORM
} from '#deps/src/common/env'

import {
  getOptions
} from '#deps/src/common/options'

const {
  env: {
    NODE_OPTIONS = '--disable-warning=ExperimentalWarning',
    DEBUG = '@modernpoacher/deps*'
  }
} = process

process.env.NODE_OPTIONS = NODE_OPTIONS

debug.enable(DEBUG)

const command = (
  PLATFORM === 'win32'
    ? `bash "${join(PATH, '.\\bin\\bash\\head.sh')}"`
    : `bash '${join(PATH, './bin/bash/head.sh')}'`
)

const args = getArgs()

const {
  stdout,
  stderr
} = exec(`${command} ${args}`, getOptions(), handleComplete)

stdout.on('data', use('deps-head'))
stderr.on('data', use('deps-head:error'))
