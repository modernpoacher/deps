import debug from 'debug'

import {
  expect
} from 'chai'

import {
  getOptions
} from '#deps/src/common/options'

describe('#deps/src/common/options', () => {
  before(() => {
    const {
      env: {
        DEBUG
      }
    } = process

    if (DEBUG) debug.enable(DEBUG)
  })

  describe('`getOptions`', () => {
    it('is a function', () => {
      return expect(getOptions)
        .to.be.a('function')
    })
  })
})
