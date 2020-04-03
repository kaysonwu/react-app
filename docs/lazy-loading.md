## 懒加载

懒加载或者按需加载，是一种很好的优化网页或应用的方式。这种方式实际上是先把你的代码在一些逻辑断点处分离开，然后在一些代码块中完成某些操作后，立即引用或即将引用另外一些新的代码块。这样加快了应用的初始加载速度，减轻了它的总体体积，因为某些代码块可能永远不会被加载。

### 命名约定

脚手架内置了页面、模型、语言文件等模块的懒加载，其中模型与语言文件被细分为公共与页面两种文件类型，页面类型文件是可选的，如果存在则应当遵循以下命名约定：

路由| 模型 | 语言文件
---|---|---
/ | home.ts | {locale}/home.ts
/post | post.ts | {locale}/post.ts
/post/comment | post-comment.ts | {locale}/post-comment.ts

### 自定义命名约定

#### 公共文件

模型的公共文件是 `src/models/global.ts` 它是直接通过 `import` 引用在了客户端入口文件 `src/index.tsx` 中，这意味着你可以直接通过重命名来更改约定，如果你想要在服务端渲染也生效你更改的名字，请修改 `src/node.tsx` 中传递给 `requireModels()` 函数的 `names` 参数的变量 `names`，例如：

```javascript
// before
const names = ['global', getNameFromPath(pathname as string)];

// after
const names = ['{custom}', getNameFromPath(pathname as string)];
```

语言文件的公共文件是 `{locale}/index.ts` 它遵循了 [webpack](https://webpack.js.org/) 中的 [resolve.mainFiles](https://webpack.js.org/configuration/resolve/#resolvemainfiles) 配置，默认只传递语言文件目录，所以会自动定位到 `index.ts`，如果你想更改这个约定，请修改 `src/components/application/index.tsx` 中传递给 `LocaleProvider` 组件的 `files` 属性的变量 `files`，例如：

```javascript
// before
const files = location ? [locale, `${locale}/${getNameFromPath(location.pathname)}`] : undefined;

// after
const files = location ? [`${locale}/{custom}`, `${locale}/${getNameFromPath(location.pathname)}`] : [`${locale}/{custom}`];
```

#### 页面文件

更改页面文件的命名约定，只需要修改 `src/utils/loadable.ts` 中的 `getNameFromPath` 函数，例如：

```typescript
export function getNameFromPath(path: string) {
  if (! path || path === '/') {
    return 'base'; // home => base
  }
  return path.replace(/^\/+/, '').replace('/', '.'); // - => .
}
```

以上修改后的约定将按以下格式进行匹配模型以及语言文件

路由| 模型 | 语言文件
---|---|---
/ | base.ts | {locale}/base.ts
/post | post.ts | {locale}/post.ts
/post/comment | post.comment.ts | {locale}/post.comment.ts
