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
    'global-require': 'off',
    'no-restricted-syntax': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'no-shadow': 'off',
    'generator-star-spacing': ['error', {
      before: false,
      after: true,
      method: 'before',
    }],
    'object-curly-newline': ['error', {
      ObjectPattern: { multiline: true },
    }],
    'quote-props': ['error', 'consistent'],
    'import/no-unresolved': ['error', {
      commonjs: false,
      // 忽略模块别名以解除 import/no-unresolved 误报，当然还可以使用 import/resolver
      // https://github.com/benmosher/eslint-plugin-import/blob/v2.20.2/README.md#resolvers
      ignore: ['^@/*', '^\.+/*'],
    }],
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': ['error', { 
      devDependencies: true,
    }],
    'jsx-a11y/click-events-have-key-events': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-filename-extension': ['error', { 
      extensions: ['.tsx'],
    }],
  },
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        'react/prop-types': 'off',
        'react/function-component-definition': ['error', { 
          namedComponents: 'arrow-function', 
          unnamedComponents: 'arrow-function', 
        }],
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/prefer-includes': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/no-extra-parens': ['error', 'all', {
          ignoreJSX: 'all',
          nestedBinaryExpressions: false,
          enforceForArrowConditionals: false,
        }],
      },
    },
  ],
};
