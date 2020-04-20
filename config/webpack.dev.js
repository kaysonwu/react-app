const { resolve } = require('path');
const { createServe } = require('serve-mock');
const register = require('@babel/register');

register({
  caller: {
    name: 'serve-mock',
  },
  extensions: ['.ts']
});

module.exports = (env, { withoutMock }) => {
  return {
    mode: 'development',
    devtool: false,
    devServer: {
      open: true,
      hot: true,
      historyApiFallback: true,
      after(app) {
        if (!withoutMock) {
          app.all('*', createServe(resolve(__dirname, '..', 'mocks')));
        }
      }
    }
  };
}
