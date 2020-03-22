module.exports = (target) => {
  return {
    presets: [
      '@babel/preset-react',
      ['@babel/preset-env', {
        modules: false,
        targets: target === 'web' ? { ie: 9 } : { node: true },
      }]
    ],
    plugins: [
      '@loadable/babel-plugin',
      ['import', {
        libraryName: 'antd',
        style: true
      }]
    ]
  }
};
