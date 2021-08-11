/* eslint-disable no-case-declarations */
module.exports = ({ caller }) => {
  const target = caller(c => c && c.target);
  const name = caller(c => c && c.name);

  const SSR = caller(c => c && c.ssr);
  const IS_BROWSER = target === 'web';

  const config = {
    presets: [
      '@babel/preset-react',
      '@babel/preset-typescript',
      ['@babel/preset-env', {
        modules: name === 'babel-loader' ? false : 'commonjs',
        targets: IS_BROWSER ? undefined : { node: true },
      }],
    ],
    plugins: [
     // ['@babel/plugin-transform-modules-commonjs', { importInterop: 'node', loose: true }],
      ['module-resolver', {
        alias: {
          '@': './src/',
        },
      }],
      '@loadable/babel-plugin',
    ],
  };

  if (name !== 'babel-jest') {
    // Preprocessor will delete some irrelevant code, so it should be executed at the front.
    config.plugins.unshift(['preprocessor', {
      symbols: {
        SSR,
        IS_BROWSER,
        IS_NODE: target === 'node',
      },
    }]);
  }

  return config;
};
