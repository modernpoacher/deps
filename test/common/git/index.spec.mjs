import childProcess from 'node:child_process'

import {
  syncBuiltinESMExports
} from 'node:module'

import {
  mock
} from 'node:test'

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

  describe('awkGitRemoteShowOriginHead()', () => {
    before(() => {
      mock.restoreAll()
      syncBuiltinESMExports()
    })

    afterEach(() => {
      mock.restoreAll()
      syncBuiltinESMExports()
    })

    describe('Either', () => {
      const error = null

      before(() => {
        mock.method(childProcess, 'exec', (commands, options, callback) => {
          callback(error, ' mock/branch\n')

          return { stdout: null, stderr: null }
        })

        syncBuiltinESMExports()
      })

      it('returns a string', async () => {
        expect(await awkGitRemoteShowOriginHead('.'))
          .to.equal('mock/branch')
      })
    })

    describe('Or', () => {
      const error = new Error('MOCK ERROR')

      before(() => {
        mock.method(childProcess, 'exec', (commands, options, callback) => {
          callback(error)

          return { stdout: null, stderr: null }
        })

        syncBuiltinESMExports()
      })

      it('rejects', async () => {
        await awkGitRemoteShowOriginHead('.')
          .then(() => {
            expect.fail('EXPECTATION FAILURE')
          })
          .catch((e) => {
            expect(e)
              .to.equal(error)
          })
      })
    })
  })

  describe('catGitRefsRemotesOriginHead()', () => {
    before(() => {
      mock.restoreAll()
      syncBuiltinESMExports()
    })

    afterEach(() => {
      mock.restoreAll()
      syncBuiltinESMExports()
    })

    describe('Either', () => {
      const error = null

      before(() => {
        mock.method(childProcess, 'exec', (commands, options, callback) => {
          callback(error, ' mock/branch\n')

          return { stdout: null, stderr: null }
        })

        syncBuiltinESMExports()
      })

      it('returns a string', async () => {
        expect(await catGitRefsRemotesOriginHead('.'))
          .to.equal('mock/branch')
      })
    })

    describe('Or', () => {
      const error = new Error('MOCK ERROR')

      before(() => {
        mock.method(childProcess, 'exec', (commands, options, callback) => {
          callback(error)

          return { stdout: null, stderr: null }
        })

        syncBuiltinESMExports()
      })

      it('rejects', async () => {
        await catGitRefsRemotesOriginHead('.')
          .then(() => {
            expect.fail('EXPECTATION FAILURE')
          })
          .catch((e) => {
            expect(e)
              .to.equal(error)
          })
      })
    })
  })

  describe('gitRevParseAbbrevRefHead()', () => {
    before(() => {
      mock.restoreAll()
      syncBuiltinESMExports()
    })

    afterEach(() => {
      mock.restoreAll()
      syncBuiltinESMExports()
    })

    describe('Either', () => {
      const error = null

      before(() => {
        mock.method(childProcess, 'exec', (commands, options, callback) => {
          callback(error, ' mock/branch\n')

          return { stdout: null, stderr: null }
        })

        syncBuiltinESMExports()
      })

      it('returns a string', async () => {
        expect(await gitRevParseAbbrevRefHead('.'))
          .to.equal('mock/branch')
      })
    })

    describe('Or', () => {
      const error = new Error('MOCK ERROR')

      before(() => {
        mock.method(childProcess, 'exec', (commands, options, callback) => {
          callback(error)

          return { stdout: null, stderr: null }
        })

        syncBuiltinESMExports()
      })

      it('rejects', async () => {
        await gitRevParseAbbrevRefHead('.')
          .then(() => {
            expect.fail('EXPECTATION FAILURE')
          })
          .catch((e) => {
            expect(e)
              .to.equal(error)
          })
      })
    })
  })

  describe('gitRevParseShowTopLevel()', () => {
    before(() => {
      mock.restoreAll()
      syncBuiltinESMExports()
    })

    afterEach(() => {
      mock.restoreAll()
      syncBuiltinESMExports()
    })

    describe('Either', () => {
      const error = null

      before(() => {
        mock.method(childProcess, 'exec', (commands, options, callback) => {
          callback(error, ' /mock/path\n')

          return { stdout: null, stderr: null }
        })

        syncBuiltinESMExports()
      })

      it('returns a string', async () => {
        expect(await gitRevParseShowTopLevel('.'))
          .to.equal('/mock/path')
      })
    })

    describe('Or', () => {
      const error = new Error('MOCK ERROR')

      before(() => {
        mock.method(childProcess, 'exec', (commands, options, callback) => {
          callback(error)

          return { stdout: null, stderr: null }
        })

        syncBuiltinESMExports()
      })

      it('rejects', async () => {
        await gitRevParseShowTopLevel('.')
          .then(() => {
            expect.fail('EXPECTATION FAILURE')
          })
          .catch((e) => {
            expect(e)
              .to.equal(error)
          })
      })
    })
  })
})
