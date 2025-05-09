import debug from 'debug'

const {
  env: {
    DEBUG = '@modernpoacher/deps:test*'
  }
} = process

if (DEBUG) debug.enable(DEBUG)

export default debug
