import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import svelteParser from 'svelte-eslint-parser';

export default [
  js.configs.recommended,
  ...typescriptEslint.configs['flat/recommended'],
  ...svelte.configs['flat/recommended'],
  prettier,
  ...svelte.configs['flat/prettier'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    rules: {
      semi: ['error', 'always'],
    },
  },
  {
    files: ['**/*.svelte'],

    languageOptions: {
      parser: svelteParser,

      parserOptions: {
        parser: tsParser,
      },
    },
  },
];
