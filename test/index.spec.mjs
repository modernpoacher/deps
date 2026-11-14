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
    const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
    const MOCK_REGISTRY = 'REGISTRY'
    const MOCK_USERCONFIG = 'USERCONFIG'

    describe('Always', () => {
      it('returns a string', () => {
        expect(getInstallSaveProdSaveExactCommands(MOCK_PACKAGES))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --save-prod')
      })
    })

    describe('Registry is defined', () => {
      it('returns a string', () => {
        expect(getInstallSaveProdSaveExactCommands(MOCK_PACKAGES, MOCK_REGISTRY))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --registry REGISTRY --save-prod')
      })

      describe('User Config is defined', () => {
        it('returns a string', () => {
          expect(getInstallSaveProdSaveExactCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_USERCONFIG))
            .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --userconfig \'USERCONFIG\' --registry REGISTRY --save-prod')
        })

        describe('Force is true', () => {
          const MOCK_FORCE = true

          it('returns a string', () => {
            expect(getInstallSaveProdSaveExactCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_USERCONFIG, MOCK_FORCE))
              .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --force --userconfig \'USERCONFIG\' --registry REGISTRY --save-prod')
          })
        })

        describe('Force is false', () => {
          const MOCK_FORCE = false

          it('returns a string', () => {
            expect(getInstallSaveProdSaveExactCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_USERCONFIG, MOCK_FORCE))
              .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --userconfig \'USERCONFIG\' --registry REGISTRY --save-prod')
          })
        })
      })
    })
  })

  describe('`getInstallSaveDevSaveExactCommands()`', () => {
    const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
    const MOCK_REGISTRY = 'REGISTRY'
    const MOCK_USERCONFIG = 'USERCONFIG'

    describe('Always', () => {
      it('returns a string', () => {
        expect(getInstallSaveDevSaveExactCommands(MOCK_PACKAGES))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --save-dev')
      })
    })

    describe('Registry is defined', () => {
      it('returns a string', () => {
        expect(getInstallSaveDevSaveExactCommands(MOCK_PACKAGES, MOCK_REGISTRY))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --registry REGISTRY --save-dev')
      })

      describe('User Config is defined', () => {
        it('returns a string', () => {
          expect(getInstallSaveDevSaveExactCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_USERCONFIG))
            .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --userconfig \'USERCONFIG\' --registry REGISTRY --save-dev')
        })

        describe('Force is true', () => {
          const MOCK_FORCE = true

          it('returns a string', () => {
            expect(getInstallSaveDevSaveExactCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_USERCONFIG, MOCK_FORCE))
              .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --force --userconfig \'USERCONFIG\' --registry REGISTRY --save-dev')
          })
        })

        describe('Force is false', () => {
          const MOCK_FORCE = false

          it('returns a string', () => {
            expect(getInstallSaveDevSaveExactCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_USERCONFIG, MOCK_FORCE))
              .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --userconfig \'USERCONFIG\' --registry REGISTRY --save-dev')
          })
        })
      })
    })
  })

  describe('`getInstallSaveOptionalSaveExactCommands()`', () => {
    const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
    const MOCK_REGISTRY = 'REGISTRY'
    const MOCK_USERCONFIG = 'USERCONFIG'

    describe('Always', () => {
      it('returns a string', () => {
        expect(getInstallSaveOptionalSaveExactCommands(MOCK_PACKAGES))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --save-optional')
      })
    })

    describe('Registry is defined', () => {
      it('returns a string', () => {
        expect(getInstallSaveOptionalSaveExactCommands(MOCK_PACKAGES, MOCK_REGISTRY))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --registry REGISTRY --save-optional')
      })

      describe('User Config is defined', () => {
        it('returns a string', () => {
          expect(getInstallSaveOptionalSaveExactCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_USERCONFIG))
            .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --userconfig \'USERCONFIG\' --registry REGISTRY --save-optional')
        })

        describe('Force is true', () => {
          const MOCK_FORCE = true

          it('returns a string', () => {
            expect(getInstallSaveOptionalSaveExactCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_USERCONFIG, MOCK_FORCE))
              .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --force --userconfig \'USERCONFIG\' --registry REGISTRY --save-optional')
          })
        })

        describe('Force is false', () => {
          const MOCK_FORCE = false

          it('returns a string', () => {
            expect(getInstallSaveOptionalSaveExactCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_USERCONFIG, MOCK_FORCE))
              .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --userconfig \'USERCONFIG\' --registry REGISTRY --save-optional')
          })
        })
      })
    })
  })

  describe('`getInstallSaveBundleSaveExactCommands()`', () => {
    const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
    const MOCK_REGISTRY = 'REGISTRY'
    const MOCK_USERCONFIG = 'USERCONFIG'

    describe('Always', () => {
      it('returns a string', () => {
        expect(getInstallSaveBundleSaveExactCommands(MOCK_PACKAGES))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --save-bundle')
      })
    })

    describe('Registry is defined', () => {
      it('returns a string', () => {
        expect(getInstallSaveBundleSaveExactCommands(MOCK_PACKAGES, MOCK_REGISTRY))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --registry REGISTRY --save-bundle')
      })

      describe('User Config is defined', () => {
        it('returns a string', () => {
          expect(getInstallSaveBundleSaveExactCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_USERCONFIG))
            .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --userconfig \'USERCONFIG\' --registry REGISTRY --save-bundle')
        })

        describe('Force is true', () => {
          const MOCK_FORCE = true

          it('returns a string', () => {
            expect(getInstallSaveBundleSaveExactCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_USERCONFIG, MOCK_FORCE))
              .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --force --userconfig \'USERCONFIG\' --registry REGISTRY --save-bundle')
          })
        })

        describe('Force is false', () => {
          const MOCK_FORCE = false

          it('returns a string', () => {
            expect(getInstallSaveBundleSaveExactCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_USERCONFIG, MOCK_FORCE))
              .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-exact --userconfig \'USERCONFIG\' --registry REGISTRY --save-bundle')
          })
        })
      })
    })
  })

  describe('`getInstallSaveProdCommands()`', () => {
    const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
    const MOCK_REGISTRY = 'REGISTRY'
    const MOCK_USERCONFIG = 'USERCONFIG'

    describe('Always', () => {
      it('returns a string', () => {
        expect(getInstallSaveProdCommands(MOCK_PACKAGES))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-prod')
      })
    })

    describe('Registry is defined', () => {
      it('returns a string', () => {
        expect(getInstallSaveProdCommands(MOCK_PACKAGES, MOCK_REGISTRY))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --registry REGISTRY --save-prod')
      })

      describe('User Config is defined', () => {
        it('returns a string', () => {
          expect(getInstallSaveProdCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_USERCONFIG))
            .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --userconfig \'USERCONFIG\' --registry REGISTRY --save-prod')
        })

        describe('Force is true', () => {
          const MOCK_FORCE = true

          it('returns a string', () => {
            expect(getInstallSaveProdCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_USERCONFIG, MOCK_FORCE))
              .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --force --userconfig \'USERCONFIG\' --registry REGISTRY --save-prod')
          })
        })

        describe('Force is false', () => {
          const MOCK_FORCE = false

          it('returns a string', () => {
            expect(getInstallSaveProdCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_USERCONFIG, MOCK_FORCE))
              .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --userconfig \'USERCONFIG\' --registry REGISTRY --save-prod')
          })
        })
      })
    })
  })

  describe('`getInstallSaveDevCommands()`', () => {
    const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
    const MOCK_REGISTRY = 'REGISTRY'
    const MOCK_USERCONFIG = 'USERCONFIG'

    describe('Always', () => {
      it('returns a string', () => {
        expect(getInstallSaveDevCommands(MOCK_PACKAGES))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-dev')
      })
    })

    describe('Registry is defined', () => {
      it('returns a string', () => {
        expect(getInstallSaveDevCommands(MOCK_PACKAGES, MOCK_REGISTRY))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --registry REGISTRY --save-dev')
      })

      describe('User Config is defined', () => {
        it('returns a string', () => {
          expect(getInstallSaveDevCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_USERCONFIG))
            .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --userconfig \'USERCONFIG\' --registry REGISTRY --save-dev')
        })

        describe('Force is true', () => {
          const MOCK_FORCE = true

          it('returns a string', () => {
            expect(getInstallSaveDevCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_USERCONFIG, MOCK_FORCE))
              .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --force --userconfig \'USERCONFIG\' --registry REGISTRY --save-dev')
          })
        })

        describe('Force is false', () => {
          const MOCK_FORCE = false

          it('returns a string', () => {
            expect(getInstallSaveDevCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_USERCONFIG, MOCK_FORCE))
              .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --userconfig \'USERCONFIG\' --registry REGISTRY --save-dev')
          })
        })
      })
    })
  })

  describe('`getInstallSaveOptionalCommands()`', () => {
    const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
    const MOCK_REGISTRY = 'REGISTRY'
    const MOCK_USERCONFIG = 'USERCONFIG'

    describe('Always', () => {
      it('returns a string', () => {
        expect(getInstallSaveOptionalCommands(MOCK_PACKAGES))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-optional')
      })
    })

    describe('Registry is defined', () => {
      it('returns a string', () => {
        expect(getInstallSaveOptionalCommands(MOCK_PACKAGES, MOCK_REGISTRY))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --registry REGISTRY --save-optional')
      })

      describe('User Config is defined', () => {
        it('returns a string', () => {
          expect(getInstallSaveOptionalCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_USERCONFIG))
            .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --userconfig \'USERCONFIG\' --registry REGISTRY --save-optional')
        })

        describe('Force is true', () => {
          const MOCK_FORCE = true

          it('returns a string', () => {
            expect(getInstallSaveOptionalCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_USERCONFIG, MOCK_FORCE))
              .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --force --userconfig \'USERCONFIG\' --registry REGISTRY --save-optional')
          })
        })

        describe('Force is false', () => {
          const MOCK_FORCE = false

          it('returns a string', () => {
            expect(getInstallSaveOptionalCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_USERCONFIG, MOCK_FORCE))
              .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --userconfig \'USERCONFIG\' --registry REGISTRY --save-optional')
          })
        })
      })
    })
  })

  describe('`getInstallSaveBundleCommands()`', () => {
    const MOCK_PACKAGES = { name: 'PACKAGE NAME', version: 'PACKAGE VERSION' }
    const MOCK_REGISTRY = 'REGISTRY'
    const MOCK_USERCONFIG = 'USERCONFIG'

    describe('Always', () => {
      it('returns a string', () => {
        expect(getInstallSaveBundleCommands(MOCK_PACKAGES))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --save-bundle')
      })
    })

    describe('Registry is defined', () => {
      it('returns a string', () => {
        expect(getInstallSaveBundleCommands(MOCK_PACKAGES, MOCK_REGISTRY))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --registry REGISTRY --save-bundle')
      })

      describe('User Config is defined', () => {
        it('returns a string', () => {
          expect(getInstallSaveBundleCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_USERCONFIG))
            .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --userconfig \'USERCONFIG\' --registry REGISTRY --save-bundle')
        })

        describe('Force is true', () => {
          const MOCK_FORCE = true

          it('returns a string', () => {
            expect(getInstallSaveBundleCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_USERCONFIG, MOCK_FORCE))
              .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --force --userconfig \'USERCONFIG\' --registry REGISTRY --save-bundle')
          })
        })

        describe('Force is false', () => {
          const MOCK_FORCE = false

          it('returns a string', () => {
            expect(getInstallSaveBundleCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_USERCONFIG, MOCK_FORCE))
              .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --userconfig \'USERCONFIG\' --registry REGISTRY --save-bundle')
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
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION')
      })
    })

    describe('Registry is defined', () => {
      it('returns a string', () => {
        expect(getInstallCommands(MOCK_PACKAGES, MOCK_REGISTRY))
          .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --registry REGISTRY')
      })

      describe('User Config is defined', () => {
        it('returns a string', () => {
          expect(getInstallCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_USERCONFIG))
            .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --userconfig \'USERCONFIG\' --registry REGISTRY')
        })

        describe('Force is true', () => {
          const MOCK_FORCE = true

          it('returns a string', () => {
            expect(getInstallCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_USERCONFIG, MOCK_FORCE))
              .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --force --userconfig \'USERCONFIG\' --registry REGISTRY')
          })
        })

        describe('Force is false', () => {
          const MOCK_FORCE = false

          it('returns a string', () => {
            expect(getInstallCommands(MOCK_PACKAGES, MOCK_REGISTRY, MOCK_USERCONFIG, MOCK_FORCE))
              .to.equal('npm i PACKAGE NAME@PACKAGE VERSION --userconfig \'USERCONFIG\' --registry REGISTRY')
          })
        })
      })
    })
  })
})
