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
      useBuiltIns: 'usage',
      targets: {
        node: '12.18.1'
      },
      corejs: 3
    }
  ]
]

const plugins = [
  'syntax-async-functions'
]

module.exports = (api) => {
  if (api) api.cache.using(env)

  return {
    compact: true,
    comments: false,
    presets,
    plugins
  }
}
