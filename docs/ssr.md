## 服务端渲染

> 参考：[Loadable Components 服务器端渲染指南](https://loadable-components.com/docs/server-side-rendering/)

&nbsp;&nbsp;&nbsp;&nbsp;服务端渲染一个很常见的场景是当用户（或搜索引擎爬虫）第一次请求页面时，用它来做初始渲染。当服务器接收到请求后，它把需要的组件渲染成 HTML 字符串，然后把它返回给客户端（这里统指浏览器）。之后，客户端会接手渲染控制权。

&nbsp;&nbsp;&nbsp;&nbsp;在服务端渲染时，代码被分割后，需要懒加载[@loadable/server](https://www.npmjs.com/package/@loadable/components) 提供了很好的服务端渲染支持，根据指南我们首先安装指定的依赖包：

```shell
yarn add @loadable/server@^5.12.0

yarn add -D @loadable/babel-plugin@^5.12.0 @loadable/webpack-plugin@^5.12.0 
```

**注意：** 脚手架默认安装了这些依赖，并设定了配置。如果你不需要服务端渲染，仅需删除上述依赖包即可，无需对 `webpack` 和 `babel` 的配置做任何修改。