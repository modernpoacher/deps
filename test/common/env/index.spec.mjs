import {
  expect
} from 'chai'

import '#deps/test/debug'

import {
  NAME,
  VERSION,
  PLATFORM,
  NVM,
  BIN,
  HOME
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

  describe('`NVM`', () => {
    it('is a string', () => {
      expect(NVM)
        .to.be.a('string')
    })
  })

  describe('`BIN`', () => {
    it('is a string', () => {
      expect(BIN)
        .to.be.a('string')
    })
  })

  describe('`HOME`', () => {
    it('is a string', () => {
      expect(HOME)
        .to.be.a('string')
    })
  })
})
