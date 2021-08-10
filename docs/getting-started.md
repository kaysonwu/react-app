## 入门指南

### 安装

<details>
<summary>推荐使用 <a href="https://github.com/yarnpkg/yarn" target="_blank">yarn</a> 去管理依赖</summary><br />
 
如果你还没有安装 [yarn](https://github.com/yarnpkg/yarn), 请参考 [yarn 安装指南](https://yarnpkg.com/en/docs/install) 或者直接使用以下命令安装：

```shell
npm install -g yarn
```
</details>
<br />

通过 `git` 下载脚手架代码：

```shell
git clone https://github.com/kaysonwu/react-app.git
```

安装依赖包

```shell
yarn intall
```

### 部署

通过脚本命令编译源代码，如果需要使用服务端渲染，则需要启动服务器，具体命令如下：

```shell
// 编译代码
yarn build

// 启动服务器
yarn start
```

### 开发

我们推荐你使用 [Visual Studio Code](https://code.visualstudio.com/) 作为代码编辑器，然后你还需要为编辑器安装以下插件：

- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
- [EditorConfig for VS Code
](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [Todo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)

现在，你的编辑器已经准备就绪了。不过，由于本脚手架是基于 [Typescript](http://www.typescriptlang.org/) 和 [React](https://reactjs.org/) 构建而成的，这意味着你必须熟悉以下技术栈：

- [Typescript](http://www.typescriptlang.org)
- [React](https://reactjs.org)
- [NodeJS](https://nodejs.org)

🥳 好了，一切就绪，开始我们的开发之旅吧～

1. 启动开发服务器

    ```shell
    yarn dev
    ```

2. 在 `src/pages` 目录里新建一个 `home` 文件夹

    ```shell
    mkdir ./src/pages/home
    ```

3. 然后，在 `home` 文件夹里创建一个 `index.tsx` 文件，并写上一些代码

   ```tsx
    vi ./src/pages/home/index.tsx

    import React, { FC } from 'react';
    import { FormattedMessage } from 'react-intl';

    const Home: FC = () => (
      <>
        <FormattedMessage id="Hello React and Typescript!" />
      </>
    );

    export default Home;
   ``` 

4. 最后，在 `src/components/application/router.tsx` 文件中，为 `home`
 页面配置路由

    ```tsx
    vi src/components/application/router.tsx
    
    import React, { FC } from 'react';
    import { Switch, Route, Redirect } from 'react-router-dom';
    import Page from '../loadable/page';

    const Router: FC = () => {
      return (
        <Switch>
          ...
          <Route exact path="/home">
            <Page path="home" />
          </Route>
          ...
        </Switch>
      );
    };

    export default Router;
    ```

### 目录结构

```
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
│   ├── typings                         //  Typescript 全局声明文件
│   │   ├── api.d.ts                    //    API
│   │   ├── locale.d.ts                 //    国际化
│   │   └── store.d.ts                  //    数据
│   │
│   ├── utils                           //  应用工具箱 
│   │   ├── loadable.ts                 //    代码拆分
│   │   ├── locale.ts                   //    国际化
│   │   ├── route.ts                    //    路由
│   │   ├── store.ts                    //    数据
│   │   ├── string.ts                   //    字符串辅助函数
│   │   └── util.ts                     //    辅助函数
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
├── ..prettierrc                        // Prettier 配置文件
├── .stylelintrc                        // Stylelint 配置文件
├── babel.config.js                     // Babel 配置文件
├── LICENSE                             // 开源协议
├── package.json
├── README.md                           // 自述文档
├── tsconfig.json                       // Typescript 配置
└── yarn.lock                           // yarn 依赖包缓存        
```

<div style="clear: both; margin: 16px 0;">
  <div style="float: left;">
    <a href="docs/README.md"><< 文档</a>
  </div>
  <div style="float: right">
    <a href="docs/hooks.md">Hooks 数据流 >></a>
  </div>
</div>
