const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  optimization: {
    minimize: false,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        '!images',
        '!images/**/*',
        '!.gitignore',
        '!update-browser.html',
        '!*-stats.json',
      ],
    }),
  ],
};
