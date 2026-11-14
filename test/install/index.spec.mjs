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

import * as common from '#deps/src/common'

const depsExactSpy = mock.fn(() => [])
const depsSpy = mock.fn(() => [])

mock.module('#deps/src/common', {
  exports: {
    ...common,
    getDepsExact: depsExactSpy,
    getDeps: depsSpy
  }
})

const {
  getInstallSaveExactCommands,
  getInstallCommands,
  installSaveExact,
  install,
  execute
} = await import('#deps/src/install')

describe('#deps/src/install', () => {
  describe('`getInstallSaveExactCommands`', () => {
    it('is a function', () => {
      expect(getInstallSaveExactCommands)
        .to.be.a('function')
    })
  })

  describe('`getInstallCommands`', () => {
    it('is a function', () => {
      expect(getInstallCommands)
        .to.be.a('function')
    })
  })

  describe('`installSaveExact`', () => {
    it('is a function', () => {
      expect(installSaveExact)
        .to.be.a('function')
    })
  })

  describe('`install`', () => {
    it('is a function', () => {
      expect(install)
        .to.be.a('function')
    })
  })

  describe('`execute`', () => {
    it('is a function', () => {
      expect(execute)
        .to.be.a('function')
    })
  })

  describe('`getInstallSaveExactCommands()`', () => {
    const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
    const MOCK_REGISTRY = 'REGISTRY'
    const MOCK_USERCONFIG = 'USERCONFIG'

    describe('Always', () => {
      it('returns a string', () => {
        expect(getInstallSaveExactCommands(MOCK_PACKAGES))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --no-save')
      })
    })

    describe('Save is true', () => {
      const MOCK_SAVE = true

      it('returns a string', () => {
        expect(getInstallSaveExactCommands(MOCK_PACKAGES, MOCK_SAVE))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact')
      })

      describe('Registry is defined', () => {
        it('returns a string', () => {
          expect(getInstallSaveExactCommands(MOCK_PACKAGES, MOCK_SAVE, MOCK_REGISTRY))
            .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --registry REGISTRY')
        })

        describe('User Config is defined', () => {
          it('returns a string', () => {
            expect(getInstallSaveExactCommands(MOCK_PACKAGES, MOCK_SAVE, MOCK_REGISTRY, MOCK_USERCONFIG))
              .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --userconfig \'USERCONFIG\' --registry REGISTRY')
          })

          describe('Force is true', () => {
            const MOCK_FORCE = true

            it('returns a string', () => {
              expect(getInstallSaveExactCommands(MOCK_PACKAGES, MOCK_SAVE, MOCK_REGISTRY, MOCK_USERCONFIG, MOCK_FORCE))
                .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --force --userconfig \'USERCONFIG\' --registry REGISTRY')
            })
          })

          describe('Force is false', () => {
            const MOCK_FORCE = false

            it('returns a string', () => {
              expect(getInstallSaveExactCommands(MOCK_PACKAGES, MOCK_SAVE, MOCK_REGISTRY, MOCK_USERCONFIG, MOCK_FORCE))
                .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --userconfig \'USERCONFIG\' --registry REGISTRY')
            })
          })
        })
      })
    })

    describe('Save is false', () => {
      const MOCK_SAVE = false

      it('returns a string', () => {
        expect(getInstallSaveExactCommands(MOCK_PACKAGES, MOCK_SAVE))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --no-save')
      })

      describe('Registry is defined', () => {
        it('returns a string', () => {
          expect(getInstallSaveExactCommands(MOCK_PACKAGES, MOCK_SAVE, MOCK_REGISTRY))
            .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --registry REGISTRY --no-save')
        })

        describe('User Config is defined', () => {
          it('returns a string', () => {
            expect(getInstallSaveExactCommands(MOCK_PACKAGES, MOCK_SAVE, MOCK_REGISTRY, MOCK_USERCONFIG))
              .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --userconfig \'USERCONFIG\' --registry REGISTRY --no-save')
          })

          describe('Force is true', () => {
            const MOCK_FORCE = true

            it('returns a string', () => {
              expect(getInstallSaveExactCommands(MOCK_PACKAGES, MOCK_SAVE, MOCK_REGISTRY, MOCK_USERCONFIG, MOCK_FORCE))
                .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --force --userconfig \'USERCONFIG\' --registry REGISTRY --no-save')
            })
          })

          describe('Force is false', () => {
            const MOCK_FORCE = false

            it('returns a string', () => {
              expect(getInstallSaveExactCommands(MOCK_PACKAGES, MOCK_SAVE, MOCK_REGISTRY, MOCK_USERCONFIG, MOCK_FORCE))
                .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --userconfig \'USERCONFIG\' --registry REGISTRY --no-save')
            })
          })
        })
      })
    })
  })

  describe('`getInstallCommands()`', () => {
    const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
    const MOCK_REGISTRY = 'REGISTRY'
    const MOCK_USERCONFIG = 'USERCONFIG'

    describe('Always', () => {
      it('returns a string', () => {
        expect(getInstallCommands(MOCK_PACKAGES))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --no-save')
      })
    })

    describe('Save is true', () => {
      const MOCK_SAVE = true

      it('returns a string', () => {
        expect(getInstallCommands(MOCK_PACKAGES, MOCK_SAVE))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION')
      })

      describe('Registry is defined', () => {
        it('returns a string', () => {
          expect(getInstallCommands(MOCK_PACKAGES, MOCK_SAVE, MOCK_REGISTRY))
            .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --registry REGISTRY')
        })

        describe('User Config is defined', () => {
          it('returns a string', () => {
            expect(getInstallCommands(MOCK_PACKAGES, MOCK_SAVE, MOCK_REGISTRY, MOCK_USERCONFIG))
              .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --userconfig \'USERCONFIG\' --registry REGISTRY')
          })

          describe('Force is true', () => {
            const MOCK_FORCE = true

            it('returns a string', () => {
              expect(getInstallCommands(MOCK_PACKAGES, MOCK_SAVE, MOCK_REGISTRY, MOCK_USERCONFIG, MOCK_FORCE))
                .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --force --userconfig \'USERCONFIG\' --registry REGISTRY')
            })
          })

          describe('Force is false', () => {
            const MOCK_FORCE = false

            it('returns a string', () => {
              expect(getInstallCommands(MOCK_PACKAGES, MOCK_SAVE, MOCK_REGISTRY, MOCK_USERCONFIG, MOCK_FORCE))
                .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --userconfig \'USERCONFIG\' --registry REGISTRY')
            })
          })
        })
      })
    })

    describe('Save is false', () => {
      const MOCK_SAVE = false

      it('returns a string', () => {
        expect(getInstallCommands(MOCK_PACKAGES, MOCK_SAVE))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --no-save')
      })

      describe('Registry is defined', () => {
        it('returns a string', () => {
          expect(getInstallCommands(MOCK_PACKAGES, MOCK_SAVE, MOCK_REGISTRY))
            .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --registry REGISTRY --no-save')
        })

        describe('User Config is defined', () => {
          it('returns a string', () => {
            expect(getInstallCommands(MOCK_PACKAGES, MOCK_SAVE, MOCK_REGISTRY, MOCK_USERCONFIG))
              .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --userconfig \'USERCONFIG\' --registry REGISTRY --no-save')
          })

          describe('Force is true', () => {
            const MOCK_FORCE = true

            it('returns a string', () => {
              expect(getInstallCommands(MOCK_PACKAGES, MOCK_SAVE, MOCK_REGISTRY, MOCK_USERCONFIG, MOCK_FORCE))
                .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --force --userconfig \'USERCONFIG\' --registry REGISTRY --no-save')
            })
          })

          describe('Force is false', () => {
            const MOCK_FORCE = false

            it('returns a string', () => {
              expect(getInstallCommands(MOCK_PACKAGES, MOCK_SAVE, MOCK_REGISTRY, MOCK_USERCONFIG, MOCK_FORCE))
                .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --userconfig \'USERCONFIG\' --registry REGISTRY --no-save')
            })
          })
        })
      })
    })
  })

  describe('installSaveExact()', () => {
    const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
    const MOCK_SAVE = true
    const MOCK_REGISTRY = 'REGISTRY'
    const MOCK_USERCONFIG = 'USERCONFIG'
    const MOCK_FORCE = true

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
          setImmediate(() => done(error, 'MOCK RETURN VALUE'))

          return MOCK_RETURN_VALUE
        })

        syncBuiltinESMExports()
      })

      it('returns a string', async () => {
        expect(await installSaveExact('.', MOCK_PACKAGES, MOCK_SAVE, MOCK_REGISTRY, MOCK_USERCONFIG, MOCK_FORCE))
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
        await installSaveExact('.', MOCK_PACKAGES, MOCK_SAVE, MOCK_REGISTRY, MOCK_USERCONFIG, MOCK_FORCE)
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

  describe('install()', () => {
    const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
    const MOCK_SAVE = true
    const MOCK_REGISTRY = 'REGISTRY'
    const MOCK_USERCONFIG = 'USERCONFIG'
    const MOCK_FORCE = true

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
          setImmediate(() => done(error, 'MOCK RETURN VALUE'))

          return MOCK_RETURN_VALUE
        })

        syncBuiltinESMExports()
      })

      it('returns a string', async () => {
        expect(await install('.', MOCK_PACKAGES, MOCK_SAVE, MOCK_REGISTRY, MOCK_USERCONFIG, MOCK_FORCE))
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
        await install('.', MOCK_PACKAGES, MOCK_SAVE, MOCK_REGISTRY, MOCK_USERCONFIG, MOCK_FORCE)
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

  describe('execute()', () => {
    const MOCK_PACKAGES = {}
    const MOCK_CONFIGURATION = {}
    const MOCK_SAVE = true
    const MOCK_REGISTRY = 'REGISTRY'
    const MOCK_USERCONFIG = 'USERCONFIG'
    const MOCK_FORCE = true

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

    describe('Installing exact dependencies', () => {
      let execSpy
      let returnValue

      beforeEach(async () => {
        execSpy = mock.method(childProcess, 'exec', (commands, options, done) => {
          setImmediate(() => done(null, 'MOCK RETURN VALUE'))

          return MOCK_RETURN_VALUE
        })

        syncBuiltinESMExports()

        depsExactSpy.mock.mockImplementation(() => [
          { name: 'MOCK NAME', version: '1.2.3' }
        ])

        depsSpy.mock.mockImplementation(() => [])

        returnValue = await execute('.', MOCK_PACKAGES, MOCK_CONFIGURATION, MOCK_SAVE, MOCK_REGISTRY, MOCK_USERCONFIG, MOCK_FORCE)
      })

      it ('installs', () => {
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
        } = execSpy

        expect(commands).to.include('npm i MOCK NAME@1.2.3 --save-exact --force --userconfig \'USERCONFIG\' --registry REGISTRY')
      })

      it('returns undefined', async () => {
        expect(returnValue) // eslint-disable-line no-unused-expressions -- Assertion
          .to.be.undefined
      })
    })

    describe('Installing dependencies', () => {
      let execSpy
      let returnValue

      beforeEach(async () => {
        execSpy = mock.method(childProcess, 'exec', (commands, options, done) => {
          setImmediate(() => done(null, 'MOCK RETURN VALUE'))

          return MOCK_RETURN_VALUE
        })

        syncBuiltinESMExports()

        depsExactSpy.mock.mockImplementation(() => [])

        depsSpy.mock.mockImplementation(() => [
          { name: 'MOCK NAME', version: '1.2.3' }
        ])

        returnValue = await execute('.', MOCK_PACKAGES, MOCK_CONFIGURATION, MOCK_SAVE, MOCK_REGISTRY, MOCK_USERCONFIG, MOCK_FORCE)
      })

      it ('installs', () => {
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
        } = execSpy

        expect(commands).to.include('npm i MOCK NAME@1.2.3 --force --userconfig \'USERCONFIG\' --registry REGISTRY')
      })

      it('returns undefined', async () => {
        expect(returnValue) // eslint-disable-line no-unused-expressions -- Assertion
          .to.be.undefined
      })
    })
  })
})
