/**
 *  @typedef {DepsTypes.Dependencies} Dependencies
 */

import {
  expect
} from 'chai'

import '#deps/test/debug'

import {
  getSaveProdParameter,
  getSaveDevParameter,
  getSaveOptionalParameter,
  getSaveBundleParameter,
  getRegistryParameter,
  getNoSaveParameter,
  getSaveExactParameter,
  getCommands,
  isExact,
  getDepsExact,
  getDeps,
  normalizeCommands,
  transformDependency,
  transform,
  getProdDependencies,
  getDevDependencies,
  getOptionalDependencies,
  getBundleDependencies,
  getPeerDependencies
} from '#deps/src/common'

describe('#deps/src/common', () => {
  describe('`getSaveProdParameter`', () => {
    it('is a function', () => {
      expect(getSaveProdParameter)
        .to.be.a('function')
    })
  })

  describe('`getSaveDevParameter`', () => {
    it('is a function', () => {
      expect(getSaveDevParameter)
        .to.be.a('function')
    })
  })

  describe('`getSaveOptionalParameter`', () => {
    it('is a function', () => {
      expect(getSaveOptionalParameter)
        .to.be.a('function')
    })
  })

  describe('`getSaveBundleParameter`', () => {
    it('is a function', () => {
      expect(getSaveBundleParameter)
        .to.be.a('function')
    })
  })

  describe('`getRegistryParameter`', () => {
    it('is a function', () => {
      expect(getRegistryParameter)
        .to.be.a('function')
    })
  })

  describe('`getNoSaveParameter`', () => {
    it('is a function', () => {
      expect(getNoSaveParameter)
        .to.be.a('function')
    })
  })

  describe('`getSaveExactParameter`', () => {
    it('is a function', () => {
      expect(getSaveExactParameter)
        .to.be.a('function')
    })
  })

  describe('`getCommands`', () => {
    it('is a function', () => {
      expect(getCommands)
        .to.be.a('function')
    })
  })

  describe('`getProdDependencies`', () => {
    it('is a function', () => {
      expect(getProdDependencies)
        .to.be.a('function')
    })
  })

  describe('`getDevDependencies`', () => {
    it('is a function', () => {
      expect(getDevDependencies)
        .to.be.a('function')
    })
  })

  describe('`getOptionalDependencies`', () => {
    it('is a function', () => {
      expect(getOptionalDependencies)
        .to.be.a('function')
    })
  })

  describe('`getBundleDependencies`', () => {
    it('is a function', () => {
      expect(getBundleDependencies)
        .to.be.a('function')
    })
  })

  describe('`getPeerDependencies`', () => {
    it('is a function', () => {
      expect(getPeerDependencies)
        .to.be.a('function')
    })
  })

  describe('`isExact`', () => {
    it('is a function', () => {
      expect(isExact)
        .to.be.a('function')
    })
  })

  describe('`getDepsExact`', () => {
    it('is a function', () => {
      expect(getDepsExact)
        .to.be.a('function')
    })
  })

  describe('`getDeps`', () => {
    it('is a function', () => {
      expect(getDeps)
        .to.be.a('function')
    })
  })

  describe('`normalizeCommands`', () => {
    it('is a function', () => {
      expect(normalizeCommands)
        .to.be.a('function')
    })
  })

  describe('`transformDependency`', () => {
    it('is a function', () => {
      expect(transformDependency)
        .to.be.a('function')
    })
  })

  describe('`transform`', () => {
    it('is a function', () => {
      expect(transform)
        .to.be.a('function')
    })
  })

  describe('`getSaveProdParameter()`', () => {
    it('is a function', () => {
      expect(getSaveProdParameter('MOCK COMMANDS'))
        .to.eql('MOCK COMMANDS --save-prod')
    })
  })

  describe('`getSaveDevParameter()`', () => {
    it('is a function', () => {
      expect(getSaveDevParameter('MOCK COMMANDS'))
        .to.eql('MOCK COMMANDS --save-dev')
    })
  })

  describe('`getSaveOptionalParameter()`', () => {
    it('is a function', () => {
      expect(getSaveOptionalParameter('MOCK COMMANDS'))
        .to.eql('MOCK COMMANDS --save-optional')
    })
  })

  describe('`getSaveBundleParameter()`', () => {
    it('is a function', () => {
      expect(getSaveBundleParameter('MOCK COMMANDS'))
        .to.eql('MOCK COMMANDS --save-bundle')
    })
  })

  describe('`getRegistryParameter()`', () => {
    describe('The "registry" argument is truthy', () => {
      it('returns a string', () => {
        expect(getRegistryParameter('MOCK REGISTRY', 'MOCK COMMANDS'))
          .to.eql('MOCK COMMANDS --registry MOCK REGISTRY')
      })
    })

    describe('The "registry" argument is falsy', () => {
      it('returns a string', () => {
        expect(getRegistryParameter('', 'MOCK COMMANDS'))
          .to.eql('MOCK COMMANDS')
      })
    })
  })

  describe('`getNoSaveParameter()`', () => {
    describe('The "save" argument is truthy', () => {
      it('returns a string', () => {
        expect(getNoSaveParameter(true, 'MOCK COMMANDS'))
          .to.eql('MOCK COMMANDS')
      })
    })

    describe('The "save" argument is falsy', () => {
      it('returns a string', () => {
        expect(getNoSaveParameter(false, 'MOCK COMMANDS'))
          .to.eql('MOCK COMMANDS --no-save')
      })
    })
  })

  describe('`getSaveExactParameter()`', () => {
    it('is a function', () => {
      expect(getSaveExactParameter('MOCK COMMANDS'))
        .to.eql('MOCK COMMANDS --save-exact')
    })
  })

  describe('`isExact()`', () => {
    describe('The dependency version is exact', () => {
      it('returns an array', () => {
        const dependency = '0.0.0'

        expect(isExact(dependency)) // eslint-disable-line no-unused-expressions -- Assertion
          .to.be.true
      })
    })

    describe('The dependency version is not exact', () => {
      it('returns an array', () => {
        const dependency = '^0.0.0'

        expect(isExact(dependency)) // eslint-disable-line no-unused-expressions -- Assertion
          .to.be.false
      })
    })
  })

  describe('`getDeps()`', () => {
    describe('The dependency version is exact', () => {
      it('returns an array', () => {
        const dependencies = {
          'mock-package': '0.0.0'
        }

        expect(getDeps(dependencies))
          .to.eql([])
      })
    })

    describe('The dependency version is not exact', () => {
      it('returns an array', () => {
        const dependencies = {
          'mock-package': '^0.0.0'
        }

        expect(getDeps(dependencies))
          .to.eql([
            {
              name: 'mock-package',
              version: 'latest'
            }
          ])
      })
    })
  })

  describe('`getDepsExact()`', () => {
    describe('The dependency version is exact', () => {
      describe('With configuration', () => {
        describe('The configuration version is exact', () => {
          it('returns an array', () => {
            const dependencies = {
              'mock-package': '0.0.0'
            }

            const configuration = {
              'mock-package': '1.2.3'
            }

            expect(getDepsExact(dependencies, configuration))
              .to.eql([
                {
                  name: 'mock-package',
                  version: '1.2.3'
                }
              ])
          })
        })

        describe('The configuration version is `latest`', () => {
          it('returns an array', () => {
            const dependencies = {
              'mock-package': '0.0.0'
            }

            const configuration = {
              'mock-package': 'latest'
            }

            expect(getDepsExact(dependencies, configuration))
              .to.eql([
                {
                  name: 'mock-package',
                  version: 'latest'
                }
              ])
          })
        })
      })

      describe('Without configuration', () => {
        it('returns an array', () => {
          const dependencies = {
            'mock-package': '0.0.0'
          }

          /**
           *  @type {Dependencies}
           */
          const configuration = {}

          expect(getDepsExact(dependencies, configuration))
            .to.eql([
              {
                name: 'mock-package',
                version: '0.0.0'
              }
            ])
        })
      })
    })

    describe('The dependency version is not exact', () => {
      describe('With configuration', () => {
        it('returns an array', () => {
          const dependencies = {
            'mock-package': '^0.0.0'
          }

          const configuration = {
            'mock-package': '1.2.3'
          }

          expect(getDepsExact(dependencies, configuration))
            .to.eql([])
        })
      })

      describe('Without configuration', () => {
        it('returns an array', () => {
          const dependencies = {
            'mock-package': '^0.0.0'
          }

          const configuration = {
            'mock-package': '1.2.3'
          }

          expect(getDepsExact(dependencies, configuration))
            .to.eql([])
        })
      })
    })
  })

  describe('`normalizeCommands()`', () => {
    describe('Leading and trailing whitespace around commands', () => {
      describe('A single line', () => {
        it('returns a string without leading or trailing whitespce', () => {
          expect(normalizeCommands('   commands   '))
            .to.equal('commands')
        })
      })

      describe('Multiple lines', () => {
        it('returns a string without leading or trailing whitespce', () => {
          expect(normalizeCommands('   \n   \n\n\n \n\n\n commands\n\n\n   \n\n\n commands \n   \n\n\n \n\n\n   '))
            .to.equal('commands commands')
        })
      })
    })

    describe('Whitespace between commands', () => {
      describe('A single line', () => {
        it('returns a string with single whitespace characters between commands', () => {
          expect(normalizeCommands('commands   commands commands   commands'))
            .to.equal('commands commands commands commands')
        })
      })

      describe('Multiple lines', () => {
        it('returns a string without leading or trailing whitespce', () => {
          expect(normalizeCommands('   \n   \n\n\n \n\n\n commands   commands commands   commands\n\n\n   \n\n\n commands   commands commands   commands \n   \n\n\n \n\n\n   '))
            .to.equal('commands commands commands commands commands commands commands commands')
        })
      })
    })
  })
})
