const debug = require('debug')

const log = debug('@modernpoacher/deps')

const {
  env: {
    DEBUG = '@modernpoacher/deps',
    NODE_ENV = 'development'
  }
} = process

debug.enable(DEBUG)

log('`@modernpoacher/deps` is awake')

const presets = [
  [
    '@babel/env',
    {
      useBuiltIns: 'usage',
      targets: {
        node: 'current'
      },
      corejs: 3
    }
  ]
]

const plugins = [
  'syntax-async-functions'
]

function using () {
  log({ NODE_ENV })

  return NODE_ENV === 'production'
}

module.exports = (api) => {
  if (api) api.cache.using(using)

  return {
    compact: true,
    comments: false,
    presets,
    plugins
  }
}
