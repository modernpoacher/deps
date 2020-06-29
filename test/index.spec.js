
import debug from 'debug'

import { expect } from 'chai'

import {
  getSaveBundleCommands,
  getSaveOptionalCommands,
  getSaveDevCommands,
  getSaveProdCommands,
  installSaveBundleExact,
  installSaveBundle,
  installSaveOptionalExact,
  installSaveOptional,
  installSaveDevExact,
  installSaveDev,
  installSaveProdExact,
  installSaveProd,
  executeEachBundle,
  executeEachOptional,
  executeEachDev,
  executeEach,
  executeProd,
  executeDev,
  executeOptional,
  executeBundle,
  getCommands
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

  describe('`getSaveBundleCommands`', () => {
    it('is a function', () => {
      expect(getSaveBundleCommands)
        .to.be.a('function')
    })
  })

  describe('`getSaveOptionalCommands`', () => {
    it('is a function', () => {
      expect(getSaveOptionalCommands)
        .to.be.a('function')
    })
  })

  describe('`getSaveDevCommands`', () => {
    it('is a function', () => {
      expect(getSaveDevCommands)
        .to.be.a('function')
    })
  })

  describe('`getSaveProdCommands`', () => {
    it('is a function', () => {
      expect(getSaveProdCommands)
        .to.be.a('function')
    })
  })

  describe('`installSaveBundleExact`', () => {
    it('is a function', () => {
      expect(installSaveBundleExact)
        .to.be.a('function')
    })
  })

  describe('`installSaveBundle`', () => {
    it('is a function', () => {
      expect(installSaveBundle)
        .to.be.a('function')
    })
  })

  describe('`installSaveOptionalExact`', () => {
    it('is a function', () => {
      expect(installSaveOptionalExact)
        .to.be.a('function')
    })
  })

  describe('`installSaveOptional`', () => {
    it('is a function', () => {
      expect(installSaveOptional)
        .to.be.a('function')
    })
  })

  describe('`installSaveDevExact`', () => {
    it('is a function', () => {
      expect(installSaveDevExact)
        .to.be.a('function')
    })
  })

  describe('`installSaveDev`', () => {
    it('is a function', () => {
      expect(installSaveDev)
        .to.be.a('function')
    })
  })

  describe('`installSaveProdExact`', () => {
    it('is a function', () => {
      expect(installSaveProdExact)
        .to.be.a('function')
    })
  })

  describe('`installSaveProd`', () => {
    it('is a function', () => {
      expect(installSaveProd)
        .to.be.a('function')
    })
  })

  describe('`executeEachBundle`', () => {
    it('is a function', () => {
      expect(executeEachBundle)
        .to.be.a('function')
    })
  })

  describe('`executeEachOptional`', () => {
    it('is a function', () => {
      expect(executeEachOptional)
        .to.be.a('function')
    })
  })

  describe('`executeEachDev`', () => {
    it('is a function', () => {
      expect(executeEachDev)
        .to.be.a('function')
    })
  })

  describe('`executeEach`', () => {
    it('is a function', () => {
      expect(executeEach)
        .to.be.a('function')
    })
  })

  describe('`getCommands`', () => {
    it('is a function', () => {
      expect(getCommands)
        .to.be.a('function')
    })
  })

  describe('`executeProd`', () => {
    it('is a function', () => {
      expect(executeProd)
        .to.be.a('function')
    })
  })

  describe('`executeDev`', () => {
    it('is a function', () => {
      expect(executeDev)
        .to.be.a('function')
    })
  })

  describe('`executeOptional`', () => {
    it('is an function', () => {
      expect(executeOptional)
        .to.be.a('function')
    })
  })

  describe('`executeBundle`', () => {
    it('is an function', () => {
      expect(executeBundle)
        .to.be.a('function')
    })
  })
})
