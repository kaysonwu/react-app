import { resolve, join } from 'path';
import { Configuration } from 'webpack';

const root = resolve(__dirname, '..');
const config: Configuration = {
  devServer: {
    open: true,
    contentBase: join(root, 'public'),
    historyApiFallback: false    
  }
};

export default config;
