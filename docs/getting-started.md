## 入门指南

### 安装

<details>
<summary>推荐使用 <a href="https://github.com/yarnpkg/yarn" target="_blank">yarn</a> 去管理依赖</summary>

如果你还没有安装 [yarn](https://github.com/yarnpkg/yarn), 请参考 [yarn 安装指南](https://yarnpkg.com/en/docs/install) 或者直接使用以下命令安装：

```
npm install -g yarn
```
</details>

<details>
<summary>如果你想在服务端渲染代码，还需要全局安装 <a href="https://github.com/Unitech/pm2" target="_blank">pm2</a> 来帮助你管理进程</summary>

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

### 目录结构

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
