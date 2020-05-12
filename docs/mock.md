## 数据模拟

数据模拟 (Mock) 是前端开发过程中必不可少的一环，是分离前后端开发的关键链路。通过预先跟服务器端约定好的接口，模拟请求数据甚至逻辑，能够让前端开发独立自主，不会被服务端的开发所阻塞。

### 数据文件

模拟数据文件存放在工程根目录下的 [mocks](getting-started#目录结构) 文件夹内，文件名后缀支持 `.ts`、`.js`、`.json`。文件匹配的模式是根据 `请求路径` **自右向左** 依次匹配，找到文件即停止。  

**例如：** 当请求 `/api/user` 时，将依次匹配 `user.ts`、`api.ts`，如果 `user.ts` 存在则不再寻找 `api.ts`。所以文件的命名应该是 `请求路径` 中所包含的字符。

### 简单数据

通过实现 [serve-mock](https://github.com/kaysonwu/serve-mock) 的 `IMock` 接口，以获得更多的类型提示：

```ts
import { IMock } from 'serve-mock';

const mock: IMock = {
  'GET /api/users': [
    {id: 1, name: '曲丽丽'},
    {id: 2, name: '付小小'},
  ],
  'POST /api/users': '新建成功',
  'PUT /api/users': '更新成功',
  'DELETE /api/users': (res, req) => {
    res.statusCode = 204;
    res.end();
  },
};

export default mock;
```

**注意：** 因为 [webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server) 依赖于 [Express](http://expressjs.com/)，所以，当值是函数时将接收由 [Express](http://expressjs.com/) 优化过后的 [res](http://expressjs.com/en/4x/api.html#res) 和 [req](http://expressjs.com/en/4x/api.html#req) 对象，但是不建议使用它，这是因为 [Express](http://expressjs.com/) 是对 [http](https://nodejs.org/dist/latest-v12.x/docs/api/http.html) 的二次封装，其次，服务端渲染时 `server.tsx` 是通过 [http](https://nodejs.org/dist/latest-v12.x/docs/api/http.html) 创建的服务，所以，**使用优化后的对象属性及方法是不安全的**。

### 资源数据

需要对 [CURD](https://baike.baidu.com/item/CURD) 操作进行数据模拟时，你可能会这样去写：

```ts
import { IMock } from 'serve-mock';
import { parse } from 'url';

let data: any[] = [{ id: 1, name: 'zhangsan' }, { id: 2, name: 'lisi' }];
const mock: IMock = {
  // 获取所有用户 -> index
  'GET /api/users': (req, res) => {
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.write(JSON.stringify(data));
    res.end();
  },

  // 获取给定用户信息 -> show
  'GET /api/users/:id': (req, res) => {
    const { query } = parse(req.url, true);
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.write(JSON.stringify(data.find(u => u.id === query.id)));
    res.end();
  },

  // 创建一个用户 -> create
  'POST /api/users': (req, res) => {
    res.statusCode = 201;
    res.end();
  },

  // 更新给定用户的信息 -> update
  'PUT /api/users/:id': (req, res) => {
    res.statusCode = 201;
    res.end();
  },

  // 删除给定用户 -> delete
  'DELETE /api/users/:id': (req, res) => {
    res.statusCode = 204;
    res.end();
  }
};

export default mock;
```

现在，请改用 [resource](https://github.com/kaysonwu/serve-mock/blob/master/README-zh_CN.md#%E8%B5%84%E6%BA%90) 工具函数吧：

```ts
import { resource } from 'serve-mock/utils';

export default resource('/api/users');
```

更多用法，请参考 [serve-mock](https://github.com/kaysonwu/serve-mock#resource)

### 模拟出错

通过 [res.statusCode](https://nodejs.org/dist/latest-v12.x/docs/api/http.html#http_response_statuscode) 设置错误码即可模拟 http 请求出错

```ts
import { IMock } from 'serve-mock';

const mock: IMock = {
  'PUT /api/users': (req, res) => {
    res.statusCode = 204;
    res.end();
  },
};

export default mock;
```

### 模拟延迟

为了更加真实地模拟网络数据请求，往往需要模拟网络延迟时间。通过使用 [serve-mock](https://github.com/kaysonwu/serve-mock#utils) 工具函数，可以实现单个或所有响应的延迟。

#### 延迟单个

```ts
import { IMock } from 'serve-mock';
import { delay } from 'serve-mock/utils';

const mock: IMock = {
  'PUT /api/users': delay('操作成功', 1000)
};

export default mock;
```

#### 延迟所有

```ts
import { IMock } from 'serve-mock';
import { delay, delays } from 'serve-mock/utils';

const mock: IMock = {
  'GET /api/user': {
    id: 1,
    name: '曲丽丽',
  },
  'PUT /api/users': '操作成功'
};

export default delays(mock, 1000);
```

#### 随机的延迟时间

把延迟时间固定在一个值，特别是在所有请求都需要延迟的时候，这样的固定等待与真实网络环境仍有较大的差异。幸运的是 [serve-mock](https://github.com/kaysonwu/serve-mock#utils) 已经考虑到了这一点，通过传递 `max` 参数并与 `min` 参数搭配使用，即可实现一个随机范围时间延迟：

```ts
delay(value, 10, 1000); // 将延迟时间随机为 10 - 1000 毫秒
delays(mock, 100, 2000); // 将延迟时间随机为 100 - 2000 毫秒
```

### 引入 Mock.js

[Mock.js](http://mockjs.com/) 是常用的辅助生成模拟数据的第三方库，借助它可以提升数据模拟的能力。

```ts
import { IMock } from 'serve-mock';
import mockjs from 'mockjs';

const mock: IMock = {
  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }]
  }),
};

export default mock;
```

### 联调

当本地开发完毕之后，如果服务器的接口已满足约定，那么，只需要关闭数据模拟或者代理到服务端的真实接口地址即可。

通过使用 `--without-mock` 选项来关闭数据模拟：

```shell
yarn run dev --without-mock
```

通过更改 [webpack](https://webpack.js.org/) 开发配置文件 `config/webpack.dev.js` 中的 [devServer](https://webpack.js.org/configuration/dev-server/#devserverproxy) 选项，即可启用代理到服务端的真实接口地址上。

```js
devServer: {
  proxy: {
    '/api': 'http://localhost:3000'
  }
}
```
