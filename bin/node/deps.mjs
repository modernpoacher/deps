#!/usr/bin/env node

import {
  exec
} from 'node:child_process'

import '#deps/src/common/write'

import {
  use
} from '#deps/src/common/format'

import {
  getOptions
} from '#deps/src/common/options'

import {
  DEPS,
  ARGS,
  handleComplete
} from '#deps/bin/common'

const {
  stdout,
  stderr
} = exec(`${DEPS} ${ARGS}`, getOptions(), handleComplete)

if (stdout) stdout.on('data', use('deps-deps'))
if (stderr) stderr.on('data', use('deps-deps:error'))
