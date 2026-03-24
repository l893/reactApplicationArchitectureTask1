import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  // FSD-like boundaries (lightweight, no extra libs)
  {
    files: ['src/shared/**/*.{js,jsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            '**/app/**',
            '**/pages/**',
            '**/widgets/**',
            '**/entities/**',
            '**/features/**',
            '@app/**',
            '@pages/**',
            '@widgets/**',
            '@entities/**',
            '@features/**',
          ],
        },
      ],
    },
  },
  {
    files: ['src/entities/**/*.{js,jsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            '**/app/**',
            '**/pages/**',
            '**/widgets/**',
            '**/features/**',
            '@app/**',
            '@pages/**',
            '@widgets/**',
            '@entities/**',
            '@features/**',
          ],
        },
      ],
    },
  },
  {
    files: ['src/features/**/*.{js,jsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            '**/app/**',
            '**/pages/**',
            '**/widgets/**',
            '@app/**',
            '@pages/**',
            '@widgets/**',
          ],
        },
      ],
    },
  },
  {
    files: ['src/widgets/**/*.{js,jsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: ['**/app/**', '**/pages/**', '@app/**', '@pages/**'],
        },
      ],
    },
  },
  {
    files: ['src/pages/**/*.{js,jsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: ['**/app/**', '@app/**'],
        },
      ],
    },
  },
];
