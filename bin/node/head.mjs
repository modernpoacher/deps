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
  HEAD,
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
  } = exec(`${HEAD} ${ARGS}`, getOptions(), handleComplete)

  if (stdout) stdout.on('data', use('deps-head'))
  if (stderr) stderr.on('data', use('deps-head:error'))
}
