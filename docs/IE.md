## 兼容 IE9

😂 当你面对低版本浏览器报错时，会不会感觉 **丈二的和尚摸不着头脑**？如何没有？那你可能不需要看这篇文章，因为你已经可以游刃有余的去处理这些问题了。

### 为什么报错？

😎 浏览器高版本运行时正常，低版本运行时就报错，其根本原因源自你 **使用了最新的 `Javascript` 特性**。

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
[String.padStart()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padStart) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/String/prototype/padStart/polyfill.js)
[String.padEnd()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/String/prototype/padEnd/polyfill.js)
[String.repeat()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/repeat) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/String/prototype/repeat/polyfill.js)
[String.matchAll()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll) | Edge | [Regex](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec)
[String.trimStart()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/trimLeft) | Edge | [String.replace(/^\s+/g, '')](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
[String.trimEnd()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/trimRight) | Edge | [String.replace(/\s+$/g, '')](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
[String.raw()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/raw) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/String/raw/polyfill.js)
[Number.isFinite()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Number/isFinite/polyfill.js)
[Number.isNaN()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Number/isNaN/polyfill.js)
[Number.parseInt()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt) | Edge | [parseInt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)
[Number.parseFloat()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat) | Edge | [parseFloat](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseFloat)
[Number.isInteger()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Number/isInteger/polyfill.js)
[Number.EPSILON()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON) | Edge | Math.pow(2, -52)
[Number.isSafeInteger()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Number/isSafeInteger/polyfill.js)
[Math.trunc()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Math/trunc/polyfill.js)
[Math.sign()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/sign) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Math/sign/polyfill.js)
[Math.cbrt()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/cbrt) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Math/cbrt/polyfill.js)
[Math.clz32()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Math/clz32/polyfill.js)
[Math.imul()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/imul) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Math/imul/polyfill.js)
[Math.fround()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/fround) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Math/fround/polyfill.js)
[Math.hypot()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/hypot) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Math/hypot/polyfill.js)
[Math.expm1()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/expm1) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Math/expm1/polyfill.js)
[Math.log1p()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/log1p) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Math/log1p/polyfill.js)
[Math.log10()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/log10) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Math/log10/polyfill.js)
[Math.log2()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/log2) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Math/log2/polyfill.js)
[Math.sinh()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/sinh) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Math/sinh/polyfill.js)
[Math.cosh()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/cosh) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Math/cosh/polyfill.js)
[Math.cosh()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/cosh) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Math/cosh/polyfill.js)
[Math.tanh()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/tanh) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Math/tanh/polyfill.js)
[Math.asinh()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/asinh) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Math/asinh/polyfill.js)
[Math.acosh()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/acosh) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Math/acosh/polyfill.js)
[Math.atanh()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/atanh) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Math/atanh/polyfill.js)
[Array.from()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Array/from/polyfill.js)
[Array.of()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/of) | Edge | [Array.slice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
[Array.copyWithin()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Array/prototype/copyWithin/polyfill.js)
[Array.find()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Array/prototype/find/polyfill.js)
[Array.findIndex()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Array/prototype/findIndex/polyfill.js)
[Array.fill()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Array/prototype/fill/polyfill.js)
[Array.entries()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/entries) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Array/prototype/entries/polyfill.js)
[Array.keys()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/keys) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Array/prototype/keys/polyfill.js)
[Array.values()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/values) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Array/prototype/values/polyfill.js)
[Array.includes()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Array/prototype/includes/polyfill.js)
[Array.flat()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Array/prototype/flat/polyfill.js)
[Array.flatMap()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Array/prototype/flatMap/polyfill.js)
[Object.is()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Object/is/polyfill.js)
[Object.assign()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Object/assign/polyfill.js)
[Object.getOwnPropertyDescriptors()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Object/getOwnPropertyDescriptors/polyfill.js)
[Object.setPrototypeOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) | IE11 | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Object/setPrototypeOf/polyfill.js)
[Object.values()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/values) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Object/values/polyfill.js)
[Object.entries()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Object/entries/polyfill.js)
[Object.fromEntries()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries) | Edge | [Polyfill](https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Object/fromEntries/polyfill.js)
<br />
</details>

<details>
<summary>2. 安装第三方库时应优先选择兼容运行环境的版本</summary><br />

包名 | 最低支持 | polyfills
---|---|---
[react-dom@>=16.0.0](https://zh-hans.reactjs.org/docs/react-dom.html#browser-support) | IE9+ | [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)、[Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
[react-intl@>=4.0.0](https://github.com/formatjs/react-intl/blob/master/docs/Getting-Started.md#runtime-requirements) | IE11+ | Intl
[@loadable/components](https://loadable-components.com/docs/faq/#which-browsers-are-supported) | IE9+ | Map、Set
<br />
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

由于每个项目所依赖的第三库以和扩展方法是不同的，所以无法一一去列举步骤，你只要遵循  [三大原则](#三大原则) 并了解所需的 `polyfill`，然后使用 [运行时](#运行时) 去完成 `polyfill` 的引入即可。
