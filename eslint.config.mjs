import globals from 'globals'
import standard from '@sequencemedia/eslint-config-standard/configs/recommended/merge'

export default [
  /**
   *  Standard config
   */
  standard({
    files: [
      '**/*.{mjs,cjs}'
    ],
    ignores: [
      'src',
      'test'
    ],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }),
  standard({
    files: [
      'src/**/*.{mjs,cjs}'
    ],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  }),
  standard({
    files: [
      'test/**/*.{mjs,cjs}'
    ],
    languageOptions: {
      globals: {
        ...globals.mocha
      }
    }
  })
]
