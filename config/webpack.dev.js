const { resolve, join } = require('path');
const root = resolve(__dirname, '..');

module.exports = {
  devtool: false,
  devServer: {
    open: true,
    historyApiFallback: true    
  }
};
