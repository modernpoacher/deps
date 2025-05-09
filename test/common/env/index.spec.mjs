import {
  expect
} from 'chai'

import '#deps/test/debug'

import {
  NAME,
  VERSION,
  PLATFORM
} from '#deps/src/common/env'

describe('#deps/src/common/env', () => {
  describe('`NAME`', () => {
    it('is a string', () => {
      expect(NAME)
        .to.be.a('string')
    })
  })

  describe('`VERSION`', () => {
    it('is a string', () => {
      expect(VERSION)
        .to.be.a('string')
    })
  })

  describe('`PLATFORM`', () => {
    it('is a string', () => {
      expect(PLATFORM)
        .to.be.a('string')
    })
  })
})
