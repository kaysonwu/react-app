const { resolve, join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const LoadablePlugin = require('@loadable/webpack-plugin');
const merge = require('webpack-merge');
const babel = require('./babel.webpack');

// Constants.
const root = resolve(__dirname, '..');
const src = join(root, 'src');
const constants = {
  web: {
    // Web build directory
    path: join(root, 'public'),
    libraryTarget: 'var'
  },
  node: {
    // Node build directory
    path: join(root, 'server'),
    libraryTarget: 'commonjs2',
    externals: [nodeExternals()]
  }
}

const getConfig = (target, ssr) => {
  const browser = target === 'web';
  const { path, libraryTarget, externals } = constants[target];

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
      extensions: ['.js', '.ts', '.jsx', '.tsx'],
      alias: {
        '@': src,
        'config': __dirname
      }
    },
    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          exclude: /node_modules(\/|\\)(?!react-intl|intl-messageformat|intl-messageformat-parser)/,
          use: [
            {
              loader: 'babel-loader',
              options: babel(browser, ssr)
            },
            {
              loader: 'webpack-preprocessor-loader',
              options: {
                params: { 
                  ssr,
                  browser,
                  NODE_SERVER: false
                }
              }
            }
          ]
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
    externals,
    plugins: (browser && ! ssr ? [
      // only web render plugins
      new HtmlWebpackPlugin({
        template: join(src, 'index.html')
      })
    ] : [
      new LoadablePlugin({
        outputAsset: false,
        filename: `${target}-stats.json`,
        writeToDisk: { filename: constants.node.path } 
      })
    ]),
    devServer: {
      contentBase: path,
    },
  };  
}

module.exports = (env, { targets }) => {
  const config = require(`./webpack.${env}`);
  if (Array.isArray(targets)) {
    return targets.map(target => merge(config, getConfig(target, true)));
  }
  return merge(config, getConfig(targets));
}
