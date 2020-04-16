## 条件编译

—般情况下，源程序中的每一行代码都要参加编译。但有时候出于对程序代码优化或面向环境的考虑，希望只对其中一部分内容进行编译。此时就需要在程序中加上条件，让编译器只对满足条件的代码进行编译，将不满足条件的代码舍弃，这就是条件编译。

[webpack-preprocessor-loader](https://github.com/afterwind-io/preprocessor-loader) 为 `Javascript` 提供了类似 `C` 语言的条件编译指令，通过这些指令可以很轻松的拆分出客户端和服务端运行时所需的代码。

例如：在处理懒加载的时候，通常需要使用 [错误边界](https://zh-hans.reactjs.org/docs/error-boundaries.html) 来捕获错误以防止整个应用崩溃，但是它不支持服务端渲染。这意味着错误边界部分的代码对服务端是毫无意义的，为了剥离出这部分代码，只需使用条件编译指令即可。

```tsx
import React from 'react';
import loadable from '@loadable/component';
import ErrorBoundary from './boundary';

const Locale = loadable.lib(
  (props: any) => import(/* webpackChunkName: "locales/[request]" */`@/locales/${props.path}`),
  {
    cacheKey: props => `locales/${props.path}`
  }
);

interface Props {
  paths: string[];
  children: (messages: ILocale) => React.ReactNode;
}

export default ({ paths, children  }: Props) => {
  return paths.reduceRight((fn, path) => {
    return (messages: ILocale) => {
      return (
        // #!if browser
        <ErrorBoundary fallback={() => fn(messages)}>
        {/* #!endif */}
          <Locale path={path}>
            { ({ default: m }: any) => fn({ ...messages, ...m }) }
          </Locale>
        {/* #!if browser */}
        </ErrorBoundary>
        // #!endif
      );
    }
  }, children)({}) as JSX.Element;
}
```

[browser](#预置的变量) 是预置的变量，通过 [webpack-preprocessor-loader params](https://github.com/afterwind-io/preprocessor-loader#params) 选项所定义的，用来区分编译的目标环境。

### 内置指令

`#!if` / `#!else` / `#!elseif` / `#!endif`

首先，在 `config/webpack.js` 文件中为 [webpack-preprocessor-loader](https://github.com/afterwind-io/preprocessor-loader#options) 添加 [params](https://github.com/afterwind-io/preprocessor-loader#params) 选项：

```js
...
{
  loader: 'webpack-preprocessor-loader',
  options: {
    params: { 
      browser: true,
    },
  },
},
```

然后，使用这个 `browser` 变量进行判断：

```js
// #!if browser
console.log('hello browser!');
// #!else
console.log('hello world!');
// #!endif
```

上面的代码编译结果为：

```js
console.log('hello browser!');
```

### 预置的变量

- `ssr`：确定当前编译的运行目标是否要支持服务端渲染
- `browser`：确定当前编译的运行目标是否为浏览器
- `NODE_SERVER`：确定当前编译的运行目标是否为 Node HTTP 服务器

### 自定义指令

通过 [directives](https://www.npmjs.com/package/webpack-preprocessor-loader#directives) 选项自定义指令

```js
...
{
  loader: 'webpack-preprocessor-loader',
  options: {
    directives: {
      secret: false,
    },
  },
},
```

使用指令：

```js
// #!secret
console.log('wow');  // 这一行代码将被省略
```

**注意**：自定义指令仅影响其下一行代码，这意味着：

```js
// #!secret
console.log('Removed'); // 这一行代码将被省略
console.log('Kept');   // 这一行代码将被保留
```
