## 兼容 IE9

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
