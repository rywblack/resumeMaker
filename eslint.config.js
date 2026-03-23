import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import { globalIgnores } from 'eslint/config'

export default [
  globalIgnores(['.next', 'node_modules']),
  js.configs.recommended,
  reactHooks.configs['recommended-latest'],
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
  },
]
