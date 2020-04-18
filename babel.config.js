module.exports = ({ caller }) => {
  const webpack = caller(c => c && c.name === 'babel-loader');
  const NODE_SERVER = caller(c => c && c.name === 'node-server');
  const WEB = caller(c => c && c.target === 'web');
  const SSR = caller(c => c && !!c.SSR);
  const plugins = [];

  if (webpack) {
    // antd load on demand.
    plugins.push(['import', { libraryName: 'antd', style: WEB }]);

    if (SSR) {
      plugins.push('@loadable/babel-plugin');
    }
  }

  return {
    presets: [
      '@babel/preset-react',
      '@babel/preset-typescript',
      ['@babel/preset-env', {
        modules: webpack ? false : 'commonjs',
        targets: webpack && WEB ? { ie: 9 } : { node: true },
      }],
    ],
    plugins: [
      // Preprocessor will delete some irrelevant code, so it should be executed at the front.
      ['preprocessor', {
        symbols: {
          SSR,
          WEB,
          NODE_SERVER,
        },
      }],
      '@babel/plugin-proposal-class-properties',
      ...plugins,
    ],
  };
}
