const debug = require('debug')

const log = debug('@modernpoacher/deps')

const {
  env: {
    NODE_ENV = 'development'
  }
} = process

log('`@modernpoacher/deps` is awake')

function env () {
  log({ NODE_ENV })

  return (
    NODE_ENV === 'production'
  )
}

const presets = [
  [
    '@babel/env',
    {
      targets: {
        node: 'current'
      },
      useBuiltIns: 'usage',
      corejs: 3
    }
  ]
]

const plugins = []

module.exports = (api) => {
  if (api) api.cache.using(env)

  return {
    presets,
    plugins
  }
}
