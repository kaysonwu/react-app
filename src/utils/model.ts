/* eslint-disable @typescript-eslint/no-explicit-any */
import { IncomingMessage, IncomingHttpHeaders } from 'http';
import { parse as parseURL } from 'url';
import { createStore, applyMiddleware, Middleware, Store as ReduxStore } from 'redux';
// #if WEB
import createSagaMiddleware from 'redux-saga';
import * as saga from 'redux-saga/effects';

const { take, put, select, putResolve, takeEvery } = saga;
// #endif

const PRELOADED_STATE = '__PRELOADED_STATE__';

function makeRequest(url: string, headers: IncomingHttpHeaders) {
  return {
    ...parseURL(url, true),
    headers,
  };
}

// #if WEB
const MODEL_ID_SEPARATOR = '/';
const MODEL_STATE_LOADING = '@@model/STATE_LOADING';
const MODEL_STATE_LOADED = '@@model/STATE_LOADED';
const MODEL_REMOVED = '@@model/REMOVED';

function fixActionType(type: string, id: string) {
  if (type.indexOf(MODEL_ID_SEPARATOR) === -1) {
    return id + MODEL_ID_SEPARATOR + type;
  }

  return type;
}

function coverSaga(id: string) {
  return {
    ...saga,
    select(selector: (state: unknown, ...args: unknown[]) => unknown, ...args: unknown[]) {
      return select(state => selector(state[id], ...args));
    },
    put<A extends Action>(action: A) {
      return put({ ...action, type: fixActionType(action.type, id) });
    },
    putResolve(action: Action) {
      return putResolve({ ...action, type: fixActionType(action.type, id) });
    },
    take(pattern?: saga.ActionPattern) {
      if (typeof pattern === 'string') {
        return take(fixActionType(pattern, id));
      }

      if (Array.isArray(pattern)) {
        return take(pattern.map(t => (typeof t === 'string' ? fixActionType(t, id) : t)));
      }

      return take(pattern);
    },
  };
}

interface ModelManager {
  has: (id: string) => boolean;
  add: (...models: Model[]) => number;
  remove: (...ids: string[]) => number;
}

export interface Store extends ReduxStore {
  modelManager: ModelManager;
}

class InternalModelManager implements ModelManager {
  private models: Record<string, Omit<Model, 'id' | 'state'> & { saga: ReturnType<typeof coverSaga> }> = {};

  private store: ReduxStore | null = null;

  private listen: Record<string, Record<string, any>> = {
    effecting: {},
    effected: {},
  };

  constructor() {
    this.effect = this.effect.bind(this);
    this.trigger = this.trigger.bind(this);
  }

  private mergeState = (oldState: Record<string, any>, newState: Record<string, any>) => {
    const state: Record<string, any> = { ...oldState };

    Object.keys(newState).forEach(id => {
      state[id] = { ...state[id], ...newState[id] };
    });

    return state;
  }

  private clearOldState = (state: Record<string, any>, ids: string[]) => {
    const newState: Record<string, any> = {};

    Object.keys(state)
      .filter(id => !ids.includes(id))
      .forEach(id => {
        newState[id] = state[id];
      });

    return newState;
  }

  private splitActionType = (type: string) => type.split(MODEL_ID_SEPARATOR);

  private get = (id: string, defaultValue: any = undefined) => (
    this.has(id) ? this.models[id] : defaultValue
  );

  private addListen = (id: string, model: Record<string, any>) => {
    Object.keys(this.listen)
      .filter(name => typeof model[name] === 'function')
      .forEach(name => {
        this.listen[name][id] = model[name];
        // eslint-disable-next-line no-param-reassign
        delete model[name];
      });
  }

  private removeListen = (id: string) => {
    Object.keys(this.listen)
      .filter(name => this.listen[name][id])
      .forEach(name => delete this.listen[name][id]);
  }

  private *trigger(event: string, ...parameters: unknown[]) {
    const listen = this.listen[event];

    // eslint-disable-next-line no-restricted-syntax
    for (const id in listen) {
      if (Object.prototype.hasOwnProperty.call(listen, id)) {
        yield listen[id].call(null, this.models[id].saga, ...parameters);
      }
    }
  }

  private getStore = () => {
    if (this.store === null) {
      throw new Error('Store has not been injected.');
    }

    return this.store;
  }

  private preloadState = (states: Record<string, any>) => {
    const request = makeRequest(window.location.href, { cookie: document.cookie });
    const store = this.getStore();
    const payload: Record<string, any> = {};
    let i = 0;

    Object.keys(states).forEach(id => {
      const state = states[id];
      if (typeof state === 'function') {
        store.dispatch({ type: MODEL_STATE_LOADING, id });
        state(request).then((state: any) => {
          store.dispatch({ type: MODEL_STATE_LOADED, id, payload: { [id]: state } });
        });
      } else if (state !== undefined) {
        i += 1;
        payload[id] = state;
      }
    });

    if (i > 0) {
      store.dispatch({ type: MODEL_STATE_LOADED, payload });
    }
  }

  /**
   * @Internal
   */
  public injectStore = (store: ReduxStore) => {
    this.store = store;
  }

  /**
   * @Internal
   */
  public reducer = (state: any, action: AnyAction) => {
    const { type, payload } = action;

    // Internal action for state initialization after adding a model.
    if (type === MODEL_STATE_LOADED) {
      return this.mergeState(state, payload);
    }

    // Internal action for state cleanup after model deletion.
    if (type === MODEL_REMOVED) {
      return this.clearOldState(state, payload);
    }

    const [id, key] = this.splitActionType(type);
    const { reducers } = this.get(id, {});

    if (reducers !== undefined
      && typeof reducers[key] === 'function'
    ) {
      return {
        ...state,
        [id]: reducers[key](state[id], action),
      };
    }

    return state;
  }

  /**
   * @Internal
   */
  public *effect(action: AnyAction) {
    const { type, id: i } = action;

    if (type === MODEL_STATE_LOADING) {
      yield this.trigger('effecting', i);
    } else if (type === MODEL_STATE_LOADED && i) {
      yield this.trigger('effected', i);
    } else {
      const [id, key] = this.splitActionType(type);
      const { effects, saga } = this.get(id, {});

      if (effects !== undefined
        && typeof effects[key] === 'function'
      ) {
        yield this.trigger('effecting', id, key, action);
        yield effects[key](saga, action);
        yield this.trigger('effected', id, key, action);
      }
    }
  }

  public has = (id: string) => Object.prototype.hasOwnProperty.call(this.models, id);

  public add = (...models: Model[]) => {
    const states: Record<string, any> = {};
    const { length } = models.filter(m => {
      const { id } = m;

      if (this.models[id] !== undefined) {
        return false;
      }

      const { state, ...model } = m as any;

      states[id] = state;
      model.saga = coverSaga(id);

      this.addListen(id, model);
      this.models[id] = model;

      return true;
    });

    if (length > 0) {
      this.preloadState(states);
    }

    return length;
  }

  public remove = (...ids: string[]) => {
    const payload = ids.filter(id => {
      if (this.models[id] === undefined) {
        return false;
      }

      delete this.models[id];
      this.removeListen(id);

      return true;
    });

    if (payload.length > 0) {
      this.getStore().dispatch({ type: MODEL_REMOVED, payload });
    }

    return payload.length;
  }
}

export function configureStore(
  models: Model[],
  ...middlewares: Middleware[]
) {
  let items = models;
  let state = window[PRELOADED_STATE];

  if (state !== undefined) {
    delete window[PRELOADED_STATE];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    items = items.map(({ state, ...model }) => model);
  } else {
    state = {};
    models.forEach(model => {
      state[model.id] = {};
    });
  }

  const { reducer, effect, injectStore, add, has, remove } = new InternalModelManager();
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducer,
    state,
    applyMiddleware(sagaMiddleware, ...middlewares),
  ) as Store;

  // eslint-disable-next-line func-names
  sagaMiddleware.run(function* () {
    yield takeEvery('*', effect);
  });

  injectStore(store);
  add(...items);

  store.modelManager = { add, has, remove };

  return store;
}
// #endif

// #if NODE_SERVER
export function createStateScript(state: any) {
  return `
    <script type="text/javascript">
      window.${PRELOADED_STATE} = ${JSON.stringify(state).replace(/</g, '\\u003c')}
    </script>
  `;
}

async function getModelsInitialState(models: Model[], request: IncomingMessage) {
  const ids: string[] = [];
  const tasks: Promise<any>[] = [];
  const states: Record<string, any> = {};
  const req = makeRequest(request.url as string, request.headers);

  models.forEach(({ id, state }) => {
    if (typeof state === 'function') {
      ids.push(id);
      tasks.push(state(req));
    } else {
      states[id] = state;
    }
  });

  (await Promise.all(tasks)).forEach((state, i) => {
    states[ids[i]] = state;
  });

  return states;
}

export async function prepareStore(
  models: Model[],
  request: IncomingMessage,
  ...middlewares: Middleware[]
) {
  const state = await getModelsInitialState(models, request);
  return createStore(state => state!, state, applyMiddleware(...middlewares));
}
// #endif
