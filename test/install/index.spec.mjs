import {
  expect
} from 'chai'

import {
  getInstallSaveExactCommands,
  getInstallCommands,
  installSaveExact,
  install,
  execute
} from '#deps/src/install'

describe('#deps/src/install', () => {
  describe('`getInstallSaveExactCommands`', () => {
    it('is a function', () => {
      return expect(getInstallSaveExactCommands)
        .to.be.a('function')
    })
  })

  describe('`getInstallCommands`', () => {
    it('is a function', () => {
      return expect(getInstallCommands)
        .to.be.a('function')
    })
  })

  describe('`installSaveExact`', () => {
    it('is a function', () => {
      return expect(installSaveExact)
        .to.be.a('function')
    })
  })

  describe('`install`', () => {
    it('is a function', () => {
      return expect(install)
        .to.be.a('function')
    })
  })

  describe('`execute`', () => {
    it('is a function', () => {
      return expect(execute)
        .to.be.a('function')
    })
  })

  describe('`getInstallSaveExactCommands()`', () => {
    describe('Always', () => {
      it('returns a string', () => {
        const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }

        return expect(getInstallSaveExactCommands(MOCK_PACKAGES))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --no-save')
      })
    })

    describe('Save is true', () => {
      it('returns a string', () => {
        const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
        const MOCK_SAVE = true

        return expect(getInstallSaveExactCommands(MOCK_PACKAGES, MOCK_SAVE))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact')
      })

      describe('Registry is defined', () => {
        it('returns a string', () => {
          const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
          const MOCK_SAVE = true
          const MOCK_REGISTRY = 'REGISTRY'

          return expect(getInstallSaveExactCommands(MOCK_PACKAGES, MOCK_SAVE, MOCK_REGISTRY))
            .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --registry REGISTRY')
        })

        describe('Force is true', () => {
          it('returns a string', () => {
            const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
            const MOCK_SAVE = true
            const MOCK_REGISTRY = 'REGISTRY'
            const MOCK_FORCE = true

            return expect(getInstallSaveExactCommands(MOCK_PACKAGES, MOCK_SAVE, MOCK_REGISTRY, MOCK_FORCE))
              .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --force --registry REGISTRY')
          })
        })
      })
    })

    describe('Save is false', () => {
      it('returns a string', () => {
        const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
        const MOCK_SAVE = false

        return expect(getInstallSaveExactCommands(MOCK_PACKAGES, MOCK_SAVE))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --no-save')
      })

      describe('Registry is defined', () => {
        it('returns a string', () => {
          const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
          const MOCK_SAVE = false
          const MOCK_REGISTRY = 'REGISTRY'

          return expect(getInstallSaveExactCommands(MOCK_PACKAGES, MOCK_SAVE, MOCK_REGISTRY))
            .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --registry REGISTRY --no-save')
        })

        describe('Force is true', () => {
          it('returns a string', () => {
            const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
            const MOCK_SAVE = false
            const MOCK_REGISTRY = 'REGISTRY'
            const MOCK_FORCE = true

            return expect(getInstallSaveExactCommands(MOCK_PACKAGES, MOCK_SAVE, MOCK_REGISTRY, MOCK_FORCE))
              .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --force --registry REGISTRY --no-save')
          })
        })
      })
    })
  })

  describe('`getInstallCommands()`', () => {
    describe('Always', () => {
      it('returns a string', () => {
        const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }

        return expect(getInstallCommands(MOCK_PACKAGES))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --no-save')
      })
    })

    describe('Save is true', () => {
      it('returns a string', () => {
        const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
        const MOCK_SAVE = true

        return expect(getInstallCommands(MOCK_PACKAGES, MOCK_SAVE))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION')
      })

      describe('Registry is defined', () => {
        it('returns a string', () => {
          const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
          const MOCK_SAVE = true
          const MOCK_REGISTRY = 'REGISTRY'

          return expect(getInstallCommands(MOCK_PACKAGES, MOCK_SAVE, MOCK_REGISTRY))
            .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --registry REGISTRY')
        })

        describe('Force is true', () => {
          it('returns a string', () => {
            const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
            const MOCK_SAVE = true
            const MOCK_REGISTRY = 'REGISTRY'
            const MOCK_FORCE = true

            return expect(getInstallCommands(MOCK_PACKAGES, MOCK_SAVE, MOCK_REGISTRY, MOCK_FORCE))
              .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --force --registry REGISTRY')
          })
        })
      })
    })

    describe('Save is false', () => {
      it('returns a string', () => {
        const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
        const MOCK_SAVE = false

        return expect(getInstallCommands(MOCK_PACKAGES, MOCK_SAVE))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --no-save')
      })

      describe('Registry is defined', () => {
        it('returns a string', () => {
          const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
          const MOCK_SAVE = false
          const MOCK_REGISTRY = 'REGISTRY'

          return expect(getInstallCommands(MOCK_PACKAGES, MOCK_SAVE, MOCK_REGISTRY))
            .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --registry REGISTRY --no-save')
        })

        describe('Force is true', () => {
          it('returns a string', () => {
            const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
            const MOCK_SAVE = false
            const MOCK_REGISTRY = 'REGISTRY'
            const MOCK_FORCE = true

            return expect(getInstallCommands(MOCK_PACKAGES, MOCK_SAVE, MOCK_REGISTRY, MOCK_FORCE))
              .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --force --registry REGISTRY --no-save')
          })
        })
      })
    })
  })
})
