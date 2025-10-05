import {
  expect
} from 'chai'

import '#deps/test/debug'

import {
  OPTIONS,
  getOptions
} from '#deps/src/common/options'

describe('#deps/src/common/options', () => {
  describe('`OPTIONS`', () => {
    it('is a function', () => {
      expect(OPTIONS)
        .to.be.an('object')
    })
  })

  describe('`getOptions`', () => {
    it('is a function', () => {
      expect(getOptions)
        .to.be.a('function')
    })
  })
})
