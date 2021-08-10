## 懒加载

懒加载或者按需加载，是一种很好的优化网页或应用的方式。这种方式实际上是先把你的代码在一些逻辑断点处分离开，然后在一些代码块中完成某些操作后，立即引用或即将引用另外一些新的代码块。这样加快了应用的初始加载速度，减轻了它的总体体积，因为某些代码块可能永远不会被加载。

### 使用

脚手架选用了 [React](https://reactjs.org/docs/code-splitting.html#reactlazy) 官方推荐的 [Loadable Components](https://loadable-components.com) 库作为懒加载的底层支持，同时内置了页面、[语言文件](#i18n.md)等模块的懒加载组件，具体使用示例如下：

```tsx
import React from 'react';
import Locale from '@/components/loadable/locale';
import Page from '@/components/loadable/page';

// 懒加载 语言文件
// path 相对 src/locales 目录，index和后缀名可以省略
<Locale path="zh-CN/home" />

// 懒加载 Home 页面
// path 相对 src/pages 目录，index 和后缀名可以省略
<Page path="home" />
```

### 命名约定

`页面` 通常需要我们使用 `Page` 组件进行引入，而 `语言文件` 则只需要遵循命名约定即可完成自动加载。其中语言文件被细分为公共与页面两种文件类型，页面类型文件是可选的，如果存在则应当遵循以下命名约定：

路由| 语言文件
---|---
/  | {locale}/home.ts
/posts | {locale}/post.ts
/post/comments | {locale}/post-comment.ts

### 自定义命名约定

#### 公共文件

语言文件的公共文件是 `{locale}/index.ts` 它遵循了 [webpack](https://webpack.js.org/) 中的 [resolve.mainFiles](https://webpack.js.org/configuration/resolve/#resolvemainfiles) 配置，默认只传递语言文件目录，所以会自动定位到 `index.ts`，如果你想更改这个约定，请修改 `src/components/application/index.tsx` 中传递给 `LocaleProvider` 组件的 `files` 属性的变量 `files`，例如：

```javascript
// before
const files = page ? [locale, `${locale}/${page}`] : undefined;

// after
const files = page ? [`${locale}/{custom}`, `${locale}/${page}`] : [`${locale}/{custom}`];
```

#### 页面文件

更改页面文件的命名约定，只需要修改 `src/utils/loadable.ts` 中的 `getNameFromPath` 函数，例如：

```typescript
export function getNameFromPath(path: string): string {
  if (!path || path === '/') {
    return 'base'; // home => base
  }

  ...
}
```

以上修改后的约定将按以下格式进行匹配语言的页面文件

路由| 语言文件
---|---
/ | {locale}/base.ts
