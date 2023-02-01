import debug from 'debug'

import {
  expect
} from 'chai'

import {
  gitRevParse,
  gitCheckout,
  gitPull,
  gitPush,
  gitPushTags,
  gitAdd,
  gitCommit
} from '#deps/src/common/git'

describe('#deps/src/common/git', () => {
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

  describe('`gitPushTags`', () => {
    it('is a function', () => {
      return expect(gitPushTags)
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
