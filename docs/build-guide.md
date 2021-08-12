# 搭建指南

本指南主要讲述脚手架从 0 到 1 的搭建过程，脚手架选用了 [webpack](https://webpack.js.org/) 作为模块打包工具，在 Javascript 编译方面则选用了 [babel](https://babeljs.io/)，得益于这两款工具，让脚手架可以很轻松的装入 [React](https://reactjs.org/)、[Typescript](https://www.typescriptlang.org/)、[Node](https://nodejs.org/) 等生态系统，关于脚手架的 [目录结构](getting-started.md#目录结构) 则是依据社区喜爱度制定而成。

如果你想从零开始了解脚手架，你应该从 `package.json` 文件中的 `scripts` 开始

```json
{
  ...
  "scripts": {
    "dev": "webpack server --progress",
    "build": "webpack --progress",
  },
  ...
}
```

关于上面命令的说明：

- `dev`: 用于启动开发服务器
- `build`: 用于编译源代码

要让上面的命令顺利运行，你需要对 [webpack](https://webpack.js.org/) 生态有一定的了解，如果你不了解也没有关系，推荐你阅读 [Webpack 入门指南](https://webpack.js.org/guides/getting-started/)。当然，还有更简单的方法，就是直接动手安装依赖：

```shell
yarn add -D webpack webpack-cli webpack-dev-server
```

**为什么要加 `-D` ？**

`-D` 是 `--dev` 的缩写，因为 [webpack](https://webpack.js.org/) 只有在开发时才会用到所以建议是安装到开发依赖中 `devDependencies`

接下来准备一个入口文件，通常它会被放置在 `src` 文件夹内，并命名为 `index.js`

```js
vi index.js

console.log('hello webpack');
```

一切就绪，你可以顺利的运行 `dev` 和 `build` 命令了

## 引入 Typescript

[Typescript](https://www.typescriptlang.org/) 是 Javascript 的超集，它让 Javascript 变得更有魅力，如果你还未接触过 [Typescript](https://www.typescriptlang.org/)，那么，现在就开始阅读 [Typescript 入门指南](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html) 吧，你一定会 ❤️ 爱 ❤️ 上它的

首先，先安装它

```shell
yarn add -D typescript
```

然后，初始化项目

```
./node_modules/.bin/tsc --init
```

现在可以将 `src/index.js` 改名为 `src/index.ts`，文件的内容暂时不变

## 引入 Babel

在顺利引入 [Typescript](https://www.typescriptlang.org/) 后，如何编译 [Typescript](https://www.typescriptlang.org/) 就成了首要目标。使用 [Webpack](https://webpack.js.org/) 作为模块打包工具时，编译 [Typescript](https://www.typescriptlang.org/) 代码主要有以下两种方式：

- [ts-loader](https://www.npmjs.com/package/ts-loader)：使用 typescript 官方编译器编译
- [babel-loader](https://www.npmjs.com/package/babel-loader)：使用 babel 社区插件编译

这两种方式都非常优秀，其中 [babel-loader](https://webpack.js.org/loaders/babel-loader/) 更受社区欢迎，因为其社区活跃、插件丰富，所以脚手架最终选定 [babel](https://babeljs.io/)

首先，安装 babel

```shell
yarn add -D @babel/core @babel/preset-env @babel/preset-typescript @babel/preset-react babel-loader
```

上面，安装了 [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env)、[@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript)、[@babel/preset-react](https://babeljs.io/docs/en/babel-preset-react) 等预设，它可以让 [babel](https://babeljs.io/) 编译 `es`、`jsx`、`typescript` 等语法。

**什么是预设？**

预设就是一组 babel 插件，如果你想深入了解 [babel](https://babeljs.io/) 可以阅读 [Babel 入门指南](https://babeljs.io/docs/en/)

接下来，配置 babel

```js
vi babel.config.js

module.exports = ({ caller }) => {
  return {
    presets: [
      '@babel/preset-react',
      '@babel/preset-typescript',
      '@babel/preset-env',
  };
}
```

至此，[babel](https://babeljs.io/) 已经可以正常的编译 [Typescript](https://www.typescriptlang.org/) 代码了

## Babel 与 Webpack 互联

[Webpack](https://webpack.js.org/) 主要负责模块的打包，至于源码的编译则交给了 [Loaders](https://webpack.js.org/concepts/loaders/)。所以，要使用 [babel-loader](https://www.npmjs.com/package/babel-loader) 需要先准备一个配置文件

```ts
vi webpack.config.babel.ts

import { Configuration } from 'webpack';

const config: Configuration = {
  ...
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  ...
};

export default config;
```

**为什么 webpack 配置文件名要加 babel？**

为了使用 [Typescript](https://www.typescriptlang.org/) 编写 [Webpack](https://webpack.js.org/) 的配置文件，在文件名中加 `babel` 是告诉 [Webpack](https://webpack.js.org/) 命令行工具，读取配置文件前先用 [babel](https://babeljs.io/) 编译文件，这样才可以在 [Node](https://nodejs.org/) 环境中正常运行

配置完成后，每当 [Webpack](https://webpack.js.org/) 遇到 `js`、`jsx`、`ts`、`tsx` 的文件都会交给 [Babel](https://babeljs.io/) 去编译，至此，互联完成

## 引入 React

[React](https://reactjs.org/) 是一个用于构建用户界面的 JavaScript 库，如果你还不是特别了解它，你可以从 [React 入门指南](https://zh-hans.reactjs.org/docs/getting-started.html) 开始领略 [React](https://reactjs.org/) 的魅力。

在 [Webpack](https://webpack.js.org/) 和 [Babel](https://babeljs.io/) 互联之后，就意味着编译 [React](https://reactjs.org/) 源代码的开发环境已经准备就绪，接下来只需要安装相关依赖：

```shell
yarn add react react-dom
```

**为什么不是开发依赖？**

当你需要服务端渲染时，[React](https://reactjs.org/) 放在生产依赖 (`dependencies`) 中以便于模块引入

然后，修改 `src/index.ts` 文件中的内容，并将文件名改成 `src/index.tsx`

```tsx
import React from 'react';
import { render } from 'react-dom';

render(<div>Hello React!</div>, document.getElementById('app'));
```

现在，试试通过 `yarn run dev` 命令运行项目，你可以顺利的在浏览器中看到 `Hello React!`

## 更复杂的场景

🎉 恭喜你，已经顺利搭建出可以运行 [React](https://reactjs.org/) 和 [Typescript](https://www.typescriptlang.org/) 代码的脚手架。不过，现在还不是骄傲的时候，因为随着需求的增长，你还需要为更复杂的场景去提供解决方案：

- [国际化](i18n.md)
- [懒加载](lazy-loading.md)
- [代码分离](code-splitting.md)
- [条件编译](conditional-compile.md)
- [数据模拟](mock.md)
- [服务端渲染](ssr.md)
- [自动化测试](testing.md)
- [Hooks 数据流](hooks.md)
- [一致的代码风格](code-style.md)
- [浏览器兼容性](compat.md)

在这些场景文档中都为你提到了完成场景所依赖的第三方库，通过 **先安装，再配置** 的方式，一步步去实现以上场景吧，相信你可以做到的。你也可以将完成场景的步骤 PR 至本文档
