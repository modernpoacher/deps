import debug from 'debug'

import { expect } from 'chai'

import {
  getDepsExact,
  getDeps,
  transform,
  transformDependency,
  isExact,
  getProdDependencies,
  getDevDependencies,
  getOptionalDependencies,
  getBundleDependencies,
  getPeerDependencies
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
      return expect(getDepsExact)
        .to.be.a('function')
    })
  })

  describe('`getDeps`', () => {
    it('is a function', () => {
      return expect(getDeps)
        .to.be.a('function')
    })
  })

  describe('`transform`', () => {
    it('is a function', () => {
      return expect(transform)
        .to.be.a('function')
    })
  })

  describe('`transformDependency`', () => {
    it('is a function', () => {
      return expect(transformDependency)
        .to.be.a('function')
    })
  })

  describe('`isExact`', () => {
    it('is a function', () => {
      return expect(isExact)
        .to.be.a('function')
    })
  })

  describe('`getProdDependencies`', () => {
    it('is a function', () => {
      return expect(getProdDependencies)
        .to.be.a('function')
    })
  })

  describe('`getDevDependencies`', () => {
    it('is a function', () => {
      return expect(getDevDependencies)
        .to.be.a('function')
    })
  })

  describe('`getOptionalDependencies`', () => {
    it('is a function', () => {
      return expect(getOptionalDependencies)
        .to.be.a('function')
    })
  })

  describe('`getBundleDependencies`', () => {
    it('is a function', () => {
      return expect(getBundleDependencies)
        .to.be.a('function')
    })
  })

  describe('`getPeerDependencies`', () => {
    it('is a function', () => {
      return expect(getPeerDependencies)
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

          return expect(getDepsExact(dependencies, configuration))
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

          return expect(getDepsExact(dependencies, configuration))
            .to.eql([])
        })
      })
    })
  })
})
