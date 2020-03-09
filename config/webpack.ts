import { resolve, join } from 'path';
import { ConfigurationFactory } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import merge from 'webpack-merge';
import dev from './webpack.dev';
import pro from './webpack.pro';

const root = resolve(__dirname, '..');

const config : ConfigurationFactory = (env, { mode }) => {

  return merge({
    mode,
    output: {
      path: join(root, 'public')
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            'babel-loader',
            'ts-loader'
          ],
        },
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          use: 'babel-loader'
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',  
            'css-loader',  
            'less-loader'
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: join(root, 'src', 'index.html')
      })
    ]
  }, (mode === 'production' ? pro : dev));
};

export default config;
