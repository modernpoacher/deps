import debug from 'debug'

import { expect } from 'chai'

import {
  gitRevParse,
  gitCheckout,
  gitPull,
  gitPush,
  gitAdd,
  gitCommit
} from '@modernpoacher/deps/common/git'

describe('@modernpoacher/deps/common/git', () => {
  before(() => {
    const {
      env: {
        DEBUG
      }
    } = process

    if (DEBUG) debug.enable(DEBUG)
  })

  describe('`gitRevParse`', () => {
    it('is a function', () => {
      return expect(gitRevParse)
        .to.be.a('function')
    })
  })

  describe('`gitCheckout`', () => {
    it('is a function', () => {
      return expect(gitCheckout)
        .to.be.a('function')
    })
  })

  describe('`gitPull`', () => {
    it('is a function', () => {
      return expect(gitPull)
        .to.be.a('function')
    })
  })

  describe('`gitPush`', () => {
    it('is a function', () => {
      return expect(gitPush)
        .to.be.a('function')
    })
  })

  describe('`gitAdd`', () => {
    it('is a function', () => {
      return expect(gitAdd)
        .to.be.a('function')
    })
  })

  describe('`gitCommit`', () => {
    it('is a function', () => {
      return expect(gitCommit)
        .to.be.a('function')
    })
  })
})
