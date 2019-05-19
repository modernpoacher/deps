const presets = [
  [
    '@babel/env',
    {
      useBuiltIns: 'usage',
      targets: {
        node: 'current'
      },
      corejs: '3.0.1'
    }
  ]
]

const plugins = [
  'syntax-async-functions'
]

module.exports = {
  compact: true,
  comments: false,
  presets,
  plugins
}
