#!/usr/bin/env node

import {
  stdout,
  stderr
} from 'node:process'

import {
  createWriteStream
} from 'node:fs'

import {
  exec
} from 'node:child_process'

import write from '@sequencemedia/write'

import '#deps/src/common/debug'

import {
  OUT,
  ERR
} from '#deps/src/common/env'

import {
  getOptions
} from '#deps/src/common/options'

import {
  PUSH,
  ARGS,
  use,
  handleComplete
} from '#deps/bin/common'

if (OUT) stdout.write = write(stdout, createWriteStream(OUT))
if (ERR) stderr.write = write(stderr, createWriteStream(ERR))

{
  const {
    stdout,
    stderr
  } = exec(`${PUSH} ${ARGS}`, getOptions(), handleComplete)

  if (stdout) stdout.on('data', use('deps-push'))
  if (stderr) stderr.on('data', use('deps-push:error'))
}
