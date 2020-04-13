## 数据模拟

数据模拟 (Mock) 是前端开发过程中必不可少的一环，是分离前后端开发的关键链路。通过预先跟服务器端约定好的接口，模拟请求数据甚至逻辑，能够让前端开发独立自主，不会被服务端的开发所阻塞。

### 数据文件

设置模拟数据时需要在工程根目录下的 `mocks` 子目录中建立文件。并根据 `请求路径` 命名文件。文件匹配的模式是 **自右向左** 依次匹配，找到文件即停止。

当请求 `/api/user` 时，将依次匹配 `user.js`、`api.js`，如果 `user.js` 存在则不再寻找 `api.js`

### 简单数据

模拟数据需要返回一个对象。对象的键以 **请求方法与路径用空格组合的方式** 命名，值可以是：字符串、对象、数组或者函数。

```js
module.exports = {
  'GET /api/user': {
    id: 1,
    name: '曲丽丽',
  },
  'GET /api/users': [
    {id: 1, name: '曲丽丽'},
    {id: 2, name: '付小小'},
  ],
  'POST /api/users': '操作成功',
  'PUT /api/users': (req, res, next) => {
    res.send('操作成功')
  }
};
```

当值是函数时将接收：[req](http://expressjs.com/en/4x/api.html#req)、[res](http://expressjs.com/en/4x/api.html#res)、[next](http://expressjs.com/en/4x/api.html#router.param) 三个参数，实际上它就是一个 [Express](http://expressjs.com/) 回调函数。

### 模拟出错

通过 [res.status](http://expressjs.com/en/4x/api.html#res.status) 设置错误码即可模拟 http 请求出错

```js
module.exports = {
  'PUT /api/users': (req, res, next) => {
    res.status(500);
    res.send();
  }
};
```

### 模拟延迟

为了更加真实地模拟网络数据请求，往往需要模拟网络延迟时间。通过使用工具函数，可以实现单个或所有响应的延迟。

#### 延迟单个

```js
const { delay } = require('./_utils_');

module.exports = {
  'PUT /api/users': delay('操作成功', 1000)
}
```

#### 延迟所有

```js
const { delays } = require('./_utils_');
const proxy = {
  'GET /api/user': {
    id: 1,
    name: '曲丽丽',
  },
  'PUT /api/users': '操作成功'
};

module.exports = delays(proxy);
```

### 引入 Mock.js

[Mock.js](http://mockjs.com/) 是常用的辅助生成模拟数据的第三方库，借助它可以提升数据模拟的能力。

```js
const mockjs = require('mockjs');

module.exports = {
  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }]
  })
};
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
    '/v1': 'http://localhost:3000'
  }
}
```