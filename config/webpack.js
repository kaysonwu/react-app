const { resolve, join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin')
const merge = require('webpack-merge');
const prod = require('./webpack.prod');
const dev = require('./webpack.dev');

// Path constants.
const root = resolve(__dirname, '..');
const src = join(root, 'src');
const serverPath = join(root, 'server');  // Server build directory
const clientPath = join(root, 'public');  // Client build directory

module.exports = (env, { mode, target }) => {
  
  const isProd = mode === 'production';
  const isNode = target === 'node';

  return merge({
    mode: 'none',
    target,
    output: {
      publicPath: '/',
      filename: '[name].js'
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.jsx'],
      alias: {
      '@': src,
      'config': __dirname
      }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules(\/|\\)(?!react-intl|intl-messageformat|intl-messageformat-parser)/,
          use: [
            'babel-loader',
            'ts-loader'
          ],
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules(\/|\\)(?!react-intl|intl-messageformat|intl-messageformat-parser)/,
          use: 'babel-loader'
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',  
            'css-loader',  
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true  
              }
            }
          ]
        }
      ]
    },
    optimization: {
      minimize: false
    }
  }, (isNode ? ({
    // Node target for server side render.
    entry: {
      server: join(src, 'server.tsx'),
    },
    output: {
      path: serverPath,
   //   libraryTarget: "commonjs2"
    },
    plugins: [
      new LoadablePlugin()
    ]
  }) : ({
    // Web target client side render.
    entry: {
      app: join(src, 'index.tsx')
    },
    output: {
      path: clientPath
    },
    devServer: {
      contentBase: clientPath,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: join(src, 'index.html')
      })
    ]
  })), (isProd ? prod : dev))
};
