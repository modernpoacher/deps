import debug from 'debug'

import { expect } from 'chai'

import {
  getInstallSaveExactCommands,
  getInstallCommands,
  installSaveExact,
  install,
  execute
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

  describe('`getInstallSaveExactCommands`', () => {
    it('is a function', () => {
      return expect(getInstallSaveExactCommands)
        .to.be.a('function')
    })
  })

  describe('`getInstallCommands`', () => {
    it('is a function', () => {
      return expect(getInstallCommands)
        .to.be.a('function')
    })
  })

  describe('`installSaveExact`', () => {
    it('is a function', () => {
      return expect(installSaveExact)
        .to.be.a('function')
    })
  })

  describe('`install`', () => {
    it('is a function', () => {
      return expect(install)
        .to.be.a('function')
    })
  })

  describe('`execute`', () => {
    it('is an function', () => {
      return expect(execute)
        .to.be.a('function')
    })
  })
})
