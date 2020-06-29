import debug from 'debug'

import { expect } from 'chai'

import {
  getDepsExact,
  getDeps,
  transform,
  getProdDependencies,
  getDevDependencies,
  getOptionalDependencies,
  getBundleDependencies,
  getPeerDependencies,
  isExact,
  getDependency
} from '@modernpoacher/deps/common'

describe('@modernpoacher/deps/common', () => {
  before(() => {
    const {
      env: {
        DEBUG
      }
    } = process

    if (DEBUG) debug.enable(DEBUG)
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

  describe('`transform`', () => {
    it('is a function', () => {
      expect(transform)
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

  describe('`getDependency`', () => {
    it('is a function', () => {
      expect(getDependency)
        .to.be.a('function')
    })
  })

  describe('`getDeps()`', () => {
    describe('The dependency version is exact', () => {
      it('returns an array', () => {
        const dependencies = {
          'mock-package': '0.0.0'
        }

        return expect(getDeps(dependencies))
          .to.eql([])
      })
    })

    describe('The dependency version is not exact', () => {
      it('returns an array', () => {
        const dependencies = {
          'mock-package': '^0.0.0'
        }

        return expect(getDeps(dependencies))
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

            return expect(getDepsExact(dependencies, configuration))
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

            return expect(getDepsExact(dependencies, configuration))
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

          const configuration = {}

          return expect(getDepsExact(dependencies, configuration))
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
})
