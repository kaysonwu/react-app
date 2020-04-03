## 入门指南

### 安装

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
