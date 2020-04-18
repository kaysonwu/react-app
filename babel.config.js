module.exports = ({ caller }) => {
  const name = caller(c => c && c.name);
  const env = { modules: 'commonjs', targets: { node: true } };
  const plugins = []; 

  switch (name) {
    case 'babel-loader': // For webpack
      const SSR = caller(c => c && c.SSR);
      const WEB = caller(c => c && c.target === 'web');

      plugins.push(
        ['preprocessor', { symbols: { SSR, WEB } }],
        ['import', { libraryName: 'antd', style: WEB }],
      );

      if (SSR) {
        plugins.push('@loadable/babel-plugin');
      }

      env.modules = false;

      if (WEB) {
        env.targets = { ie: 9 };
      }

      break;
    case 'node-server':
      plugins.unshift(['preprocessor', { symbols: { NODE_SERVER: true } }]);
      break;
  }

  return {
    presets: [
      '@babel/preset-react',
      '@babel/preset-typescript',
      ['@babel/preset-env', env],
    ],
    plugins: [
      // Preprocessor will delete some irrelevant code, so it should be executed at the front.
      ...plugins,
      '@babel/plugin-proposal-class-properties',
      ['module-resolver', {
        alias: {
          '@': './src/',
        },
      }],
    ],
  };
}
