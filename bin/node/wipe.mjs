#!/usr/bin/env node

import {
  exec
} from 'node:child_process'

import '#deps/src/common/debug'

import {
  getOptions
} from '#deps/src/common/options'

import {
  WIPE,
  ARGS,
  use,
  handleComplete
} from '#deps/bin/common'

const {
  stdout,
  stderr
} = exec(`${WIPE} ${ARGS}`, getOptions(), handleComplete)

if (stdout) stdout.on('data', use('deps-wipe'))
if (stderr) stderr.on('data', use('deps-wipe:error'))
