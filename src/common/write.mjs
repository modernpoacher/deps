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
    WRITE
  }
} = process

if (WRITE) {
  stdout.write = write(stdout, createWriteStream(WRITE))
  stderr.write = write(stderr, createWriteStream(WRITE))
}
