import {
  expect
} from 'chai'

import '#deps/test/debug'

import {
  use
} from '#deps/src/common/format'

import {
  AUTHOR,
  DIRECTORY,
  MESSAGE,
  out,
  err,
  awkGitRemoteShowOriginHead,
  catGitRefsRemotesOriginHead,
  gitAdd,
  gitCheckout,
  gitCommit,
  gitConfigUserName,
  gitConfigUserEmail,
  gitPull,
  gitPush,
  gitPushTags,
  gitRevParseAbbrevRefHead,
  gitRevParseShowTopLevel
} from '#deps/src/common/git'

describe('#deps/src/common/git', () => {
  describe('`AUTHOR`', () => {
    it('is a string', () => {
      expect(AUTHOR)
        .to.be.a('string')
    })
  })

  describe('`DIRECTORY`', () => {
    it('is a string', () => {
      expect(DIRECTORY)
        .to.be.a('string')
    })
  })

  describe('`MESSAGE`', () => {
    it('is a string', () => {
      expect(MESSAGE)
        .to.be.a('string')
    })
  })

  describe('`use`', () => {
    it('is a function', () => {
      expect(use)
        .to.be.a('function')
    })
  })

  describe('`out`', () => {
    it('is a function', () => {
      expect(out)
        .to.be.a('function')
    })
  })

  describe('`err`', () => {
    it('is a function', () => {
      expect(err)
        .to.be.a('function')
    })
  })

  describe('`awkGitRemoteShowOriginHead`', () => {
    it('is a function', () => {
      expect(awkGitRemoteShowOriginHead)
        .to.be.a('function')
    })
  })

  describe('`catGitRefsRemotesOriginHead`', () => {
    it('is a function', () => {
      expect(catGitRefsRemotesOriginHead)
        .to.be.a('function')
    })
  })

  describe('`gitAdd`', () => {
    it('is a function', () => {
      expect(gitAdd)
        .to.be.a('function')
    })
  })

  describe('`gitCheckout`', () => {
    it('is a function', () => {
      expect(gitCheckout)
        .to.be.a('function')
    })
  })

  describe('`gitCommit`', () => {
    it('is a function', () => {
      expect(gitCommit)
        .to.be.a('function')
    })
  })

  describe('`gitConfigUserName`', () => {
    it('is a function', () => {
      expect(gitConfigUserName)
        .to.be.a('function')
    })
  })

  describe('`gitConfigUserEmail`', () => {
    it('is a function', () => {
      expect(gitConfigUserEmail)
        .to.be.a('function')
    })
  })

  describe('`gitPull`', () => {
    it('is a function', () => {
      expect(gitPull)
        .to.be.a('function')
    })
  })

  describe('`gitPush`', () => {
    it('is a function', () => {
      expect(gitPush)
        .to.be.a('function')
    })
  })

  describe('`gitPushTags`', () => {
    it('is a function', () => {
      expect(gitPushTags)
        .to.be.a('function')
    })
  })

  describe('`gitRevParseAbbrevRefHead`', () => {
    it('is a function', () => {
      expect(gitRevParseAbbrevRefHead)
        .to.be.a('function')
    })
  })

  describe('`gitRevParseShowTopLevel`', () => {
    it('is a function', () => {
      expect(gitRevParseShowTopLevel)
        .to.be.a('function')
    })
  })
})
