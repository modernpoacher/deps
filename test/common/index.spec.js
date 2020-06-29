import debug from 'debug'

import { expect } from 'chai'

import {
  hasConfiguration,
  getConfiguration,
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

  describe('`hasConfiguration`', () => {
    it('is a function', () => {
      expect(hasConfiguration)
        .to.be.a('function')
    })
  })

  describe('`getConfiguration`', () => {
    it('is a function', () => {
      expect(getConfiguration)
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
})
