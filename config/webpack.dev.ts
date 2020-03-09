import { Configuration } from 'webpack';

const config: Configuration = {
  devServer: {
    open: true,
    historyApiFallback: false    
  }
};

export default config;
