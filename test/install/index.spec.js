import debug from 'debug'

import { expect } from 'chai'

import {
  installExact,
  install,
  execute,
  getCommands
} from '@modernpoacher/deps/install'

describe('@modernpoacher/deps/install', () => {
  before(() => {
    const {
      env: {
        DEBUG
      }
    } = process

    if (DEBUG) debug.enable(DEBUG)
  })

  describe('`installExact`', () => {
    it('is a function', () => {
      expect(installExact)
        .to.be.a('function')
    })
  })

  describe('`install`', () => {
    it('is a function', () => {
      expect(install)
        .to.be.a('function')
    })
  })

  describe('`getCommands`', () => {
    it('is a function', () => {
      expect(getCommands)
        .to.be.a('function')
    })
  })

  describe('`execute`', () => {
    it('is an function', () => {
      expect(execute)
        .to.be.a('function')
    })
  })
})
