[English](https://github.com/kaysonwu/react-app)

## 浏览器支持

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 11 ✔ |

它不是一个框架，却胜似框架

## 特性

- 支持 Typescript

## 使用

我们推荐使用 `yarn` 去管理依赖. 如果你还没有安装 `yarn`, 请参考下列命令:

```
npm install -g yarn
```

或者, 请参考 [yarn 安装指南](https://yarnpkg.com/en/docs/install). 现在，我们只要下载代码就可以开始你的工作了

```
git clone -b 3.x https://github.com/kaysonwu/react-app.git
```

## 目录结构

```
├── config
├── mocks
├── public
└── src
    ├── pages
        ├── index.less
        └── index.tsx
    └── app.ts
├── tests    
├── package.json
├── tsconfig.json
└── yarn.lock
```

## 依赖包

依赖包更新于 2020 年 3 月

包名 | 用途 | 生产 | 版本选择
---|---|---|---
[antd](https://www.npmjs.com/package/antd) | UI 框架 | ✔️ | 4.0.0 起已经取消对 IE < 11 的支持
[axios](https://www.npmjs.com/package/axios) | HTTP 客户端，适用于浏览器与 node.js | ✔️
[classnames](https://www.npmjs.com/package/classnames) | 用于有条件地将 className 连接在一起 | ✔️ 
[next](https://www.npmjs.com/package/next) | 轻量级的 React 服务端渲染应用框架 | ✔️
[react](https://www.npmjs.com/package/react) | React 核心库，用于构建用户界面 | ✔️ | 16.8.0 起开始支持 Hook 组件
[react-dom](https://www.npmjs.com/package/react-dom) | 为 React 应用提供 DOM 方法 | ✔️ | 16.8.0 起开始支持 Hook 组件
[react-intl](https://www.npmjs.com/package/react-intl) | 国际化 React 应用 | ✔️
[react-redux](https://www.npmjs.com/package/react-redux) | 专用于 React 状态管理的 Redux 官方库 | ✔️
[redux](https://www.npmjs.com/package/redux) | JavaScript 状态容器，提供可预测化的状态管理 | ✔️
[redux-saga](https://www.npmjs.com/package/redux-saga) | Redux 中间件，用于异步状态管理 | ✔️
[@babel/core](https://www.npmjs.com/package/@babel/core) | babel 核心库 | ❌ | 7.x 是最新版, `7.4.0` 起支持 `core-js@3`
[@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env) | babel env 预设 | ❌ | 与 babel 核心库保持一致
[@types/html-webpack-plugin](https://www.npmjs.com/package/@types/html-webpack-plugin) | html-webpack-plugin 包的 typescript 声明文件 | ❌ | 与包版本保持一致
[@types/node](https://www.npmjs.com/package/@types/node) | node 包的 typescript 声明文件，**webpack 配置依赖它** | ❌
[@types/react](https://www.npmjs.com/package/@types/react) | react 包的 typescript 声明文件 | ❌ | 与包版本保持一致
[@types/react-dom](https://www.npmjs.com/package/@types/react-dom) | react-dom 包的 typescript 声明文件 | ❌ | 与包版本保持一致
[@types/react-redux](https://www.npmjs.com/package/@types/react-redux) | react-redux 包的 typescript 声明文件 | ❌ | 与包版本保持一致
[@types/webpack](https://www.npmjs.com/package/@types/webpack) | webpack 包的 typescript 声明文件 | ❌ | 与包版本保持一致
[@types/webpack-dev-server](https://www.npmjs.com/package/@types/webpack-dev-server) | webpack-dev-server 包的 typescript 声明文件 | ❌ | 与包版本保持一致
[@types/webpack-merge](https://www.npmjs.com/package/@types/webpack-merge) | webpack-merge 包的 typescript 声明文件 | ❌ | 与包版本保持一致
[babel-loader](https://www.npmjs.com/package/babel-loader) | 使用 babel 编译 javascript 文件 | ❌  | 8.x 是最新版, `8.0.0` 起支持 babel7
[babel-plugin-import](https://www.npmjs.com/package/babel-plugin-import) | 按需模块导入的 babel 插件，用于 antd 的按需导入 | ❌  | 1.x 是最新版, `1.9.0` 起支持 babel7
[clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin) | 用于在构建之前删除您的构建文件夹 | ❌  | 3.x 是最新版, 
[core-js](https://www.npmjs.com/package/core-js) | Javascript 模块化标准库，包含完整的 polyfills. **IE11 依赖它** | ❌  | 3.x 是最新版
[css-loader](https://www.npmjs.com/package/css-loader) |  解释 @import 和 url() | ❌ | 3.x 是最新版
[html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin) |  简化 HTML 文件创建，并注入服务模块 | ❌ | 3.x 是最新版, `3.2.0` 为了与声明文件保持一致
[less](https://www.npmjs.com/package/less) |  CSS 预处理语言 | ❌ | less-loader 4.1.0 起支持 less >= v3.0.0
[less-loader](https://www.npmjs.com/package/less-loader) | 编译 `less` 到 `css` | ❌ | 5.0.0 起已经取消对 < webpack4.x 和 < node 6 的支持
[regenerator-runtime](https://www.npmjs.com/package/regenerator-runtime) | 解释 `generator` 和 `async` 等函数  | ❌ | 0.13.x 是最新版
[style-loader](https://www.npmjs.com/package/style-loader) | 将 css 注入 DOM | ❌ | 1.x 是最新版
[ts-loader](https://www.npmjs.com/package/ts-loader) | 编译 `typescript` 到 `javascript` | ❌ | 6.x 是最新版
[ts-node](https://www.npmjs.com/package/typescript) | Node.js 的TypeScript 执行和 REPL, 用于解释 webpack 的 typescript 配置 | ❌ | 8.x 是最新版
[typescript](https://www.npmjs.com/package/typescript) | Javascript 超集 | ❌ | 3.x 是最新版
[webpack](https://www.npmjs.com/package/webpack) | 模块打包器 | ❌ | 4.x 是最新版 
[webpack-cli](https://www.npmjs.com/package/cli) | 为 webpack cli 提供支持 | ❌ | 3.x 是最新版，`webpack >= 4.x` 必装的依赖包
[webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server) | 提供开发服务 | ❌ | 3.x 是最新版, `3.1.0` 为了与声明文件保持一致
[webpack-merge](https://www.npmjs.com/package/webpack-merge) | 合并 webpack 配置 | ❌ | 4.x 是最新版，`4.1.0` 为了与声明文件保持一致
