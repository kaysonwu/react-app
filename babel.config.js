module.exports = ({ caller, env }) => {
  const target = caller(c => c && c.target);
  const name = caller(c => c && c.name);

  const SERVER_SIDE_RENDER = caller(c => c && c.ssr);
  const IS_BROWSER = target === 'web';

  const config = {
    presets: [
      '@babel/preset-react',
      '@babel/preset-typescript',
      [
        '@babel/preset-env',
        {
          modules: name === 'babel-loader' ? false : 'commonjs',
          targets: IS_BROWSER ? undefined : { node: true },
        },
      ],
    ],
    plugins: [
      // ['@babel/plugin-transform-modules-commonjs', { importInterop: 'node', loose: true }],
      ['import', { libraryName: 'antd', style: true }],
      [
        'module-resolver',
        {
          alias: {
            '@': './src/',
          },
        },
      ],
    ],
  };

  if (name !== 'babel-jest') {
    // Preprocessor will delete some irrelevant code, so it should be executed at the front.
    config.plugins.unshift([
      'preprocessor',
      {
        symbols: {
          IS_BROWSER,
          IS_NODE: !IS_BROWSER,
          SERVER_SIDE_RENDER,
          PRODUCTION: env('production'),
          DEVELOPMENT: env('development'),
        },
      },
    ]);
  }

  return config;
};
