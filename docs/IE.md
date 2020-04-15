## 兼容 IE9

😂 当你面对低版本浏览器报错时，会不会感觉 **丈二的和尚摸不着头脑**？如何没有？那你可能不需要看这篇文章，因为你已经可以游刃有余的去处理这些问题了。

### 为什么报错？

😎 浏览器高版本运行时正常，低版本运行时就报错，其根本原因源自你 **使用了最新的 `Javascript` 语法**。

### 三大原则

对浏览器进行降级兼容从技术层面上来说这是不可取的，但是从一个产品来说它又是必需的，为此你应当遵循以下三大原则：

<details>
<summary>1. 尽量不使用新增的扩展方法</summary><br />

方法 | 最低支持 | 替代方法
---|---|---
[String.includes()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/includes) | Edge | [String.indexOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf)
[String.fromCodePoint()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint) | Edge | [String.fromCharCode()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode)
[String.codePointAt()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt) | Edge | [String.charCodeAt()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt)
[String.startsWith()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith) | Edge | [String.substring()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/substring)
[String.endsWith()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith) | Edge | [String.substring()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/substring)
[String.normalize()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/normalize) | Edge | 无
[String.padStart()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padStart) | Edge | [Polyfill](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padStart#Polyfill)
[String.padEnd()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd) | Edge | [Polyfill](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd#Polyfill)
[String.repeat()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/repeat) | Edge | [Polyfill](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/repeat#填充)
[String.matchAll()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll) | Edge | [Regex](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec)
[String.trimStart()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/trimLeft) | Edge | [String.replace(/^\s+/g, '')](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
[String.trimEnd()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/trimRight) | Edge | [String.replace(/\s+$/g, '')](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
[String.raw()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/raw) | Edge | 无
</details>

<details>
<summary>2. 安装第三方库时应优先选择兼容运行环境的版本</summary><br />

包名 | 最低支持 | polyfills
---|---|---
[react-dom@>=16.0.0](https://zh-hans.reactjs.org/docs/react-dom.html#browser-support) | IE9+ | [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)、[Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
[react-intl@>=4.0.0](https://github.com/formatjs/react-intl/blob/master/docs/Getting-Started.md#runtime-requirements) | IE11+ | Intl
[@loadable/components](https://loadable-components.com/docs/faq/#which-browsers-are-supported) | IE9+ | Map、Set
</details>

<details>
<summary>3. 记录项目所需 Polyfill</summary><br />
俗话说：好记性不如烂笔头，养成良好的笔记习惯，可以让你游刃有余的去处理浏览器的兼容性问题
</details>

### 解决方案

为了支持新语法，我们会使用 [babel](https://babeljs.io/) 来编译 `Javascript`，但是 [babel](https://babeljs.io/) 不会编译运行时的扩展，例如 [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)、[Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map) 等等。这些需要我们通过 `Polyfill` 解决，通常有以下两个方案解决：

  1. 构建时：[core-js](https://www.npmjs.com/package/core-js) 与 [regenerator-runtime](https://www.npmjs.com/package/regenerator-runtime)
  2. 运行时：[polyfill.io](https://polyfill.io/) 或 [alicnd](https://polyfill.alicdn.com) **推荐**  

#### 构建时

通过搭配 [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env) 来使用，它会将所有所需的运行时扩展打包，这种方式不取决于浏览器环境，所以通常我们会获得臃肿的 `polyfill` 代码。

#### 运行时

它会根据浏览器环境动态返回所需的 `polyfill` 代码，这意味着你可以按需加载，从而减少不必要的 `polyfill` 代码打包。受益的同时，你还需要承担第三方服务器带来的延迟或宕机的风险。幸运的是这种风险只会影响低版本浏览器的受众，因为对于高版本浏览器来说它不需要任何的 `polyfill` 就能正常的运行起来。


### 如何去做？

由于每个项目所依赖的第三库以和扩展方法是不同的，所以无法一一去列举步骤，你应当遵循  [三大原则](#三大原则) 了解所需的 `polyfill` 并使用 [运行时](#运行时) 去完成 `polyfill` 的引入。
