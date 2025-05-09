import {
  expect
} from 'chai'

import '#deps/test/debug'

import {
  getOptions
} from '#deps/src/common/options'

describe('#deps/src/common/options', () => {
  describe('`getOptions`', () => {
    it('is a function', () => {
      expect(getOptions)
        .to.be.a('function')
    })
  })
})
