const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!images', '!images/**/*', '!.gitignore', '!update-browser.html']
    })
  ]
};
