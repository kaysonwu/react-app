import { ConfigurationFactory } from 'webpack';
import merge from 'webpack-merge';
import dev from './webpack.dev';
import pro from './webpack.pro';


const config : ConfigurationFactory = (env, { mode }) => {
  return merge({
    mode,
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            'style-loader',  
            'css-loader',  
            'less-loader'
          ]
        }
      ]
    }
  }, (mode === 'production' ? pro : dev));
};

export default config;
