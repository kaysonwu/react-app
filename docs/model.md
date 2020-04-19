## 模型数据流

模型是前端分层中的腰部力量，承上启下，负责管理数据 (状态)。业界主流的状态管理类库有 [redux](https://github.com/reduxjs/redux)、[mobx](https://github.com/mobxjs/mobx) 等。

脚手架的模型是基于 [redux](https://github.com/reduxjs/redux) 和 [redux-saga](https://github.com/redux-saga/redux-saga) 最佳实践沉淀而出，与 [Dva Model](https://dvajs.com/guide/concepts.html#models) 形似， 一个简单的模型示例如下：

```ts
interface GlobalState {
  user: IUser | null;
  menus: IMenu[];
  loading: Record<string, boolean>;
}

const Global: IModel<GlobalState> = {
  id: 'global',
  state: {
    user: null,
    menus: [],
    loading: {}
  },
  effects: {
    *fetchUser(saga, action) {
      const user = yield saga.call(api);
      yield saga.put({ type: 'saveUser', payload: user })
    }
  },
  reducers: {
    saveUser(state, action) {
      return {
        ...state,
        user: action.payload
      };
    }
  }
};

export default Global;
```

模型对象都要实现 `IModel` 接口，其中包含以下几个必要属性：

- `id`：模型的唯一识别符，值只能是字符串。`dispatch`
- `state`：模型的初始状态，值可以是对象或异步函数
- `reducers`：用于处理同步操作，可以修改状态，由 [Action](https://redux.js.org/basics/actions) 触发。[Reducer](https://redux.js.org/basics/reducers) 是一个纯函数，它接受当前的状态及一个 [Action](https://redux.js.org/basics/actions) 对象。[Action](https://redux.js.org/basics/actions) 对象里面可以包含数据体 `payload` 作为入参，需要返回一个新的状态。
- `effects`：用于处理异步操作 (例如：与服务端交互) 和业务逻辑，也是由 [Action](https://redux.js.org/basics/actions) 触发。但是，它不可以修改状态，而是通过 [Saga Effect API](https://redux-saga.js.org/docs/api/#effect-creators) 发起 [Action](https://redux.js.org/basics/actions) 调用 [Reducer](https://redux.js.org/basics/reducers) 实现对状态的间接操作。

### 服务端渲染

使用工匠命令，可以从模板中创建一个模型：

```
yarn artisan make:model user --preload
```

通过指定 `--preload` 选项，将生成 `state` [异步函数](https://es6.ruanyifeng.com/#docs/async) 语法，这样就可以实现客户端与服务端的双端渲染支持

```ts
import { post } from '@/utils/request';

export interface UserState {
+  users: any[];
}

const User: IModel<UserState> = {
  id: 'user',
  async state(request) {
+    const users = await (post('/v1/users', request.query) as Promise<any[]>);
    return {
+      users,
    };
  },
  ...
};

export default User;
```

`state` 函数接收一个 `request` 对象作为参数，它由 [URL](https://nodejs.org/dist/latest-v12.x/docs/api/url.html#url_legacy_urlobject) 与 [Headers](https://nodejs.org/dist/latest-v12.x/docs/api/http.html#http_message_headers) 对象组合而成，在客户端渲染时，`Headers` 对象仅中包含一个 `cookie` 对象。

现在，来改造下之前的 `Global` 模型吧，让它也支持服务端渲染：

```ts
import { get } from '@/utils/request';

interface GlobalState {
  user: IUser;
  menus: IMenu[];
  loading: Record<string, boolean>;
}

const Global: IModel<GlobalState> = {
  id: 'global',
  async state(){
    const [user, menus] = await Promise.all([
      get('v1/currentUser') as Promise<IUser>,
      get('v1/menus') as Promise<IMenu[]>,
    ]);

    return {
      user,
      menus,
      loading: {},
    };
  },
  ...
};

export default Global;
```
