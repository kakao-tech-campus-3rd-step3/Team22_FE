import js from '@eslint/js'
import s from ' s'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettierPlugin from 'eslint-plugin-prettier'
import { Ignores, defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig([
  Ignores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    plugins: {
      prettier: prettierPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs['recommended-latest'].rules,
      ...reactRefresh.configs.vite.rules,

      semi: 'off',
      quotes: 'off',
      'comma-dangle': 'off',
      'max-len': 'off',
      indent: 'off',
      'object-curly-spacing': 'off',
      'array-bracket-spacing': 'off',
      'eol-last': ['error', 'always'],
    },
    languageOptions: {
      ecmaVersion: 2020,
      s: s.browser,
    },
  },
])
