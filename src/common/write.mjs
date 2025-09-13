import {
  stdout,
  stderr
} from 'node:process'

import {
  createWriteStream
} from 'node:fs'

import write from '@sequencemedia/write'

const {
  env: {
    STDOUT,
    STDERR
  }
} = process

if (STDOUT) stdout.write = write(stdout, createWriteStream(STDOUT))
if (STDERR) stderr.write = write(stderr, createWriteStream(STDERR))
