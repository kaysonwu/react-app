中文 | [English](https://github.com/kaysonwu/react-app/blob/3.x/README-en.md)

## 浏览器支持

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 11 ✔ |

&nbsp;&nbsp;&nbsp;&nbsp;它是一个企业级的脚手架，更形似一个框架。你能从中获取搭建脚手架的经验，也能从这里开始你的项目。

## 特性

- 📦 [开箱即用](#usage)
- 🌳 [基于 Typescript 构建](http://www.typescriptlang.org/)
- 🌷 [内置 antd UI 框架](https://ant.design/)
- ✂️ [代码分割](#code-splitting)
- 🚀 [懒加载](#lazy-loading)   
- 🌏 [国际化](#i18n)
- 📌 [最低可支持 IE9](#IE9)
- 🍔 [dva 型数据流](#dva)
- 🎯 [服务端渲染](#ssr)
- 🌟 [数据模拟](#ssr)
- 🐛 [自动化测试](#test)

## <a id="usage"></a> 使用

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
├── config                              // 应用配置目录
│   ├── routes.ts                   
│   ├── webpack.dev.js            
│   ├── webpack.js            
│   └── webpack.prod.js
├── mocks                               // 模拟数据目录
├── public                              // 编译输出与静态资源目录
│   ├── images/
│   ├── .gitignore
│   └── update-browser.html             // 浏览器升级提示页面
├── src                                 // 源代码目录
│   ├── components                      // 组件目录
│   ├── locales                         // 国际化语言存放目录
│   │   ├── zh-CN                       
│   │   │   └── validation.ts
│   │   └── zh-CN.ts       
│   ├── models                  
│   ├── pages
│   │   ├── user                        // User 示例页面
│   │   │   ├── index.less
│   │   │   └── index.tsx
│   │   └── home                        // Home 示例页面
│   │       ├── index.less
│   │       └── index.tsx
│   ├── typings                        // Typescript 声明文件
│   ├── utils
│   │   ├── locale.ts
│   │   └── request.ts
│   ├── indedx.html                     // HTML 模板 
│   └── index.tsx                       // 应用入口
├── tests                               // 测试目录
├── .gitignore
├── package.json
├── README-en.md                        // English document
├── README.md                           // 英文版文档
├── tsconfig.json                       // Typescript 配置
└── yarn.lock                           // yarn 依赖包缓存        
```

## 依赖包

依赖包更新于 2020 年 3 月

包名 | 用途 | 生产 | 版本选择
---|---|---|---
[antd](https://www.npmjs.com/package/antd) | UI 框架 | ✔️ | 4.0.0 起已经取消对 IE < 11 的支持
[axios](https://www.npmjs.com/package/axios) | HTTP 客户端，适用于浏览器与 node.js | ✔️
[classnames](https://www.npmjs.com/package/classnames) | 用于有条件地将 className 连接在一起 | ✔️ 
[react](https://www.npmjs.com/package/react) | React 核心库，用于构建用户界面 | ✔️ | 16.8.0 起开始支持 Hook 组件
[react-dom](https://www.npmjs.com/package/react-dom) | 为 React 应用提供 DOM 方法 | ✔️ | 16.8.0 起开始支持 Hook 组件
[react-intl](https://www.npmjs.com/package/react-intl) | 国际化 React 应用 | ✔️ | 4.x 是最新版, `4.0.0` 起 `FormattedHTMLMessage` ＆ `intl.formatHTMLMessage` 已删除，因为 `FormattedMessage` 现在完全支持嵌入式 HTML 标签
[react-redux](https://www.npmjs.com/package/react-redux) | 专用于 React 状态管理的 Redux 官方库 | ✔️
[react-router-dom](https://www.npmjs.com/package/react-router-dom) | 专用于 React 的路由 | ✔️ | 5.x 是最新版, `5.1.0` 为了与声明文件保持一致
[redux](https://www.npmjs.com/package/redux) | JavaScript 状态容器，提供可预测化的状态管理 | ✔️
[redux-saga](https://www.npmjs.com/package/redux-saga) | Redux 中间件，用于异步状态管理 | ✔️
[@babel/core](https://www.npmjs.com/package/@babel/core) | babel 核心库 | ❌ | 7.x 是最新版, `7.4.0` 起支持 `core-js@3`
[@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env) | babel env 预设 | ❌ | 与 babel 核心库保持一致
[@types/html-webpack-plugin](https://www.npmjs.com/package/@types/html-webpack-plugin) | html-webpack-plugin 包的 typescript 声明文件 | ❌ | 与包版本保持一致
[@types/node](https://www.npmjs.com/package/@types/node) | node 包的 typescript 声明文件，**webpack 配置依赖它** | ❌
[@types/react](https://www.npmjs.com/package/@types/react) | react 包的 typescript 声明文件 | ❌ | 与包版本保持一致
[@types/react-dom](https://www.npmjs.com/package/@types/react-dom) | react-dom 包的 typescript 声明文件 | ❌ | 与包版本保持一致
[@types/react-redux](https://www.npmjs.com/package/@types/react-redux) | react-redux 包的 typescript 声明文件 | ❌ | 与包版本保持一致
[@types/react-router-dom](https://www.npmjs.com/package/@types/react-router-dom) | react-router-dom 包的 typescript 声明文件 | ❌ | 与包版本保持一致
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
[typescript](https://www.npmjs.com/package/typescript) | Javascript 超集 | ❌ | 3.x 是最新版, `3.5.0` 起支持 `Omit`
[webpack](https://www.npmjs.com/package/webpack) | 模块打包器 | ❌ | 4.x 是最新版 
[webpack-cli](https://www.npmjs.com/package/cli) | 为 webpack cli 提供支持 | ❌ | 3.x 是最新版，`webpack >= 4.x` 必装的依赖包
[webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server) | 提供开发服务 | ❌ | 3.x 是最新版, `3.1.0` 为了与声明文件保持一致
[webpack-merge](https://www.npmjs.com/package/webpack-merge) | 合并 webpack 配置 | ❌ | 4.x 是最新版，`4.1.0` 为了与声明文件保持一致

## 文档

### 代码分割与懒加载 <a id="code-splitting"></a>

> 参考文献： [webpack 代码分离](https://webpack.docschina.org/guides/code-splitting/)、[import 语法](https://webpack.docschina.org/api/module-methods#import-)、[webpack 使用不同语言进行配置](https://webpack.docschina.org/configuration/configuration-languages/)

本脚手架选用 webpack 推荐的方式，使用符合 [ECMAScript 提案](https://github.com/tc39/proposal-dynamic-import) 的 `import()` 语法来实现动态导入。接下来，就开始逐步讲解，如何实现代码分离的。

首先，需要在 `tsconfig.json` 配置文件中将 `module` 设置为 `ESNext`。该选项是防止 `typescript` 编译 `import()` 语法。

```json
{
  "compilerOptions": {
    ...
    "module": "ESNext"
  }
}
```

**注意**：更改此选项将导致 `webpack` 使用 `typescript` 语言所编写的配置文件出现编译错误。这是因为 `node.js` 无法识别 `import` 和 `export` 等 `ES6` 模块语法。修复该错误有两个方法：

  1. **【推荐】** 不使用 typescript 语言编写配置文件。因为配置文件属于低频类型。
  2. 使用 [tsconfig-paths](https://www.npmjs.com/package/tsconfig-paths) 为 [ts-node](https://www.npmjs.com/package/ts-node) 单独指定一个 `typescript` 配置文件  

      ```shell
      // 添加配置文件编译依赖包
      yarn add -D ts-node@^8.0.0 

      // 添加为 ts-node 提供独立配置的依赖包
      yarn add -D tsconfig-paths@^3.0.0 cross-env@^7.0.0

      // 添加声明文件
      yarn add -D @types/webpack@^4.0.0 @types/webpack-dev-server@^3.1.0 @types/webpack-merge@^4.1.0 @types/html-webpack-plugin@^3.2.0
      ```

      **./config/tsconfig-for-webpack.json**

      ```json
      {
        "compilerOptions": {
          "module": "commonjs",
          "target": "es5",
          "esModuleInterop": true
        }
      }
      ```

      **package.json**

      ```json
      {
        "scripts": {
          "dev": "cross-env TS_NODE_PROJECT=\"./config/tsconfig-for-webpack.json\" webpack-dev-server --mode=development --config=./config/webpack.ts",
          "build": "cross-env TS_NODE_PROJECT=\"./config/tsconfig-for-webpack.json\" webpack --mode=production --config=./config/webpack.ts"
        }
      }
      ```
`webpack` 不需要特别的配置，就能编译 `import()` 语法了，接下来，通过参考 [react-loadable](https://github.com/thejameskyle/react-loadable) 或 [@loadable/component](https://loadable-components.com/docs/getting-started/) 的文档，来使用 `import()` 即可。

另外，`webpack` 针对 `import()` 语法编译，还提供了 [魔术注释](https://webpack.docschina.org/api/module-methods#magic-comments)，它可以帮助你更好的命名 `bundle` 与优化模块的加载方式。

```typescript
import(
  /* webpackChunkName: "pages/[request]" */  
  'module'
);
```

上面示例，用 `webpackChunkName` 选项指定了新的 `chunk` 名称，并将该 `bundle` 存放至 `pages` 文件夹内。 从 `webpack 2.6.0` 开始，魔术注释加入了 `[index]` 和 `[request]` 占位符，分别支持赋予一个递增的数字和实际解析的文件名。

### 懒加载 <a id="lazy-loading"></a>

> 参考文献：[webpack 懒加载](https://webpack.docschina.org/guides/lazy-loading/)

&nbsp;&nbsp;&nbsp;&nbsp;懒加载或者按需加载，是一种很好的优化网页或应用的方式。这种方式实际上是先把你的代码在一些逻辑断点处分离开，然后在一些代码块中完成某些操作后，立即引用或即将引用另外一些新的代码块。这样加快了应用的初始加载速度，减轻了它的总体体积，因为某些代码块可能永远不会被加载。

&nbsp;&nbsp;&nbsp;&nbsp;本脚手架使用了 [React](https://zh-hans.reactjs.org/docs/code-splitting.html#reactlazy) 官方推荐的代码拆分库 [@loadable/component](https://loadable-components.com)，并用它实现了页面、语言包、数据模型等代码的拆分与按需加载。接下来我将分别展示与之相关的代码。

#### 页面

#### 语言包


### 国际化 <a id="i18n"></a> 

&nbsp;&nbsp;&nbsp;&nbsp;国际化（internationalization）是设计和制造容易适应不同区域要求的产品的一种方式。它要求从产品中抽离所有地域语言，国家/地区和文化相关的元素。换言之，应用程序的功能和代码设计考虑在不同地区运行的需要，其代码简化了不同本地版本的生产。开发这样的程序的过程，就称为国际化。

&nbsp;&nbsp;&nbsp;&nbsp;本脚手架选用了由雅虎团队专门为 [React](https://zh-hans.reactjs.org) 应用设计的国际化库 [react-intl](https://github.com/formatjs/react-intl)。脚手架的语言文件默认都放在 `src/locales` 目录中。在此目录中，相应的语言文件存放在相应的子目录下，例如：

```text
├── src                                 
    ├── locales                      
      ├── zh-CN               // 简体中文语言
        ├── home.ts           // Home 页面语言 
        └── index.ts          // 公共语言
```

&nbsp;&nbsp;&nbsp;&nbsp;将公共与页面语言分离是为了实现懒加载，在较小的应用中效果可能不是很明显，但是，随着你的应用语言文件增大它的收益就会变得越发明显。

**注意：** 页面语言文件的命名应当遵循路由的路径，当存在嵌套路径时，只需以 `-` 替代路径分隔符 `/` 命名语言文件即可。如果你不喜欢 `-` 你需要修改 `src/utils/locale.ts` 中的 `getNameFromPath` 函数，例如：

```typescript
export function getNameFromPath(path: string) {

  ...

//  return path.replace('/', '-');

 // 将 - 修改成 . 
  return path.replace('/', '.');
}
```

#### 引入 antd

&nbsp;&nbsp;&nbsp;&nbsp;[Antd Design](https://ant.design) 团队为 [React](https://zh-hans.reactjs.org) 提供了一款优秀的 UI 框架，。为了让它也保持国际化，我们需要在公共语言文件中引入它的语言文件，示例：

```typescript
import antd from 'antd/es/locale-provider/zh_CN';

const zh_CN : Locale = {
  antd,
  Hello: "你好"
};

export default zh_CN;
```

#### 区域设置

&nbsp;&nbsp;&nbsp;&nbsp;你可以使用 `/src/utils/locale` 中的 `setLocale` 方法动态地更改应用运行过程中使用的语言：

```tsx
import React from 'react';
import { setLocale } from '@/utils/locale';

export default () => {

  const handleClick = () => {
    setLocale('en');
  }

  return (
    <button onClick={handleClick}>修改语言</button>
  )
}
```

#### 确定当前语言环境

&nbsp;&nbsp;&nbsp;&nbsp;你可以使用 `/src/utils/locale` 中的 `getLocale` 和 `isLocale` 方法确定当前的区域设置或者检查语言环境是否为给定值：

```tsx
import React from 'react';
import { getLocale, isLocale } from '@/utils/locale';

export default () => {

  const locale = getLocale();

  if (isLocale('en')) {

  }
}
```

#### 定义翻译字符串

&nbsp;&nbsp;&nbsp;&nbsp;所有语言文件必须返回 `键值对` 类型数据，语言文件建议使用 `typescript` 或 `javascript` 语言编写，如果你需要使用 `json` 编写，你需要在 `config/webpack.js` 文件中加入 `json` 解析后缀，参照：

```javascript
module.exports = (env, { mode, target }) => {
  ...
  return merge({
    ...
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.jsx', 'json'],
    },
  })
}      
```

**使用短键**

&nbsp;&nbsp;&nbsp;&nbsp;脚手架默认开启了代码分割与懒加载，所以，即使你不使用前缀也不用担心 `id` 冲突。例如：

```typescript
// /src/locales/zh-CN/index.ts
const zh_CN : Locale = {
  Hello: "你好"
};
```
**使用翻译字符串作为键**

&nbsp;&nbsp;&nbsp;&nbsp;对于有大量翻译需求的应用，如果每条翻译语句都要一一使用 `短键` 来定义，那么当你在组件中尝试去引用这些 `短键` 的时候，很容易变得混乱。其次，如果你的备用语言是英语，那么，即使你没有创建英语语言包也可以更好的使用 `id` 作为回退文案。因此，**建议你使用翻译字符串作为键** 来定义语言包文件。例如：

```typescript
// /src/locales/zh-CN/index.ts
const zh_CN : Locale = {
  "Hello World!": "你好，世界！"
};
```

#### 检索翻译字符串

&nbsp;&nbsp;&nbsp;&nbsp;你可以使用 [react-intl API](https://github.com/formatjs/react-intl/blob/master/docs/API.md) 或组件从语言文件中检索，例如：

```tsx
import React from 'react';
import { useIntl, FormattedMessage } from 'react-intl';

export default () => {

  const intl = useIntl();

  return (
    <div>{intl.formatMessage({ id: 'Hello Wolrd!' })}</div>

    // 组件的方式
    // <FormattedMessage id="Hello Wolrd!" />
  );
}
```

**翻译字符串中的参数替换**

&nbsp;&nbsp;&nbsp;&nbsp;如果需要，你可以在翻译字符串中定义占位符。所有的占位符使用花括号包裹 `{}` 。例如，你可以使用占位符 `name` 定义欢迎消息：

```typescript
// /src/locales/zh-CN/index.js
export default {
  "Hello": "你好，{name}!"
};
```

&nbsp;&nbsp;&nbsp;&nbsp;现在，你可以传递 `values` 参数，它会将值替换到翻译字符串的占位符中：

```tsx
import React from 'react';
import { useIntl, FormattedMessage } from 'react-intl';

export default () => {

  const intl = useIntl();

  return (
    <div>{intl.formatMessage({ id: 'Hello' }, { name: '世界' })}</div>

    // 组件的方式
    // <FormattedMessage id="Hello" values={{ name: '世界' }} />
  );
}
```

&nbsp;&nbsp;&nbsp;&nbsp;使用方法先介绍到这里，你还可以通过 [react-intl 文档](https://github.com/formatjs/react-intl/blob/master/docs/README.md) 去探索更多高级用法。

#### 搭建步骤

&nbsp;&nbsp;&nbsp;&nbsp;首先，我们需要安装相关依赖包

```shell
yarn add react-intl @loadable/component
```

&nbsp;&nbsp;&nbsp;&nbsp;接下来，准备一些辅助函数

```typescript
// /src/utils/locale.ts

// 解析路由路径到语言文件名称
function getNameFromPath(path: string) => string;

// 获取当前的区域设置
function getLocale(fallback: string) => string;

// 检查语言环境是否为给定值
function isLocale(locale: string) => boolean;

// 设置区域
function setLocale(locale: string) => void
```

### 最低可支持 IE9 <a id="IE9"></a>

😂 当你面对低版本浏览器报错时，是不是内心极度焦躁？haha~ 我也经历过这样的煎熬。现在，请你放松我将为你梳理出最佳解决方案，让你可以轻松解决任何报错。首先，我们先来了解下为什么会出现这样的报错？

😎 其根本原因源自你使用了最新的 `Javascript` 语法。为了支持新语法，我们会使用 `babel` 来编译 `Javascript`，但是 `babel` 不会编译运行时的扩展，例如 `Promise`、`Set`、`Map` 等等。这些需要我们自己来解决，通常有以下两个方案解决：

  1. 构建时：[core-js](https://www.npmjs.com/package/core-js) 与 [regenerator-runtime](https://www.npmjs.com/package/regenerator-runtime)
  2. 运行时: [polyfill.io](https://polyfill.io/) 或 [alicnd](https://polyfill.alicdn.com) **推荐**  

我将方案分成，**构建时** 与 **运行时**。构建时可以通过搭配 [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env) 来使用，它会将所有所需的运行时扩展打包，这种方式不取决于浏览器环境，所以通常我们会获得臃肿的 `polyfill` 代码。

运行时，它会根据浏览器环境动态返回所需的 `polyfill` 代码，这意味着你可以按需加载，从而减少不必要的 `polyfill` 代码打包。受益的同时，你还需要承担第三方服务器延迟的或宕机的风险。幸运的是这种风险只会影响低版本浏览器的受众。

现在，我想你已经有了自己的决断。接下来，我将逐步讲解如何让本脚手架支持 `IE9`。讲解前，我们先来了解下依赖包对浏览器支持的情况：

包名 | 最低支持 | polyfills
---|---|---
[react-dom@>=16.0.0](https://zh-hans.reactjs.org/docs/react-dom.html#browser-support) | IE9+ | [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)、[Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
[react-intl@>=4.0.0](https://github.com/formatjs/react-intl/blob/master/docs/Getting-Started.md#runtime-requirements) | IE11+ | Intl
[@loadable/components](https://loadable-components.com/docs/faq/#which-browsers-are-supported) | IE9+ | Map、Set

### 服务端渲染 <a id="ssr"></a>

> 参考：[Loadable Components 服务器端渲染指南](https://loadable-components.com/docs/server-side-rendering/)

代码分割的好处，是可以实现懒加载。[@loadable/components](https://www.npmjs.com/package/@loadable/components) 提供了很好的服务端渲染支持，根据指南我们首先安装指定的依赖包：

```shell
yarn add @loadable/server@^5.12.0

yarn add -D @loadable/babel-plugin@^5.12.0 @loadable/webpack-plugin@^5.12.0 
```

**注意：** 脚手架默认安装了这些依赖，并设定了配置。如果你不需要服务端渲染，仅需删除上述依赖包即可，无需对 `webpack` 和 `babel` 的配置做任何修改。

### 声明文件

如果一个类型需要多处引用，建议使用全局声明文件替代。全局声明文件放置在 `typings` 文件夹内。编写全局声明文件时，不可使用 `import` 和 `export` 等模块关键字，否则会当成模块处理。具体请参见：[issue](https://github.com/microsoft/TypeScript/issues/37294)


### 路由匹配

下面规则表是假定 `exact`、`strict`、`sensitive` 分别为 `true` 时的匹配情况。如果有一项不匹配则最终结果均为不匹配。

URL | 路由 | exact | strict | sensitive | 说明
---|---|---|---|---|---
/post | /post | ✔️ | ✔️ | ✔️ | 
/post/ | /post | ✔️ | ❌ | ✔️ | strict 模式下必须全匹配包括结尾的 `/`
/**P**ost | /post | ✔️ | ✔️ | ❌ | sensitive 模式下区分大小写
/post/1 | /post | ❌ | ✔️ | ✔️ | exact 模式下访问子路由不会匹配父路由，如果子路由在父路由的包裹子路由也不会匹配
