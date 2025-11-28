import globals from 'globals'
import jsdoc from 'eslint-plugin-jsdoc'
import merge from '@sequencemedia/eslint-merge'
import standard from '@sequencemedia/eslint-config-standard/configs/recommended/merge'
import typescript from '@sequencemedia/eslint-config-typescript/configs/recommended/merge'
import typescriptParser from '@typescript-eslint/parser'

export default [
  merge(
    jsdoc.configs['flat/recommended'],
    {
      languageOptions: {
        globals: {
          DepsTypes: 'readonly'
        }
      },
      rules: {
        'jsdoc/require-param-description': 'off',
        'jsdoc/require-returns-description': 'off' /* ,
        'jsdoc/tag-lines': 'off' */
      }
    }
  ),
  /**
   *  Standard config
   */
  standard({
    files: [
      '**/*.{mjs,cjs,mts,cts}'
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
      'src/**/*.{mjs,cjs,mts,cts}'
    ],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  }),
  standard({
    files: [
      'test/**/*.{mjs,cjs,mts,cts}'
    ],
    languageOptions: {
      globals: {
        ...globals.mocha
      }
    }
  }),
  /**
   *  TypeScript config
   */
  typescript({
    files: [
      '**/*.{mts,cts}'
    ],
    ignores: [
      'src',
      'test'
    ],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        projectService: true
      },
      globals: {
        ...globals.node,
        DepsTypes: 'readonly',
        NodeJS: 'readonly'
      }
    }
  }),
  typescript({
    files: [
      'src/**/*.{mts,cts}',
      'test/**/*.{mts,cts}'
    ],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        projectService: true
      },
      globals: {
        ...globals.browser,
        DepsTypes: 'readonly',
        NodeJS: 'readonly'
      }
    }
  })
]
