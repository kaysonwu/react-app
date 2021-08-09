## 服务端渲染

与传统单页应用程序 (Single-Page Application) 相比，服务器端渲染 (SSR) 的优势主要在于：

- 更好的 SEO，由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面。
- 更快的内容到达时间 (time-to-content)，特别是对于缓慢的网络情况或运行缓慢的设备。

### 安装依赖

要使脚手架支持服务器端渲染，你需要先安装必要的依赖，比如 [@loadable/server](https://loadable-components.com/docs/server-side-rendering/) 以及其配套的插件，依赖安装如下所示：

```shell
yarn add @loadable/server@^5.14.0 serve-static@^1.13.0 && yarn add -D @loadable/babel-plugin@^5.12.0 @loadable/webpack-plugin@^5.14.0 @types/loadable__server@^5.12.0 @types/serve-static@^1.13.0 webpack-node-externals@^3.0.0 rollup@^2.55.0 @rollup/plugin-node-resolve@^13.0.0 @rollup/plugin-babel@^5.3.0 rollup-plugin-terser@^7.0.0
```

### 构建 & 运行

在 [生成服务端依赖](#生成服务端依赖) 后，会自动生成 **构建** 与 **运行** 服务端渲染代码的脚本命令：

```shell
yarn build --env ssr
```

### 卸载依赖

不想使用服务端渲染时。那么，针对不必要的服务端渲染依赖以及文件是可以被清理掉的，因为它们永远都不会被使用到，卸载依赖如下所示：

```shell
yarn remove @loadable/server serve-static @loadable/babel-plugin @loadable/webpack-plugin @types/loadable__server @types/serve-static webpack-node-externals rollup @rollup/plugin-node-resolve @rollup/plugin-babel rollup-plugin-terser
```
