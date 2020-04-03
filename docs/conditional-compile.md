## 条件编译

&nbsp;&nbsp;&nbsp;&nbsp;—般情况下，源程序中的每一行代码都要参加编译。但有时候出于对程序代码优化或面向环境的考虑，希望只对其中一部分内容进行编译。此时就需要在程序中加上条件，让编译器只对满足条件的代码进行编译，将不满足条件的代码舍弃，这就是条件编译。

&nbsp;&nbsp;&nbsp;&nbsp;[webpack-preprocessor-loader](https://github.com/afterwind-io/preprocessor-loader) 为 `Javascript` 提供了类似 `C` 语言的条件编译指令，你可以通过这些指令拆分客户端及服务端的渲染代码。在处理懒加载的时候，通常需要使用 [错误边界](https://zh-hans.reactjs.org/docs/error-boundaries.html) 来捕获错误以防止整个应用崩溃，但是它不支持服务端渲染。这意味着错误边界部分的代码对服务端是毫无意义的，为了剥离出这部分代码，只需使用条件编译指令即可。

```tsx
import React from 'react';
// #!if browser
import ErrorBoundary from './boundary';
// #!endif
import { LocaleFile } from '@/utils/loadable';

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
          <LocaleFile path={path}>
            { ({ default: _ }: any) => fn({ ...messages, ..._ }) }
          </LocaleFile>
        {/* #!if browser */}
        </ErrorBoundary>
        // #!endif
      );
    }
  }, children)({}) as JSX.Element;
}
```

`browser` 变量，是 [webpack-preprocessor-loader](https://github.com/afterwind-io/preprocessor-loader) `params` 选项的自定义变量，用来区分代码运行环境。
