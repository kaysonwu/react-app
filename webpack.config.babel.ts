import { resolve, join } from 'path';
import { Configuration, WebpackPluginInstance } from 'webpack';
import { createServe } from 'serve-mock';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
// @ts-expect-error: Waiting for declaration file.
import ErrorOverlayPlugin from 'error-overlay-webpack-plugin';
// @ts-expect-error: Waiting for declaration file.
import AntdDayjsPlugin from 'antd-dayjs-webpack-plugin';
import 'webpack-dev-server';

const Try = <T>(fn: () => T): T | undefined => {
  try {
    return fn();
  } catch {
    return undefined;
  }
};

const ssr = process.argv.includes('ssr');
const withoutMock = process.argv.includes('without-mock');

// eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
const proxy = Try(() => require('./.proxy')?.default);
const makeConfig = (target: string) => {
  const entryPath = resolve(__dirname, 'src');
  const outputPath = resolve(__dirname, 'public');

  const mode = process.env.NODE_ENV as Configuration['mode'];
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
      new MiniCssExtractPlugin({
        chunkFilename: 'css/[name].css',
      }),
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
    devtool: false,
    devServer: {
      contentBase: outputPath,
      open: true,
      hot: true,
      historyApiFallback: true,
      proxy,
      after: withoutMock
        ? undefined
        : app => app.all('*', createServe(resolve(__dirname, 'mocks'))),
    },
    optimization: {
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

  if (mode === 'development') {
    config.devtool = 'cheap-module-source-map';
    config.plugins!.push(new ErrorOverlayPlugin());
  }

  return config;
};

export default [makeConfig('web')];
