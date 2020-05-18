## 入门指南

### 安装

<details>
<summary>推荐使用 <a href="https://github.com/yarnpkg/yarn" target="_blank">yarn</a> 去管理依赖</summary><br />
 
如果你还没有安装 [yarn](https://github.com/yarnpkg/yarn), 请参考 [yarn 安装指南](https://yarnpkg.com/en/docs/install) 或者直接使用以下命令安装：

```
npm install -g yarn
```
</details>

<details>
<summary>如果你想在服务端渲染代码，还需要全局安装 <a href="https://github.com/Unitech/pm2" target="_blank">pm2</a> 来帮助你管理进程</summary><br />
  
```
yarn global add pm2
```
</details>

通过 `git` 下载脚手架代码：

```
git clone https://github.com/kaysonwu/react-app.git
```

接下来，安装依赖包：

```
yarn intall
```

### 第一个页面

页面都放置在 [src/pages](#目录结构) 文件夹内，你可以使用工匠命令快速创建一个页面：

```shell
yarn artisan make:page home
```

### 请求服务端数据

脚手架的数据管理统一交付给了模型，更详细的说明请阅读 [模型数据流](model.md)

### 目录结构

```
├── config                              // 配置目录 可以存放开发与应用配置              
│   ├── webpack.dev.js                  // webpack 开发配置
│   ├── webpack.js                      // webpack 配置
│   └── webpack.prod.js                 // webpack 生成配置
│
├── mocks                               // 模拟数据目录
│   ├── _utils_.js                      // Mock 工具箱
│   └── v1.js                           // 指向 /v1 路径的模拟数据
│
├── scripts                             // 脚本目录
│   ├── commands                        // 工匠命令目录
│   │   ├── templates                   //   模板文件
│   │   │   ├── model.tpl               //     模型
│   │   │   ├── node.tpl                //     node 入口
│   │   │   └── server.tpl              //     HTTP 服务器
│   │   ├── make-model.js               //   创建模型文件
│   │   ├── server-clear.js             //   清理 SSR
│   │   └── server-generate.js          //   生成 SSR
│   ├── utils                           // 工具目录
│   │   ├── artisan.js                  //     工匠
│   │   ├── file.js                     //     文件系统
│   │   ├── html.js                     //     HTML 模板
│   │   ├── message.js                  //     控制台消息
│   │   ├── package.js                  //     依赖包管理
│   │   ├── process.js                  //     进程管理
│   │   └──string.js                    //     字符串
│   ├── artisan.js                      // 工匠命令
│   └── build-server.js                 // 构建 HTTP 服务器命令
│
├── public                              // 客户端构建目录
│   ├── images/
│   ├── .gitignore
│   └── update-browser.html             // 浏览器升级提示页面
│
├── server                              // 服务端构建目录
│
├── src                                 // 源代码目录
│   ├── components                      // 组件目录
│   │   ├── application                 // 应用
│   │   │   ├── route.tsx               //   路由
│   │   │   └── index.tsx                
│   │   ├── dropdown-menu               // 下拉菜单
│   │   │   └── index.tsx
│   │   ├── icon                        // 图标
│   │   │   └── index.tsx
│   │   ├── loadable                    // 代码拆分
│   │   │   ├── boundary.tsx            //   错误边界
│   │   │   ├── locale.tsx              //   国际化
│   │   │   ├── model.tsx               //   模型
│   │   │   └── page.tsx                //   页面
│   │   ├── locale-provider             // 国际化
│   │   │   └── index.tsx
│   │   └── page                        // 页面
│   │       ├── footer.tsx              
│   │       ├── header.tsx
│   │       ├── index.less
│   │       └── index.tsx
│   │
│   ├── locales                         // 国际化语言存放目录
│   │   └── zh-CN                       
│   │       ├── home.ts                 // home 页面 zh-CN 语言
│   │       ├── user.ts                 // user 页面 zh-CN 语言
│   │       └── index.ts                // 公共 zh-CN  语言
│   │   
│   ├── models                          // 数据模型目录
│   │   ├── global.ts                   //   全局
│   │   ├── home.ts                     //   home 页面
│   │   └── user.ts                     //   user 页面
│   │   
│   ├── pages                           // 页面目录
│   │   ├── exception                   //   异常页面
│   │   │   └── 404.tsx                
│   │   ├── user                        // User 示例页面
│   │   │   └── index.tsx
│   │   └── home                        // Home 示例页面
│   │       └── index.tsx
│   │
│   ├── typings                         // Typescript 全局声明文件
│   │   ├── data.d.ts                   //   API
│   │   ├── locale.d.ts                 //   国际化
│   │   └── model.d.ts                  //   模型
│   │
│   ├── utils                           // 应用工具箱 
│   │   ├── loadable.ts                 //   代码拆分
│   │   ├── locale.ts                   //   国际化
│   │   ├── menu.ts                     //   菜单
│   │   ├── model.ts                    //   模型
│   │   ├── request.ts                  //   HTTP 客户端
│   │   ├── string.ts                   //   字符串辅助函数
│   │   └── util.ts                     //   辅助函数
│   ├── indedx.html                     // HTML 模板 
│   └── web.tsx                         // 客户端入口
│ 
├── tests                               // 测试目录
├── .eslintrc.js                        // eslint 配置文件
├── .gitignore
├── .stylelintrc.js                     // stylelint 配置文件
├── babel.config.js                     // Babel 全局配置
├── package.json
├── README.md                           // 自述文档
├── tsconfig.json                       // Typescript 配置
└── yarn.lock                           // yarn 依赖包缓存        
```
