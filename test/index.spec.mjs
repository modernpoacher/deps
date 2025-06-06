import {
  expect
} from 'chai'

import '#deps/test/debug'

import {
  getInstallSaveProdSaveExactCommands,
  getInstallSaveProdCommands,
  getInstallSaveDevSaveExactCommands,
  getInstallSaveDevCommands,
  getInstallSaveOptionalSaveExactCommands,
  getInstallSaveOptionalCommands,
  getInstallSaveBundleSaveExactCommands,
  getInstallSaveBundleCommands,
  getInstallSaveExactCommands,
  getInstallCommands,
  installSaveProdSaveExact,
  installSaveProd,
  installSaveDevSaveExact,
  installSaveDev,
  installSaveOptionalSaveExact,
  installSaveOptional,
  installSaveBundleSaveExact,
  installSaveBundle,
  executeProd,
  executeDev,
  executeOptional,
  executeBundle
} from '#deps/src'

describe('#deps/src', () => {
  describe('`getInstallSaveProdSaveExactCommands`', () => {
    it('is a function', () => {
      expect(getInstallSaveProdSaveExactCommands)
        .to.be.a('function')
    })
  })

  describe('`getInstallSaveDevSaveExactCommands`', () => {
    it('is a function', () => {
      expect(getInstallSaveDevSaveExactCommands)
        .to.be.a('function')
    })
  })

  describe('`getInstallSaveOptionalSaveExactCommands`', () => {
    it('is a function', () => {
      expect(getInstallSaveOptionalSaveExactCommands)
        .to.be.a('function')
    })
  })

  describe('`getInstallSaveBundleSaveExactCommands`', () => {
    it('is a function', () => {
      expect(getInstallSaveBundleSaveExactCommands)
        .to.be.a('function')
    })
  })

  describe('`getInstallSaveProdCommands`', () => {
    it('is a function', () => {
      expect(getInstallSaveProdCommands)
        .to.be.a('function')
    })
  })

  describe('`getInstallSaveDevCommands`', () => {
    it('is a function', () => {
      expect(getInstallSaveDevCommands)
        .to.be.a('function')
    })
  })

  describe('`getInstallSaveOptionalCommands`', () => {
    it('is a function', () => {
      expect(getInstallSaveOptionalCommands)
        .to.be.a('function')
    })
  })

  describe('`getInstallSaveBundleCommands`', () => {
    it('is a function', () => {
      expect(getInstallSaveBundleCommands)
        .to.be.a('function')
    })
  })

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

  describe('`installSaveProdSaveExact`', () => {
    it('is a function', () => {
      expect(installSaveProdSaveExact)
        .to.be.a('function')
    })
  })

  describe('`installSaveProd`', () => {
    it('is a function', () => {
      expect(installSaveProd)
        .to.be.a('function')
    })
  })

  describe('`installSaveDevSaveExact`', () => {
    it('is a function', () => {
      expect(installSaveDevSaveExact)
        .to.be.a('function')
    })
  })

  describe('`installSaveDev`', () => {
    it('is a function', () => {
      expect(installSaveDev)
        .to.be.a('function')
    })
  })

  describe('`installSaveOptionalSaveExact`', () => {
    it('is a function', () => {
      expect(installSaveOptionalSaveExact)
        .to.be.a('function')
    })
  })

  describe('`installSaveOptional`', () => {
    it('is a function', () => {
      expect(installSaveOptional)
        .to.be.a('function')
    })
  })

  describe('`installSaveBundleSaveExact`', () => {
    it('is a function', () => {
      expect(installSaveBundleSaveExact)
        .to.be.a('function')
    })
  })

  describe('`installSaveBundle`', () => {
    it('is a function', () => {
      expect(installSaveBundle)
        .to.be.a('function')
    })
  })

  describe('`executeProd`', () => {
    it('is a function', () => {
      expect(executeProd)
        .to.be.a('function')
    })
  })

  describe('`executeDev`', () => {
    it('is a function', () => {
      expect(executeDev)
        .to.be.a('function')
    })
  })

  describe('`executeOptional`', () => {
    it('is a function', () => {
      expect(executeOptional)
        .to.be.a('function')
    })
  })

  describe('`executeBundle`', () => {
    it('is a function', () => {
      expect(executeBundle)
        .to.be.a('function')
    })
  })

  describe('`getInstallSaveProdSaveExactCommands()`', () => {
    describe('Always', () => {
      it('returns a string', () => {
        const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }

        expect(getInstallSaveProdSaveExactCommands(MOCK_PACKAGES))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --save-prod')
      })
    })

    describe('Registry is defined', () => {
      it('returns a string', () => {
        const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
        const MOCK_REGISTRY = 'REGISTRY'

        expect(getInstallSaveProdSaveExactCommands(MOCK_PACKAGES, MOCK_REGISTRY))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --registry REGISTRY --save-prod')
      })

      describe('Force is true', () => {
        it('returns a string', () => {
          const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
          const MOCK_REGISTRY = 'REGISTRY'
          const MOCK_FORCE = true

          expect(getInstallSaveProdSaveExactCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_FORCE))
            .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --force --registry REGISTRY --save-prod')
        })
      })
    })
  })

  describe('`getInstallSaveDevSaveExactCommands()`', () => {
    describe('Always', () => {
      it('returns a string', () => {
        const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }

        expect(getInstallSaveDevSaveExactCommands(MOCK_PACKAGES))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --save-dev')
      })
    })

    describe('Registry is defined', () => {
      it('returns a string', () => {
        const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
        const MOCK_REGISTRY = 'REGISTRY'

        expect(getInstallSaveDevSaveExactCommands(MOCK_PACKAGES, MOCK_REGISTRY))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --registry REGISTRY --save-dev')
      })

      describe('Force is true', () => {
        it('returns a string', () => {
          const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
          const MOCK_REGISTRY = 'REGISTRY'
          const MOCK_FORCE = true

          expect(getInstallSaveDevSaveExactCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_FORCE))
            .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --force --registry REGISTRY --save-dev')
        })
      })
    })
  })

  describe('`getInstallSaveOptionalSaveExactCommands()`', () => {
    describe('Always', () => {
      it('returns a string', () => {
        const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }

        expect(getInstallSaveOptionalSaveExactCommands(MOCK_PACKAGES))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --save-optional')
      })
    })

    describe('Registry is defined', () => {
      it('returns a string', () => {
        const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
        const MOCK_REGISTRY = 'REGISTRY'

        expect(getInstallSaveOptionalSaveExactCommands(MOCK_PACKAGES, MOCK_REGISTRY))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --registry REGISTRY --save-optional')
      })

      describe('Force is true', () => {
        it('returns a string', () => {
          const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
          const MOCK_REGISTRY = 'REGISTRY'
          const MOCK_FORCE = true

          expect(getInstallSaveOptionalSaveExactCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_FORCE))
            .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --force --registry REGISTRY --save-optional')
        })
      })
    })
  })

  describe('`getInstallSaveBundleSaveExactCommands()`', () => {
    describe('Always', () => {
      it('returns a string', () => {
        const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }

        expect(getInstallSaveBundleSaveExactCommands(MOCK_PACKAGES))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --save-bundle')
      })
    })

    describe('Registry is defined', () => {
      it('returns a string', () => {
        const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
        const MOCK_REGISTRY = 'REGISTRY'

        expect(getInstallSaveBundleSaveExactCommands(MOCK_PACKAGES, MOCK_REGISTRY))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --registry REGISTRY --save-bundle')
      })

      describe('Force is true', () => {
        it('returns a string', () => {
          const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
          const MOCK_REGISTRY = 'REGISTRY'
          const MOCK_FORCE = true

          expect(getInstallSaveBundleSaveExactCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_FORCE))
            .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --force --registry REGISTRY --save-bundle')
        })
      })
    })
  })

  describe('`getInstallSaveProdCommands()`', () => {
    describe('Always', () => {
      it('returns a string', () => {
        const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }

        expect(getInstallSaveProdCommands(MOCK_PACKAGES))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-prod')
      })
    })

    describe('Registry is defined', () => {
      it('returns a string', () => {
        const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
        const MOCK_REGISTRY = 'REGISTRY'

        expect(getInstallSaveProdCommands(MOCK_PACKAGES, MOCK_REGISTRY))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --registry REGISTRY --save-prod')
      })

      describe('Force is true', () => {
        it('returns a string', () => {
          const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
          const MOCK_REGISTRY = 'REGISTRY'
          const MOCK_FORCE = true

          expect(getInstallSaveProdCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_FORCE))
            .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --force --registry REGISTRY --save-prod')
        })
      })
    })
  })

  describe('`getInstallSaveDevCommands()`', () => {
    describe('Always', () => {
      it('returns a string', () => {
        const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }

        expect(getInstallSaveDevCommands(MOCK_PACKAGES))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-dev')
      })
    })

    describe('Registry is defined', () => {
      it('returns a string', () => {
        const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
        const MOCK_REGISTRY = 'REGISTRY'

        expect(getInstallSaveDevCommands(MOCK_PACKAGES, MOCK_REGISTRY))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --registry REGISTRY --save-dev')
      })

      describe('Force is true', () => {
        it('returns a string', () => {
          const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
          const MOCK_REGISTRY = 'REGISTRY'
          const MOCK_FORCE = true

          expect(getInstallSaveDevCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_FORCE))
            .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --force --registry REGISTRY --save-dev')
        })
      })
    })
  })

  describe('`getInstallSaveOptionalCommands()`', () => {
    describe('Always', () => {
      it('returns a string', () => {
        const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }

        expect(getInstallSaveOptionalCommands(MOCK_PACKAGES))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-optional')
      })
    })

    describe('Registry is defined', () => {
      it('returns a string', () => {
        const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
        const MOCK_REGISTRY = 'REGISTRY'

        expect(getInstallSaveOptionalCommands(MOCK_PACKAGES, MOCK_REGISTRY))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --registry REGISTRY --save-optional')
      })

      describe('Force is true', () => {
        it('returns a string', () => {
          const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
          const MOCK_REGISTRY = 'REGISTRY'
          const MOCK_FORCE = true

          expect(getInstallSaveOptionalCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_FORCE))
            .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --force --registry REGISTRY --save-optional')
        })
      })
    })
  })

  describe('`getInstallSaveBundleCommands()`', () => {
    describe('Always', () => {
      it('returns a string', () => {
        const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }

        expect(getInstallSaveBundleCommands(MOCK_PACKAGES))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-bundle')
      })
    })

    describe('Registry is defined', () => {
      it('returns a string', () => {
        const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
        const MOCK_REGISTRY = 'REGISTRY'

        expect(getInstallSaveBundleCommands(MOCK_PACKAGES, MOCK_REGISTRY))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --registry REGISTRY --save-bundle')
      })

      describe('Force is true', () => {
        it('returns a string', () => {
          const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
          const MOCK_REGISTRY = 'REGISTRY'
          const MOCK_FORCE = true

          expect(getInstallSaveBundleCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_FORCE))
            .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --force --registry REGISTRY --save-bundle')
        })
      })
    })
  })

  describe('`getInstallCommands()`', () => {
    describe('Always', () => {
      it('returns a string', () => {
        const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }

        expect(getInstallCommands(MOCK_PACKAGES))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION')
      })
    })

    describe('Registry is defined', () => {
      it('returns a string', () => {
        const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
        const MOCK_REGISTRY = 'REGISTRY'

        expect(getInstallCommands(MOCK_PACKAGES, MOCK_REGISTRY))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --registry REGISTRY')
      })

      describe('Force is true', () => {
        it('returns a string', () => {
          const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
          const MOCK_REGISTRY = 'REGISTRY'
          const MOCK_FORCE = true

          expect(getInstallCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_FORCE))
            .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --force --registry REGISTRY')
        })
      })
    })
  })
})
