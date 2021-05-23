import debug from 'debug'

import { expect } from 'chai'

import {
  getInstallSaveProdSaveExactCommands,
  getInstallSaveProdCommands,
  getInstallSaveDevSaveExactCommands,
  getInstallSaveDevCommands,
  getInstallSaveOptionalSaveExactCommands,
  getInstallSaveOptionalCommands,
  getInstallSaveBundleSaveExactCommands,
  getInstallSaveBundleCommands,
  getInstallSaveExactCommands,
  getInstallCommands,
  installSaveProdSaveExact,
  installSaveProd,
  installSaveDevSaveExact,
  installSaveDev,
  installSaveOptionalSaveExact,
  installSaveOptional,
  installSaveBundleSaveExact,
  installSaveBundle,
  executeProd,
  executeDev,
  executeOptional,
  executeBundle
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

  describe('`getInstallSaveProdSaveExactCommands`', () => {
    it('is a function', () => {
      return expect(getInstallSaveProdSaveExactCommands)
        .to.be.a('function')
    })
  })

  describe('`getInstallSaveDevSaveExactCommands`', () => {
    it('is a function', () => {
      return expect(getInstallSaveDevSaveExactCommands)
        .to.be.a('function')
    })
  })

  describe('`getInstallSaveOptionalSaveExactCommands`', () => {
    it('is a function', () => {
      return expect(getInstallSaveOptionalSaveExactCommands)
        .to.be.a('function')
    })
  })

  describe('`getInstallSaveBundleSaveExactCommands`', () => {
    it('is a function', () => {
      return expect(getInstallSaveBundleSaveExactCommands)
        .to.be.a('function')
    })
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

  describe('`installSaveProdSaveExact`', () => {
    it('is a function', () => {
      return expect(installSaveProdSaveExact)
        .to.be.a('function')
    })
  })

  describe('`installSaveProd`', () => {
    it('is a function', () => {
      return expect(installSaveProd)
        .to.be.a('function')
    })
  })

  describe('`installSaveDevSaveExact`', () => {
    it('is a function', () => {
      return expect(installSaveDevSaveExact)
        .to.be.a('function')
    })
  })

  describe('`installSaveDev`', () => {
    it('is a function', () => {
      return expect(installSaveDev)
        .to.be.a('function')
    })
  })

  describe('`installSaveOptionalSaveExact`', () => {
    it('is a function', () => {
      return expect(installSaveOptionalSaveExact)
        .to.be.a('function')
    })
  })

  describe('`installSaveOptional`', () => {
    it('is a function', () => {
      return expect(installSaveOptional)
        .to.be.a('function')
    })
  })

  describe('`installSaveBundleSaveExact`', () => {
    it('is a function', () => {
      return expect(installSaveBundleSaveExact)
        .to.be.a('function')
    })
  })

  describe('`installSaveBundle`', () => {
    it('is a function', () => {
      return expect(installSaveBundle)
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
