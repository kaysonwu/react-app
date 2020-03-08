[中文](https://github.com/kaysonwu/react-app/README-zh_CN.md)


## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 11 ✔ |

It's not a framework, but it has the capabilities of a framework.

## Features

- Make Typescript

## Usage

We recommend using `yarn` to manage dependencies. If you do not have `yarn` installed, please refer to the following command:

```
npm install -g yarn
```

Or, refer to the [yarn installation guide](https://yarnpkg.com/en/docs/install). Now, just download the code and you can start your work.

```
git clone -b 3.x https://github.com/kaysonwu/react-app.git
```

## Directory Structure

```
├── public
├── mock
├── public
└── src
    ├── pages
        ├── index.less
        └── index.tsx
    └── app.ts
├── package.json
```

## Libraries

package | 用途 | 生产 | 版本选择
---|---|---
[antd](https://www.npmjs.com/package/antd) | UI 框架 | ✔️
[axios](https://www.npmjs.com/package/axios) | HTTP 客户端，适用于浏览器与 node.js | ✔️
[classnames](https://www.npmjs.com/package/classnames) | 用于有条件地将 className 连接在一起 | ✔️ 
[next](https://www.npmjs.com/package/next) | 轻量级的 React 服务端渲染应用框架 | ✔️
[react](https://www.npmjs.com/package/react) | React 核心库，用于构建用户界面 | ✔️
[react-dom](https://www.npmjs.com/package/react-dom) | 为 React 应用提供 DOM 方法 | ✔️
[react-intl](https://www.npmjs.com/package/react-intl) | 国际化 React 应用 | ✔️
[react-redux](https://www.npmjs.com/package/react-redux) | 专用于 React 状态管理的 Redux 官方库 | ✔️
[redux](https://www.npmjs.com/package/redux) | JavaScript 状态容器，提供可预测化的状态管理 | ✔️
[redux-saga](https://www.npmjs.com/package/redux-saga) | Redux 中间件，用于异步状态管理 | ✔️
[@types/classnames](https://www.npmjs.com/package/@types/classnames) | classnames 的 typescript 声明文件 | ❌
[@types/node](https://www.npmjs.com/package/@types/node) | node 库的 typescript 声明文件，**Next.js 依赖它** | ❌
[@types/react](https://www.npmjs.com/package/@types/react) | react 库的 typescript 声明文件 | ❌
[@types/react-dom](https://www.npmjs.com/package/@types/react-dom) | react-dom 库的 typescript 声明文件 | ❌
[@types/react-redux](https://www.npmjs.com/package/@types/react-redux) | react-redux 库的 typescript 声明文件 | ❌
[@zeit/next-less](https://www.npmjs.com/package/@zeit/next-less) | 支持 `.less` 文件导入 | ❌
[babel-plugin-import](https://www.npmjs.com/package/babel-plugin-import) |  antd 按需导入 | ❌ 
[less](https://www.npmjs.com/package/less) |  CSS 预处理语言 | ❌ 
[less-loader](https://github.com/webpack-contrib/less-loader) | Compiles Less to CSS | ❌ | 

