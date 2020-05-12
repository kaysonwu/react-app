
## 国际化

&nbsp;&nbsp;&nbsp;&nbsp;首先，我们需要安装相关依赖包

```shell
yarn add react-intl @loadable/component
```

&nbsp;&nbsp;&nbsp;&nbsp;接下来，准备一些辅助函数

```typescript
// /src/utils/locale.ts

// 解析路由路径到语言文件名称
function getNameFromPath(path: string) => string;

// 获取当前的区域设置
function getLocale(fallback: string) => string;

// 检查语言环境是否为给定值
function isLocale(locale: string) => boolean;

// 设置区域
function setLocale(locale: string) => void
```

### 路由匹配

下面规则表是假定 `exact`、`strict`、`sensitive` 分别为 `true` 时的匹配情况。如果有一项不匹配则最终结果均为不匹配。

URL | 路由 | exact | strict | sensitive | 说明
---|---|---|---|---|---
/post | /post | ✔️ | ✔️ | ✔️ | 
/post/ | /post | ✔️ | ❌ | ✔️ | strict 模式下必须全匹配包括结尾的 `/`
/**P**ost | /post | ✔️ | ✔️ | ❌ | sensitive 模式下区分大小写
/post/1 | /post | ❌ | ✔️ | ✔️ | exact 模式下访问子路由不会匹配父路由，如果子路由在父路由的包裹子路由也不会匹配