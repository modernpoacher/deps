#!/usr/bin/env node

import {
  exec
} from 'node:child_process'

import '#deps/src/common/debug'

import {
  getOptions
} from '#deps/src/common/options'

import {
  HEAD,
  ARGS,
  use,
  handleComplete
} from '#deps/bin/common'

const {
  stdout,
  stderr
} = exec(`${HEAD} ${ARGS}`, getOptions(), handleComplete)

if (stdout) stdout.on('data', use('deps-head'))
if (stderr) stderr.on('data', use('deps-head:error'))
