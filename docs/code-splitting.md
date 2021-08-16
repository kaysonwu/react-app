# 代码分离

代码分离是 [webpack](https://webpack.js.org/) 中最引人注目的特性之一。此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，会极大影响加载时间

目前脚手架的代码分离主要采用了以下方式:

- [防止重复](#防止重复): 使用 [SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/) 去重和分离 chunk。
- [动态导入](#动态导入): 通过模块的内联函数调用来分离代码

## 防止重复

[SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/) 插件可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk

目前脚手架的防止重复拆分方式主要应用于：

- `node_modules` 第三方库

具体的实现方式，可以参考 `webpack.config.babel.ts` 文件中的 `optimization.splitChunks` 配置

## 动态导入

当涉及到动态代码拆分时，脚手架采用的是 [webpack](https://webpack.js.org/) 推荐选择的方式：使用符合 [ECMAScript 提案](https://github.com/tc39/proposal-dynamic-import) 的 [import()](https://webpack.js.org/api/module-methods/#import-1) 语法来实现动态导入

目前脚手架的动态导入拆分方式主要应用于：

- 页面
- 国际化语言文件

具体的实现方式，可以参考 [懒加载](#lazy-loading.md)

<p align="center">
<br />
<a href="/docs/testing.md"><< 自动化测试</a>
&emsp;&emsp;&emsp;&emsp;
<a href="/docs/lazy-loading.md">懒加载 >></a>
</p>
