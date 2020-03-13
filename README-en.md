[中文](https://github.com/kaysonwu/react-app/3.x) | 

## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 11 ✔ |

It is an enterprise level scaffold, more like a framework. With this document, you can easily get started to master. At the end of the document, I recorded my experience in building this scaffold. I hope it can help you.

## Features

- 📦 [Out of the box](#usage)
- 🌳 [Build based on typescript](http://www.typescriptlang.org/)
- 🌷 [Built in antd UI framework](https://ant.design/)
- ✂️ [Code splitting](#code-splitting)
- 🚀 [Lazy loading](#lazy-loading)
- 🌏 [Internationalization](#i18n-cn)
- 📌 [Minimum support IE9](#IE9)
- 🍔 [Dva type data stream](#dva)
- 🎯 [Server side render](#ssr)
- 🌟 [Support mock](#ssr)
- 🐛 [Testable](#test)

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
├── config                              // Config directory
│   ├── routes.ts                   
│   ├── webpack.dev.js            
│   ├── webpack.js           
│   └── webpack.prod.js
├── mocks                               // Mock directory
├── public                              // build & asset directory
│   ├── images/
│   ├── .gitignore
│   └── update-browser.html             // Old browser tips
├── src                                 // Source code directory
│   ├── components                      // Component directory
│   ├── locales                         // Language directory
│   │   ├── zh-CN                       
│   │   │   └── validation.ts
│   │   └── zh-CN.ts       
│   ├── models                  
│   ├── pages
│   │   ├── user                        // user example page
│   │   │   ├── index.less
│   │   │   └── index.tsx
│   │   └── home                        // Home example page
│   │       ├── index.less
│   │       └── index.tsx
│   ├── typings                        // Typescript declaration files
│   ├── utils
│   │   ├── locale.ts
│   │   └── request.ts
│   ├── indedx.html                     // HTML template 
│   └── index.tsx                       // Application entry
├── tests                               // Test directory
├── .gitignore
├── package.json
├── README-en.md                        // English document
├── README.md                           // 中文版文档
├── tsconfig.json                       // Typescript config
└── yarn.lock                           // yarn cache  
```

## Packages

package | Description | Production | Determine Version
---|---|---|---
[antd](https://www.npmjs.com/package/antd) | UI framework | ✔️
[axios](https://www.npmjs.com/package/axios) | Promise based HTTP client for the browser and node.js | ✔️
[classnames](https://www.npmjs.com/package/classnames) | conditionally joining `classNames` together | ✔️ 

## Notes

