import { resolve, join } from 'path';
import { Configuration, WebpackPluginInstance } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlPlugin from 'html-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
// @ts-expect-error: Waiting for declaration file.
import AntdDayjsPlugin from 'antd-dayjs-webpack-plugin';
import 'webpack-dev-server';

type Flags = {
  /**
   * Environment passed to the configuration when it is a function.
   */
  env: {
    /**
     * true if serve|s is being used.
     */
    WEBPACK_SERVE?: boolean;

    /**
     * true if build|bundle|b is being used.
     */
    WEBPACK_BUILD?: boolean;

    /**
     * true if --watch|watch|w is being used.
     */
    WEBPACK_WATCH?: boolean;

    /**
     * Indicate whether server-side render is enabled.
     */
    ssr?: boolean;

    [key: string]: unknown;
  };

  /**
   * Sets the build target.
   */
  target: string[];

  /**
   * Defines the mode to pass to webpack e.g. 'development', 'production'.
   */
  mode: Configuration['mode'];

  /**
   * see: https://webpack.js.org/api/cli/#flags
   */
  [key: string]: unknown;
};

const makeConfig = (target: string, mode: Configuration['mode'], ssr: boolean) => {
  const entryPath = resolve(__dirname, 'src');
  const outputPath = resolve(__dirname, target === 'web' ? 'public' : 'server');

  const config: Configuration = {
    name: target,
    target,
    mode,
    entry: {
      app: join(entryPath, 'index.tsx'),
    },
    output: {
      path: outputPath,
      publicPath: '/',
      chunkFilename: ({ chunk }) => {
        const name = chunk!.name!.replace(/-([a-z0-9])/g, '/$1');

        if (name.split('/').length === 2) {
          return `${name}/index.js`;
        }

        return `${name}.js`;
      },
    },
    resolve: {
      extensions: ['.js', '.ts', '.jsx', '.tsx'],
      alias: {
        '@': entryPath,
      },
    },
    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          exclude: /node_modules(\/|\\)(?!react-intl|intl-messageformat|intl-messageformat-parser)/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                caller: { target, ssr },
              },
            },
          ],
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new AntdDayjsPlugin(),
      new MiniCssExtractPlugin(),
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
      new HtmlPlugin({
        template: join(entryPath, 'index.html'),
      }),
    ],
    devtool: mode === 'development' ? 'cheap-module-source-map' : false,
    externalsPresets: { [target]: true },
    externals: target === 'node' ? [nodeExternals()] : undefined,
    devServer: {
      contentBase: outputPath,
      open: true,
      hot: true,
      historyApiFallback: true,
    },
    optimization: {
      minimize: false,
      minimizer: [
        new TerserPlugin(),
        new CssMinimizerPlugin(),
      ] as unknown as WebpackPluginInstance[],
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            name: 'vendor',
          },
        },
      },
    },
  };

  return config;
};

export default (env: Flags['env'], argv: Flags): Configuration[] => {
  const { target = ['web'], mode = env.WEBPACK_SERVE ? 'development' : 'production' } = argv;

  return target
    .filter(t => ['web', 'node'].includes(t))
    .map((t, _, array) => makeConfig(t, mode, array.length > 1));
};
