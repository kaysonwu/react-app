/* eslint-disable no-case-declarations */
module.exports = ({ caller }) => {
  const target = caller(c => c && c.target);
  const name = caller(c => c && c.name);

  const SSR = caller(c => c && c.ssr);
  const IS_BROWSER = target === 'web';

  return {
    presets: [
      '@babel/preset-react',
      '@babel/preset-typescript',
      ['@babel/preset-env', {
        modules: name === 'babel-loader' ? false : 'commonjs',
        targets: IS_BROWSER ? undefined : { node: true },
      }],
    ],
    plugins: [
      // Preprocessor will delete some irrelevant code, so it should be executed at the front.
      ['preprocessor', {
        symbols: {
          SSR,
          IS_BROWSER,
          IS_NODE: target === 'node',
        },
      }],
     // ['@babel/plugin-transform-modules-commonjs', { importInterop: 'node', loose: true }],
      ['module-resolver', {
        alias: {
          '@': './src/',
        },
      }],
      '@loadable/babel-plugin',
    ],
  };
};
