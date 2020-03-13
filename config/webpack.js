const { resolve, join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const prod = require('./webpack.prod');
const dev = require('./webpack.dev');

const root = resolve(__dirname, '..');
const modules = join(root, 'node_modules');
console.log(modules)
const src = resolve(__dirname, '..', 'src');

module.exports = (env, { mode }) => {
  return merge({
    mode,
    output: {
      filename: '[name].js',
      publicPath: "/"
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
          // include: [
          //   join(modules, 'react-intl'),
          //   join(modules, 'intl-messageformat'),
          //   join(modules, 'intl-messageformat-parser'),
          //   root
          // ],
          exclude: path => {

            if (/node_modules/.test(path) && ! (/react-intl|intl-messageformat|intl-messageformat-parser/).test(path)) {
              return true;
            }
            console.log("jsx", path)  
            return false;

            if (/node_modules\/(?!react-intl|intl-messageformat|intl-messageformat-parser)/.test(path)) {

            } else{
              console.log('tsx', path);
            }
          },
          use: [
            'babel-loader',
            'ts-loader'
          ],
        },
        {
          test: /\.jsx?$/,
          // include: [
         
          //   join(modules, 'react-intl'),
          //   join(modules, 'intl-messageformat'),
          //   join(modules, 'intl-messageformat-parser'),
          //   root,
          // ],
          exclude: path => {

            if (/node_modules/.test(path) && ! (/react-intl|intl-messageformat|intl-messageformat-parser/).test(path)) {
              return true;
            }
            console.log("jsx", path)  
            return false;
           
         },
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
    plugins: [
      new HtmlWebpackPlugin({
        template: join(src, 'index.html')
      })
    ]
  }, (mode === 'production' ? prod : dev))
};
