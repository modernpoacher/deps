import {
  expect
} from 'chai'

import {
  MESSAGE,
  AUTHOR,
  use,
  out,
  err,
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
  describe('`MESSAGE`', () => {
    it('is a string', () => {
      return expect(MESSAGE)
        .to.be.a('string')
    })
  })

  describe('`AUTHOR`', () => {
    it('is a string', () => {
      return expect(AUTHOR)
        .to.be.a('string')
    })
  })

  describe('`use`', () => {
    it('is a function', () => {
      return expect(use)
        .to.be.a('function')
    })
  })

  describe('`out`', () => {
    it('is a function', () => {
      return expect(out)
        .to.be.a('function')
    })
  })

  describe('`err`', () => {
    it('is a function', () => {
      return expect(err)
        .to.be.a('function')
    })
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
