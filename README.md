<h1 align="center">React app</h1>

<p align="center">
<img src="https://img.shields.io/badge/tests-developing-green?logo=github" alt="Build Status">
<img src="https://img.shields.io/badge/license-MIT-green" alt="License" />
</p>

&nbsp;&nbsp;&nbsp;&nbsp;用于开发 [React](https://www.reactjs.org/) 应用程序的企业级脚手架。它形似 [umi](https://umijs.org)，但实际上，它是一个 Unopinionated 脚手架，这意味着你拥有一切权利，可以自由改造。更详细的说明，请参阅 [完整文档](docs/README.md)

## 🖥 兼容环境

| ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
| --- | --- | --- | --- | --- | --- |
| Last 2 versions ✔ | Last 2 versions ✔ | Last 2 versions ✔ | Last 2 versions ✔ | Last 2 versions ✔ | IE11, Edge ✔ |

> 通过 [条件编译](docs/conditional-compile.md) 可以实现客户端与服务端之间的无缝渲染切换

## ✨ 特性

- 📦 [开箱即用](docs/getting-started.md)
- 🌳 [基于 Typescript 构建](http://www.typescriptlang.org/)
- 🌷 [内置 antd UI 框架](https://ant.design/)
- 🌹 [一致的代码风格](docs/code-style.md)
- ✂️ [代码分割](docs/code-splitting.md)
- 🚀 [懒加载](docs/lazy-loading.md)
- 🌏 [国际化](docs/i18n.md)
- 🍔 [Hooks 数据流](docs/hooks.md)
- 🎯 [服务端渲染](docs/ssr.md)
- 💎 [条件编译](docs/conditional-compile.md)
- 🌟 [数据模拟](docs/mock.md)
- 🐛 [自动化测试](docs/testing.md)
- 📌 [最低可支持 IE9](docs/compat.md)

## 📦 安装

1. 下载脚手架

   ```shell
   git clone https://github.com/kaysonwu/react-app.git [project-name]
   ```

2. 安装依赖包

   ```shell
   yarn install
   ```

## ⌨️ 本地开发

<details>
<summary>目录结构</summary><br />

```text
├── docs                                // 文档目录
│
├── mocks                               // 模拟数据目录
│
├── public                              // 客户端构建目录
│   ├── images/
│   ├── .gitignore
│   └── update-browser.html             // 浏览器升级提示页面
│
├── server                              // 服务端构建目录
│
├── src                                 // 源代码目录
│   ├── components                      //  组件目录
│   │   ├── application                 //    应用
│   │   │   ├── context.tsx             //      上下文
│   │   │   ├── index.tsx               //
│   │   │   └── route.tsx               //      路由
│   │   │
│   │   ├── loadable                    //    代码拆分
│   │   │   ├── locale.tsx              //      国际化
│   │   │   └── page.tsx                //      页面
│   │   │
│   │   └── locale-provider             //    国际化
│   │       └── index.tsx
│   │
│   ├── locales                         //  国际化语言存放目录
│   │   └── zh-CN                       //    简体中文
│   │       ├── home.ts                 //      home 页面翻译
│   │       └── index.ts                //      公用翻译
│   │
│   ├── pages                           //  页面目录
│   │   ├── exception                   //    异常页面
│   │   │   ├── 403.tsx
│   │   │   ├── 404.tsx
│   │   │   └── 500.tsx
│   │   └── home                        //    Home 示例页面
│   │       └── index.tsx
│   │
│   ├── rules                           //  `antd` From 组件自定义验证规则
│   │
│   ├── services                        //  API 服务
│   │
│   ├── typings                         //  Typescript 全局声明文件
│   │   ├── api.d.ts                    //    API
│   │   ├── images.d.ts                 //    资源文件
│   │   ├── locale.d.ts                 //    国际化
│   │   └── store.d.ts                  //    数据
│   │
│   ├── utils                           //  应用工具箱
│   │   ├── loadable.ts                 //    代码拆分
│   │   ├── locale.ts                   //    国际化
│   │   ├── route.ts                    //    路由
│   │   ├── store.ts                    //    数据
│   │   └── string.ts                   //    字符串辅助函数
│   │
│   ├── indedx.html                     //  HTML 模板
│   ├── index.tsx                       //  入口文件
│   └── server.tsx                      //  服务器文件
│
├── tests                               // 测试目录
├── .editorconfig                       // EditorConfig 配置文件
├── .eslintrc                           // ESLint 配置文件
├── .gitignore                          // Git 忽略文件
├── .prettierignore                     // Prettier 忽略文件
├── .prettierrc                         // Prettier 配置文件
├── .proxy.ts.example                   // webpack-dev-server 代理配置示例文件
├── .stylelintrc                        // Stylelint 配置文件
├── babel.config.js                     // Babel 配置文件
├── LICENSE                             // 开源协议
├── package.json
├── README.md                           // 自述文档
├── tsconfig.json                       // Typescript 配置
└── yarn.lock                           // yarn 依赖包缓存
```

</details>
<br />

1. 启动开发服务器

   ```shell
     yarn dev
   ```

2. 在 `src/pages` 目录下新建页面目录及文件

   ```shell
   mkdir src/pages/home
   vi src/pages/home/index.tsx

   import React, { FC } from 'react';

   const HomeView: FC = () => <>Hello react!</>;

   export default HomeView;
   ```

3. 在 `src/components/application/router.tsx` 文件中为 `home` 页面配置路由

   ```shell
   vi src/components/application/router.tsx
   ...

   <Route path="home">
     <Page path="home" />
   </Route>
   ...
   ```

### 样式和资源

#### 使用 less

less 作为 css 的超集，提供了很多 css 没有功能，其中最方便的就是变量。在编写样式文件的时候，推荐优先使用 `antd` 的变量，如需对值进行调整则应该编辑 `package.json` 文件下的 `themes` 字段

```less
// antd 混合器
@import '~antd/lib/style/mixins/index.less';
// antd 主题变量
@import '~antd/lib/style/themes/index.less';

@captcha-prefix-cls: ~'@{ant-prefix}-captcha';

.@{captcha-prefix-cls} {
  // 如果是自定义组件，应当在第一层选择器使用 antd 提供的 reset-component 混合器
  .reset-component();

  &-text {
    // 优先使用 antd 提供的变量
    color: @text-color;
  }
}
```

#### 添加图片，字体和文件

在实际的开发中我们经常会用到一些静态文件，尤其是图片。推荐将这些图片文件放置在 `src/assets` 目录下，并通过 `import` 引入。

```text
import logo from './logo.png';

return <image src={logo} />;
```

### 后端集成

#### 模拟数据

数据模拟 (Mock) 是前端开发过程中必不可少的一环，是分离前后端开发的关键链路。通过预先跟服务器端约定好的接口，模拟请求数据甚至逻辑，能够让前端开发独立自主，不会被服务端的开发所阻塞。

模拟数据文件存放在工程根目录下的 `mocks` 文件夹内，文件名后缀支持 `.ts`、`.js`、`.json`。文件匹配的模式是根据 `请求路径` **自右向左** 依次匹配，找到文件即停止。

**例如：** 当请求 `/api/user` 时，将依次匹配 `user.ts`、`api.ts`，如果 `user.ts` 存在则不再寻找 `api.ts`。所以文件的命名应该是 `请求路径` 中所包含的字符。

具体使用方法请参考 [serve-mock](https://github.com/kaysonwu/serve-mock) 文档

#### 代理

复制 `.proxy.ts.example` 代理配置示例文件到 `.proxy.ts`，然后根据开发场景进行配置，配置完后需重启开发服务器

```shell
cp .proxy.ts.example .proxy.ts
```
