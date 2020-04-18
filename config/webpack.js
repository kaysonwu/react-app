const { resolve, join } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

// Constants.
const root = resolve(__dirname, '..');
const src = join(root, 'src');
const constants = {
  web: {
    // Web build directory
    path: join(root, 'public'),
    libraryTarget: 'var',
  },
  node: {
    // Node build directory
    path: join(root, 'server'),
    libraryTarget: 'commonjs2',
  },
};

const getConfig = (target, SSR) => {
  const browser = target === 'web';
  const { path, libraryTarget } = constants[target];

  return {
    target,
    name: target,
    entry: {
      app: join(src, `${target}.tsx`),
    },
    output: {
      path,
      libraryTarget,
      publicPath: '/',
      filename: '[name].js',
    },
    resolve: {
      extensions: ['.js', '.ts', '.jsx', '.tsx']
    },
    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          exclude: /node_modules(\/|\\)(?!react-intl|intl-messageformat|intl-messageformat-parser)/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                caller: { target, SSR },
              },
            },
          ],
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',  
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true,
              },
            },
          ],
        },
      ],
    },
    externals: browser ? undefined : [(require('webpack-node-externals'))()],
    plugins: [
      new MiniCssExtractPlugin({
        chunkFilename: 'css/[id].css',
      }),
      (browser && !SSR
        ? new HtmlWebpackPlugin({ 
            template: join(src, 'index.html'),
          })
        : new (require('@loadable/webpack-plugin'))({
            outputAsset: false,
            filename: `${target}-stats.json`,
            writeToDisk: { filename: constants.node.path }, 
          })
      ),
    ],
    devServer: {
      contentBase: path,
    },
  };  
}

module.exports = (env, argv) => {
  const { targets } = argv;
  let config = require(`./webpack.${env}`);

  if (typeof config === 'function') {
    config = config(env, argv);
  }

  if (Array.isArray(targets)) {
    return targets.map(target => merge(config, getConfig(target, true)));
  }
  
  return merge(config, getConfig(targets));
}
