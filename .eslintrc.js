const path = require('path');

module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'prettier/react',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: ['./tsconfig.json'],
    createDefaultProgram: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'import', 'prettier', 'react', 'react-hooks'],
  rules: {
    curly: ['error', 'all'],
    quotes: ['error', 'single'],
    'no-alert': 'error',
    'no-console': 'error',
    'no-redeclare': 'error',
    'no-var': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
      },
    ],
    'import/default': 'off',
    'import/no-named-as-default': 'off',
    'no-template-curly-in-string': 'error',
    'prefer-destructuring': 'error',
    'prefer-const': 'error',
    'prefer-arrow-callback': 'error',
    'prettier/prettier': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-no-target-blank': 'off',
    'react/prefer-stateless-function': 'error',
    'react/display-name': 'off',
    semi: 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/camelcase': 'off',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    // 'import/resolver': {
    //   typescript: {
    //     directory: path.resolve('./tsconfig.json'),
    //   }
    // },
    'import/resolver': 'webpack',
    'import/external-module-folders': ['node_modules', 'node_modules/@types'],
  },
};
