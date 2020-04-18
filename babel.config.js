function isWeb(caller) {
  return caller && caller.target === 'web';
}

module.exports = ({ caller }) => {
  const name = caller(c => c && c.name);
  const env = { modules: 'commonjs', targets: { node: true } };
  const symbols = { SSR: false, WEB: caller(isWeb) };
  const plugins = [];

  switch (name) {
    case 'babel-loader': // For webpack
      // antd load on demand.
      plugins.push(['import', { libraryName: 'antd', style: web }]);

      if (caller(c => c && c.SSR)) {
        symbols.SSR = true;
        plugins.push('@loadable/babel-plugin');
      }

      env.modules = false;

      if (symbols.WEB) {
        env.targets = { ie: 9 };
      }

      break;
    case 'babel-jest': // For jest
      symbols.WEB = symbols.NODE_SERVER = true;
      break;  
    default: // For @babel/core or other
      symbols.NODE_SERVER = name === 'node-server';
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
      ['preprocessor', { symbols }],
      '@babel/plugin-proposal-class-properties',
      ['module-resolver', {
        'alias': {
          '@': './src/',
        },
      }],
      ...plugins,
    ],
  };
}
