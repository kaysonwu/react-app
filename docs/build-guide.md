
### 路由匹配

下面规则表是假定 `exact`、`strict`、`sensitive` 分别为 `true` 时的匹配情况。如果有一项不匹配则最终结果均为不匹配。

URL | 路由 | exact | strict | sensitive | 说明
---|---|---|---|---|---
/post | /post | ✔️ | ✔️ | ✔️ | 
/post/ | /post | ✔️ | ❌ | ✔️ | strict 模式下必须全匹配包括结尾的 `/`
/**P**ost | /post | ✔️ | ✔️ | ❌ | sensitive 模式下区分大小写
/post/1 | /post | ❌ | ✔️ | ✔️ | exact 模式下访问子路由不会匹配父路由，如果子路由在父路由的包裹子路由也不会匹配