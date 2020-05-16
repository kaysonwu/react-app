module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'react/jsx-filename-extension': ['error', { 
      extensions: ['.tsx'],
    }],
    'import/no-extraneous-dependencies': ['error', { 
      devDependencies: true,
    }],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        'arrow-parens': ['error', 'as-needed'],
        'react/prop-types': 'off',
        'react/function-component-definition': ['error', { 
          namedComponents: 'arrow-function', 
          unnamedComponents: 'arrow-function' 
        }],
        '@typescript-eslint/prefer-includes': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/no-extra-parens': 'error',
      },
    },
  ],
};
