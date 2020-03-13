const { resolve, join } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const root = resolve(__dirname, '..');

module.exports = {
  entry: {
    app: join(root, 'src', 'index.tsx')
  },
  output: {
    path: join(root, 'public')
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!images', '!images/**/*',  '!.gitignore', '!update-browser.html']
    })
  ]
};
