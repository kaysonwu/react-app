## 懒加载

> 参考文献：[webpack 懒加载](https://webpack.docschina.org/guides/lazy-loading/)

&nbsp;&nbsp;&nbsp;&nbsp;懒加载或者按需加载，是一种很好的优化网页或应用的方式。这种方式实际上是先把你的代码在一些逻辑断点处分离开，然后在一些代码块中完成某些操作后，立即引用或即将引用另外一些新的代码块。这样加快了应用的初始加载速度，减轻了它的总体体积，因为某些代码块可能永远不会被加载。

&nbsp;&nbsp;&nbsp;&nbsp;本脚手架使用了 [React](https://zh-hans.reactjs.org/docs/code-splitting.html#reactlazy) 官方推荐的代码拆分库 [@loadable/component](https://loadable-components.com)，并用它实现了页面、语言包、数据模型等代码的拆分与按需加载。接下来我将分别展示与之相关的代码。