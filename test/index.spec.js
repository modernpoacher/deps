
import debug from 'debug'

import { expect } from 'chai'

import {
  getInstallSaveProdCommands,
  getInstallSaveDevCommands,
  getInstallSaveOptionalCommands,
  getInstallSaveBundleCommands,
  installSaveProdExact,
  installSaveProd,
  installSaveDevExact,
  installSaveDev,
  installSaveOptionalExact,
  installSaveOptional,
  installSaveBundleExact,
  installSaveBundle,
  executeProd,
  executeDev,
  executeOptional,
  executeBundle,
  getInstallCommands
} from '@modernpoacher/deps'

describe('@modernpoacher/deps', () => {
  before(() => {
    const {
      env: {
        DEBUG
      }
    } = process

    if (DEBUG) debug.enable(DEBUG)
  })

  describe('`getInstallSaveProdCommands`', () => {
    it('is a function', () => {
      return expect(getInstallSaveProdCommands)
        .to.be.a('function')
    })
  })

  describe('`getInstallSaveDevCommands`', () => {
    it('is a function', () => {
      return expect(getInstallSaveDevCommands)
        .to.be.a('function')
    })
  })

  describe('`getInstallSaveOptionalCommands`', () => {
    it('is a function', () => {
      return expect(getInstallSaveOptionalCommands)
        .to.be.a('function')
    })
  })

  describe('`getInstallSaveBundleCommands`', () => {
    it('is a function', () => {
      return expect(getInstallSaveBundleCommands)
        .to.be.a('function')
    })
  })

  describe('`installSaveProdExact`', () => {
    it('is a function', () => {
      return expect(installSaveProdExact)
        .to.be.a('function')
    })
  })

  describe('`installSaveProd`', () => {
    it('is a function', () => {
      return expect(installSaveProd)
        .to.be.a('function')
    })
  })

  describe('`installSaveDevExact`', () => {
    it('is a function', () => {
      return expect(installSaveDevExact)
        .to.be.a('function')
    })
  })

  describe('`installSaveDev`', () => {
    it('is a function', () => {
      return expect(installSaveDev)
        .to.be.a('function')
    })
  })

  describe('`installSaveOptionalExact`', () => {
    it('is a function', () => {
      return expect(installSaveOptionalExact)
        .to.be.a('function')
    })
  })

  describe('`installSaveOptional`', () => {
    it('is a function', () => {
      return expect(installSaveOptional)
        .to.be.a('function')
    })
  })

  describe('`installSaveBundleExact`', () => {
    it('is a function', () => {
      return expect(installSaveBundleExact)
        .to.be.a('function')
    })
  })

  describe('`installSaveBundle`', () => {
    it('is a function', () => {
      return expect(installSaveBundle)
        .to.be.a('function')
    })
  })

  describe('`getInstallCommands`', () => {
    it('is a function', () => {
      return expect(getInstallCommands)
        .to.be.a('function')
    })
  })

  describe('`executeProd`', () => {
    it('is a function', () => {
      return expect(executeProd)
        .to.be.a('function')
    })
  })

  describe('`executeDev`', () => {
    it('is a function', () => {
      return expect(executeDev)
        .to.be.a('function')
    })
  })

  describe('`executeOptional`', () => {
    it('is an function', () => {
      return expect(executeOptional)
        .to.be.a('function')
    })
  })

  describe('`executeBundle`', () => {
    it('is an function', () => {
      return expect(executeBundle)
        .to.be.a('function')
    })
  })
})
