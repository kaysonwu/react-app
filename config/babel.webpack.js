module.exports = (browser, ssr) => {
  const plugins = [
    '@babel/plugin-proposal-class-properties',
    ['import', {
      libraryName: 'antd',
      style: true
    }]
  ];

  if (ssr) {
    plugins.push('@loadable/babel-plugin');
  }

  return {
    presets: [
      '@babel/preset-react',
      '@babel/preset-typescript',
      ['@babel/preset-env', {
        modules: false,
        targets: browser ? { ie: 9 } : { node: true } 
      }]
    ],
    plugins
  };
}
