import { Configuration } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const config: Configuration = {
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!images', '!images/**/*',  '!.gitignore', '!update-browser.html']
    })
  ]
};

export default config;
