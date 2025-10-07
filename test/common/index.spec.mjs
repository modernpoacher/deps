/**
 *  @typedef {DepsTypes.Dependencies} Dependencies
 */

import {
  expect
} from 'chai'

import '#deps/test/debug'

import {
  AUTHOR,
  DIRECTORY,
  REGISTRY,
  getCommands,
  getDepsExact,
  getDeps,
  getAuthor,
  getName,
  getEmail,
  getIgnore,
  getMessage,
  getNvm,
  getBin,
  getProdDependencies,
  getDevDependencies,
  getOptionalDependencies,
  getBundleDependencies,
  getPeerDependencies,
  getForceParameter,
  getRegistryParameter,
  getSaveProdParameter,
  getSaveDevParameter,
  getSaveOptionalParameter,
  getSaveBundleParameter,
  getSaveExactParameter,
  getNoSaveParameter,
  isExact,
  isPreRelease,
  normalizeCommands,
  transform,
  transformDependency
} from '#deps/src/common'

describe('#deps/src/common', () => {
  describe('`AUTHOR`', () => {
    it('is a function', () => {
      expect(AUTHOR)
        .to.be.a('string')
    })
  })

  describe('`DIRECTORY`', () => {
    it('is a function', () => {
      expect(DIRECTORY)
        .to.be.a('string')
    })
  })

  describe('`REGISTRY`', () => {
    it('is a function', () => {
      expect(REGISTRY)
        .to.be.a('string')
    })
  })

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

  describe('`getSaveExactParameter`', () => {
    it('is a function', () => {
      expect(getSaveExactParameter)
        .to.be.a('function')
    })
  })

  describe('`getNoSaveParameter`', () => {
    it('is a function', () => {
      expect(getNoSaveParameter)
        .to.be.a('function')
    })
  })

  describe('`getForceParameter`', () => {
    it('is a function', () => {
      expect(getForceParameter)
        .to.be.a('function')
    })
  })

  describe('`getRegistryParameter`', () => {
    it('is a function', () => {
      expect(getRegistryParameter)
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

  describe('`isPreRelease`', () => {
    it('is a function', () => {
      expect(isPreRelease)
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

  describe('`getAuthor`', () => {
    it('is a function', () => {
      expect(getAuthor)
        .to.be.a('function')
    })
  })

  describe('`getName`', () => {
    it('is a function', () => {
      expect(getName)
        .to.be.a('function')
    })
  })

  describe('`getEmail`', () => {
    it('is a function', () => {
      expect(getEmail)
        .to.be.a('function')
    })
  })

  describe('`getIgnore`', () => {
    it('is a function', () => {
      expect(getIgnore)
        .to.be.a('function')
    })
  })

  describe('`getMessage`', () => {
    it('is a function', () => {
      expect(getMessage)
        .to.be.a('function')
    })
  })

  describe('`getNvm`', () => {
    it('is a function', () => {
      expect(getNvm)
        .to.be.a('function')
    })
  })

  describe('`getBin`', () => {
    it('is a function', () => {
      expect(getBin)
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

  describe('`isPreRelease()`', () => {
    describe('The dependency version is pre-release', () => {
      it('returns an array', () => {
        const dependency = '0-0'

        expect(isPreRelease(dependency)) // eslint-disable-line no-unused-expressions -- Assertion
          .to.be.true
      })
    })

    describe('The dependency version is not exact', () => {
      it('returns an array', () => {
        const dependency = '0.0.0'

        expect(isPreRelease(dependency)) // eslint-disable-line no-unused-expressions -- Assertion
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

  describe('`getAuthor()`', () => {
    describe('The dependency author is a string', () => {
      it('returns a string', () => {
        const dependencies = {
          author: 'author'
        }

        expect(getAuthor(dependencies))
          .to.be.a('string')
      })
    })

    describe('The dependency author is an object', () => {
      it('returns a string', () => {
        const dependencies = {
          author: {
            name: 'name',
            email: 'email'
          }
        }

        expect(getAuthor(dependencies))
          .to.be.a('string')
      })
    })
  })

  describe('`getName()`', () => {
    describe('The author name is a string', () => {
      it('returns a string', () => {
        const author = {
          name: 'name'
        }

        expect(getName(author))
          .to.be.a('string')
      })
    })
  })

  describe('`getEmail()`', () => {
    describe('The author email is a string', () => {
      it('returns a string', () => {
        const author = {
          email: 'email'
        }

        expect(getEmail(author))
          .to.be.a('string')
      })
    })
  })

  describe('`getIgnore()`', () => {
    describe('The dependency ignore is true', () => {
      it('returns true', () => {
        const dependencies = {
          ignore: true
        }

        expect(getIgnore(dependencies)) // eslint-disable-line no-unused-expressions -- Assertion
          .to.be.true
      })
    })

    describe('The dependency ignore is false', () => {
      it('returns a boolean', () => {
        const dependencies = {
          ignore: false
        }

        expect(getIgnore(dependencies)) // eslint-disable-line no-unused-expressions -- Assertion
          .to.be.false
      })
    })
  })

  describe('`getMessage()`', () => {
    describe('The dependency message is a string', () => {
      it('returns a string', () => {
        const dependencies = {
          message: 'message'
        }

        expect(getMessage(dependencies))
          .to.be.a('string')
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
