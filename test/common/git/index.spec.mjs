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
  gitCheckout,
  gitAdd,
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

  describe('`gitCheckout`', () => {
    it('is a function', () => {
      expect(gitCheckout)
        .to.be.a('function')
    })
  })

  describe('`gitAdd`', () => {
    it('is a function', () => {
      expect(gitAdd)
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
    const MOCK_RETURN_VALUE = {
      stdout: null,
      stderr: null
    }

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
        mock.method(childProcess, 'exec', (commands, options, done) => {
          setImmediate(() => done(error, ' mock/branch\n'))

          return MOCK_RETURN_VALUE
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
        mock.method(childProcess, 'exec', (commands, options, done) => {
          setImmediate(() => done(error))

          return MOCK_RETURN_VALUE
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
    const MOCK_RETURN_VALUE = {
      stdout: null,
      stderr: null
    }

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
        mock.method(childProcess, 'exec', (commands, options, done) => {
          setImmediate(() => done(error, ' mock/branch\n'))

          return MOCK_RETURN_VALUE
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
        mock.method(childProcess, 'exec', (commands, options, done) => {
          setImmediate(() => done(error))

          return MOCK_RETURN_VALUE
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

  describe('gitCheckout()', () => {
    const MOCK_RETURN_VALUE = {
      stdout: null,
      stderr: null
    }

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
      let spy
      let returnValue

      beforeEach(async () => {
        spy = mock.method(childProcess, 'exec', (commands, options, done) => {
          setImmediate(() => done(error, 'MOCK RETURN VALUE'))

          return MOCK_RETURN_VALUE
        })

        syncBuiltinESMExports()

        returnValue = await gitCheckout('.', 'MOCK BRANCH')
      })

      it('calls `exec`', () => {
        const {
          mock: {
            calls: [
              {
                arguments: [
                  commands,
                  options,
                  done
                ]
              }
            ]
          }
        } = spy

        expect(commands)
          .to.equal('git checkout MOCK BRANCH')

        expect(options)
          .to.be.an('object')

        expect(done)
          .to.be.a('function')
      })

      it('returns a string', async () => {
        expect(returnValue)
          .to.equal('MOCK RETURN VALUE')
      })
    })

    describe('Or', () => {
      const error = new Error('MOCK ERROR')

      before(() => {
        mock.method(childProcess, 'exec', (commands, options, done) => {
          setImmediate(() => done(error))

          return MOCK_RETURN_VALUE
        })

        syncBuiltinESMExports()
      })

      it('rejects', async () => {
        await gitCheckout('.', 'MOCK BRANCH')
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

  describe('gitAdd()', () => {
    const MOCK_RETURN_VALUE = {
      stdout: null,
      stderr: null
    }

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
      let spy
      let returnValue

      beforeEach(async () => {
        spy = mock.method(childProcess, 'exec', (commands, options, done) => {
          setImmediate(() => done(error, 'MOCK RETURN VALUE'))

          return MOCK_RETURN_VALUE
        })

        syncBuiltinESMExports()

        returnValue = await gitAdd('.', 'MOCK ADD')
      })

      it('calls `exec`', () => {
        const {
          mock: {
            calls: [
              {
                arguments: [
                  commands,
                  options,
                  done
                ]
              }
            ]
          }
        } = spy

        expect(commands)
          .to.equal('git add MOCK ADD')

        expect(options)
          .to.be.an('object')

        expect(done)
          .to.be.a('function')
      })

      it('returns a string', async () => {
        expect(returnValue)
          .to.equal('MOCK RETURN VALUE')
      })
    })

    describe('Or', () => {
      const error = new Error('MOCK ERROR')

      before(() => {
        mock.method(childProcess, 'exec', (commands, options, done) => {
          setImmediate(() => done(error))

          return MOCK_RETURN_VALUE
        })

        syncBuiltinESMExports()
      })

      it('rejects', async () => {
        await gitAdd('.', 'MOCK ADD')
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

  describe('gitCommit()', () => {
    const MOCK_RETURN_VALUE = {
      stdout: null,
      stderr: null
    }

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
      let spy
      let returnValue

      beforeEach(async () => {
        spy = mock.method(childProcess, 'exec', (commands, options, done) => {
          setImmediate(() => done(error, 'MOCK RETURN VALUE', 'MOCK RETURN VALUE'))

          return MOCK_RETURN_VALUE
        })

        syncBuiltinESMExports()

        returnValue = await gitCommit('.', 'MOCK MESSAGE', 'MOCK AUTHOR')
      })

      it('calls `exec`', () => {
        const {
          mock: {
            calls: [
              {
                arguments: [
                  commands,
                  options,
                  done
                ]
              }
            ]
          }
        } = spy

        expect(commands)
          .to.equal('git commit -m "MOCK MESSAGE" --author "MOCK AUTHOR"')

        expect(options)
          .to.be.an('object')

        expect(done)
          .to.be.a('function')
      })

      it('returns an array', async () => {
        expect(returnValue)
          .to.eql(
            [
              'MOCK RETURN VALUE',
              'MOCK RETURN VALUE'
            ]
          )
      })
    })

    describe('Or', () => {
      const error = new Error('MOCK ERROR')

      before(() => {
        mock.method(childProcess, 'exec', (commands, options, done) => {
          setImmediate(() => done(error))

          return MOCK_RETURN_VALUE
        })

        syncBuiltinESMExports()
      })

      it('rejects', async () => {
        await gitCommit('.', 'MOCK MESSAGE')
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

  describe('gitConfigUserName()', () => {
    const MOCK_RETURN_VALUE = {
      stdout: null,
      stderr: null
    }

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
      let spy
      let returnValue

      beforeEach(async () => {
        spy = mock.method(childProcess, 'exec', (commands, options, done) => {
          setImmediate(() => done(error, 'MOCK RETURN VALUE'))

          return MOCK_RETURN_VALUE
        })

        syncBuiltinESMExports()

        returnValue = await gitConfigUserName('.')
      })

      it('calls `exec`', () => {
        const {
          mock: {
            calls: [
              {
                arguments: [
                  commands,
                  options,
                  done
                ]
              }
            ]
          }
        } = spy

        expect(commands)
          .to.equal('git config user.name')

        expect(options)
          .to.be.an('object')

        expect(done)
          .to.be.a('function')
      })

      it('returns a string', async () => {
        expect(returnValue)
          .to.equal('MOCK RETURN VALUE')
      })
    })

    describe('Or', () => {
      const error = new Error('MOCK ERROR')

      before(() => {
        mock.method(childProcess, 'exec', (commands, options, done) => {
          setImmediate(() => done(error))

          return MOCK_RETURN_VALUE
        })

        syncBuiltinESMExports()
      })

      it('rejects', async () => {
        await gitConfigUserName('.')
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

  describe('gitConfigUserEmail()', () => {
    const MOCK_RETURN_VALUE = {
      stdout: null,
      stderr: null
    }

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
      let spy
      let returnValue

      beforeEach(async () => {
        spy = mock.method(childProcess, 'exec', (commands, options, done) => {
          setImmediate(() => done(error, 'MOCK RETURN VALUE'))

          return MOCK_RETURN_VALUE
        })

        syncBuiltinESMExports()

        returnValue = await gitConfigUserEmail('.')
      })

      it('calls `exec`', () => {
        const {
          mock: {
            calls: [
              {
                arguments: [
                  commands,
                  options,
                  done
                ]
              }
            ]
          }
        } = spy

        expect(commands)
          .to.equal('git config user.email')

        expect(options)
          .to.be.an('object')

        expect(done)
          .to.be.a('function')
      })

      it('returns a string', async () => {
        expect(returnValue)
          .to.equal('MOCK RETURN VALUE')
      })
    })

    describe('Or', () => {
      const error = new Error('MOCK ERROR')

      before(() => {
        mock.method(childProcess, 'exec', (commands, options, done) => {
          setImmediate(() => done(error))

          return MOCK_RETURN_VALUE
        })

        syncBuiltinESMExports()
      })

      it('rejects', async () => {
        await gitConfigUserEmail('.')
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

  describe('gitPull()', () => {
    const MOCK_RETURN_VALUE = {
      stdout: null,
      stderr: null
    }

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
      let spy
      let returnValue

      beforeEach(async () => {
        spy = mock.method(childProcess, 'exec', (commands, options, done) => {
          setImmediate(() => done(error, 'MOCK RETURN VALUE'))

          return MOCK_RETURN_VALUE
        })

        syncBuiltinESMExports()

        returnValue = await gitPull('.')
      })

      it('calls `exec`', () => {
        const {
          mock: {
            calls: [
              {
                arguments: [
                  commands,
                  options,
                  done
                ]
              }
            ]
          }
        } = spy

        expect(commands)
          .to.include('git pull')

        expect(options)
          .to.be.an('object')

        expect(done)
          .to.be.a('function')
      })

      it('returns a string', async () => {
        expect(returnValue)
          .to.equal('MOCK RETURN VALUE')
      })
    })

    describe('Or', () => {
      const error = new Error('MOCK ERROR')

      before(() => {
        mock.method(childProcess, 'exec', (commands, options, done) => {
          setImmediate(() => done(error))

          return MOCK_RETURN_VALUE
        })

        syncBuiltinESMExports()
      })

      it('rejects', async () => {
        await gitPull('.')
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

  describe('gitPush()', () => {
    const MOCK_RETURN_VALUE = {
      stdout: null,
      stderr: null
    }

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
      let spy
      let returnValue

      beforeEach(async () => {
        spy = mock.method(childProcess, 'exec', (commands, options, done) => {
          setImmediate(() => done(error, 'MOCK RETURN VALUE'))

          return MOCK_RETURN_VALUE
        })

        syncBuiltinESMExports()

        returnValue = await gitPush('.')
      })

      it('calls `exec`', () => {
        const {
          mock: {
            calls: [
              {
                arguments: [
                  commands,
                  options,
                  done
                ]
              }
            ]
          }
        } = spy

        expect(commands)
          .to.include('git push')

        expect(options)
          .to.be.an('object')

        expect(done)
          .to.be.a('function')
      })

      it('returns a string', async () => {
        expect(returnValue)
          .to.equal('MOCK RETURN VALUE')
      })
    })

    describe('Or', () => {
      const error = new Error('MOCK ERROR')

      before(() => {
        mock.method(childProcess, 'exec', (commands, options, done) => {
          setImmediate(() => done(error))

          return MOCK_RETURN_VALUE
        })

        syncBuiltinESMExports()
      })

      it('rejects', async () => {
        await gitPush('.')
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

  describe('gitPushTags()', () => {
    const MOCK_RETURN_VALUE = {
      stdout: null,
      stderr: null
    }

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
      let spy
      let returnValue

      beforeEach(async () => {
        spy = mock.method(childProcess, 'exec', (commands, options, done) => {
          setImmediate(() => done(error, commands))

          return MOCK_RETURN_VALUE
        })

        syncBuiltinESMExports()

        returnValue = await gitPushTags('.')
      })

      it('calls `exec`', () => {
        const {
          mock: {
            calls: [
              {
                arguments: [
                  commands,
                  options,
                  done
                ]
              }
            ]
          }
        } = spy

        expect(commands)
          .to.include('git push --tags')

        expect(options)
          .to.be.an('object')

        expect(done)
          .to.be.a('function')
      })

      it('returns a string', async () => {
        const {
          mock: {
            calls: [
              {
                arguments: [
                  commands
                ]
              }
            ]
          }
        } = spy

        expect(returnValue)
          .to.equal(commands)
      })
    })

    describe('Or', () => {
      const error = new Error('MOCK ERROR')

      before(() => {
        mock.method(childProcess, 'exec', (commands, options, done) => {
          setImmediate(() => done(error))

          return MOCK_RETURN_VALUE
        })

        syncBuiltinESMExports()
      })

      it('rejects', async () => {
        await gitPushTags('.')
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
    const MOCK_RETURN_VALUE = {
      stdout: null,
      stderr: null
    }

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
        mock.method(childProcess, 'exec', (commands, options, done) => {
          setImmediate(() => done(error, ' mock/branch\n'))

          return MOCK_RETURN_VALUE
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
        mock.method(childProcess, 'exec', (commands, options, done) => {
          setImmediate(() => done(error))

          return MOCK_RETURN_VALUE
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
    const MOCK_RETURN_VALUE = {
      stdout: null,
      stderr: null
    }

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
        mock.method(childProcess, 'exec', (commands, options, done) => {
          setImmediate(() => done(error, ' /mock/path\n'))

          return MOCK_RETURN_VALUE
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
        mock.method(childProcess, 'exec', (commands, options, done) => {
          setImmediate(() => done(error))

          return MOCK_RETURN_VALUE
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
