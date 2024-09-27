#!/usr/bin/env node

import debug from 'debug'

import {
  exec
} from 'node:child_process'

import {
  resolve
} from 'node:path'

import {
  getArgs,
  use
} from '#deps/bin/common'

import {
  getOptions
} from '#deps/src/common'

import {
  PLATFORM
} from '#deps/src/common/env'

import PATH from '#where-am-i'

const {
  env: {
    DEBUG = '@modernpoacher/deps*'
  }
} = process

debug.enable(DEBUG)

const log = debug('@modernpoacher/deps')
const error = debug('@modernpoacher/deps:error')

const command = (
  PLATFORM === 'win32'
    ? `bash "${resolve(PATH, '.\\bin\\bash\\deps.sh')}"`
    : `bash '${resolve(PATH, './bin/bash/deps.sh')}'`
)

const args = getArgs()

const {
  stdout,
  stderr
} = exec(`${command} ${args}`, getOptions(), (e, v) => {
  if (!e) return log('👍')
  error('👎')
})

stdout.on('data', use('deps-deps'))
stderr.on('data', use('deps-deps:error'))
