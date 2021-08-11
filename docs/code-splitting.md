## 代码分离

> 参考文献： [webpack 代码分离](https://webpack.docschina.org/guides/code-splitting/)、[import 语法](https://webpack.docschina.org/api/module-methods#import-)、[webpack 使用不同语言进行配置](https://webpack.docschina.org/configuration/configuration-languages/)

本脚手架选用 webpack 推荐的方式，使用符合 [ECMAScript 提案](https://github.com/tc39/proposal-dynamic-import) 的 `import()` 语法来实现动态导入。接下来，就开始逐步讲解，如何实现代码分离的。

### 编译

#### Typescript

使用 [ts-loader](https://www.npmjs.com/package/ts-loader) 编译 Javascript 代码时，首先，需要在 `tsconfig.json` 配置文件中将 `module` 设置为 `ESNext`。该选项是防止 `typescript` 编译 `import()` 语法。

```json
{
  "compilerOptions": {
    ...
    "module": "ESNext"
  }
}
```

**注意**：更改此选项将导致 `webpack` 使用 `typescript` 语言所编写的配置文件出现编译错误。这是因为 `node.js` 无法识别 `import` 和 `export` 等 `ES6` 模块语法。修复该错误有两个方法：

1. **【推荐】** 不使用 typescript 语言编写配置文件。因为配置文件属于低频类型。
2. 使用 [tsconfig-paths](https://www.npmjs.com/package/tsconfig-paths) 为 [ts-node](https://www.npmjs.com/package/ts-node) 单独指定一个 `typescript` 配置文件

   ```shell
   // 添加配置文件编译依赖包
   yarn add -D ts-node@^8.0.0

   // 添加为 ts-node 提供独立配置的依赖包
   yarn add -D tsconfig-paths@^3.0.0 cross-env@^7.0.0

   // 添加声明文件
   yarn add -D @types/webpack@^4.0.0 @types/webpack-dev-server@^3.1.0 @types/webpack-merge@^4.1.0 @types/html-webpack-plugin@^3.2.0
   ```

   **./config/tsconfig-for-webpack.json**

   ```json
   {
     "compilerOptions": {
       "module": "commonjs",
       "target": "es5",
       "esModuleInterop": true
     }
   }
   ```

   **package.json**

   ```json
   {
     "scripts": {
       "dev": "cross-env TS_NODE_PROJECT=\"./config/tsconfig-for-webpack.json\" webpack-dev-server --mode=development --config=./config/webpack.ts",
       "build": "cross-env TS_NODE_PROJECT=\"./config/tsconfig-for-webpack.json\" webpack --mode=production --config=./config/webpack.ts"
     }
   }
   ```

#### Babel

使用 [babel-loader](https://www.npmjs.com/package/babel-loader) 编译 Javascript 代码时，应该将 [modules](https://babeljs.io/docs/en/babel-preset-env#modules) 设置为 `false` 以防止 [babel](https://babeljs.io/) 编译 `import()` 语法

### 使用

`webpack` 不需要特别的配置，就能编译 `import()` 语法了，接下来，通过参考 [react-loadable](https://github.com/thejameskyle/react-loadable) 或 [@loadable/component](https://loadable-components.com/docs/getting-started/) 的文档，来使用 `import()` 即可。

另外，`webpack` 针对 `import()` 语法编译，还提供了 [魔术注释](https://webpack.docschina.org/api/module-methods#magic-comments)，它可以帮助你更好的命名 `bundle` 与优化模块的加载方式。

```typescript
import(
  /* webpackChunkName: "pages/[request]" */
  'module'
);
```

上面示例，用 `webpackChunkName` 选项指定了新的 `chunk` 名称，并将该 `bundle` 存放至 `pages` 文件夹内。 从 `webpack 2.6.0` 开始，魔术注释加入了 `[index]` 和 `[request]` 占位符，分别支持赋予一个递增的数字和实际解析的文件名。
