import debug from 'debug'

import {
  expect
} from 'chai'

import {
  catGitRefsRemotesOriginHead,
  awkGitRemoteShowOriginHead,
  gitRevParseShowTopLevel,
  gitRevParseAbbrevRefHead,
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

  describe('`catGitRefsRemotesOriginHead`', () => {
    it('is a function', () => {
      return expect(catGitRefsRemotesOriginHead)
        .to.be.a('function')
    })
  })

  describe('`awkGitRemoteShowOriginHead`', () => {
    it('is a function', () => {
      return expect(awkGitRemoteShowOriginHead)
        .to.be.a('function')
    })
  })

  describe('`gitRevParseShowTopLevel`', () => {
    it('is a function', () => {
      return expect(gitRevParseShowTopLevel)
        .to.be.a('function')
    })
  })

  describe('`gitRevParseAbbrevRefHead`', () => {
    it('is a function', () => {
      return expect(gitRevParseAbbrevRefHead)
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
