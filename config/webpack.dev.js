const { resolve } = require('path');
const { createServe } = require('serve-mock');
const register = require('@babel/register');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

register({
  caller: {
    name: 'serve-mock',
  },
  extensions: ['.ts'],
});

module.exports = (env, { withoutMock }) => ({
  mode: 'development',
  devtool: 'cheap-module-source-map',
  plugins: [new ErrorOverlayPlugin()],
  devServer: {
    open: true,
    hot: true,
    historyApiFallback: true,
    after(app) {
      if (!withoutMock) {
        app.all('*', createServe(resolve(__dirname, '..', 'mocks')));
      }
    },
  },
});
