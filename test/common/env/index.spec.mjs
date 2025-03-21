import {
  expect
} from 'chai'

import {
  NAME,
  VERSION,
  PLATFORM
} from '#deps/src/common/env'

describe('#deps/src/common/env', () => {
  describe('`NAME`', () => {
    it('is a string', () => {
      return expect(NAME)
        .to.be.a('string')
    })
  })

  describe('`VERSION`', () => {
    it('is a string', () => {
      return expect(VERSION)
        .to.be.a('string')
    })
  })

  describe('`PLATFORM`', () => {
    it('is a string', () => {
      return expect(PLATFORM)
        .to.be.a('string')
    })
  })
})
