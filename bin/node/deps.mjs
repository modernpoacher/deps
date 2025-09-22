#!/usr/bin/env node

import {
  exec
} from 'node:child_process'

import '#deps/src/common/write'

import '#deps/src/common/debug'

import {
  getOptions
} from '#deps/src/common/options'

import {
  DEPS,
  ARGS,
  use,
  handleComplete
} from '#deps/bin/common'

const {
  stdout,
  stderr
} = exec(`${DEPS} ${ARGS}`, getOptions(), handleComplete)

if (stdout) stdout.on('data', use('deps-deps'))
if (stderr) stderr.on('data', use('deps-deps:error'))
