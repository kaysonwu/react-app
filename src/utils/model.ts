import { IncomingMessage } from 'http';
import { createStore, applyMiddleware, Middleware, PreloadedState, Store as ReduxStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as Saga from 'redux-saga/effects';

const { take, put, putResolve, takeEvery } = Saga;

const PRELOADED_STATE = '__PRELOADED_STATE__';

const MODEL_ID_SEPARATOR = '/';
const MODEL_ADDED = '@@model/ADDED';
const MODEL_REMOVED = '@@model/REMOVED';

interface IModelManager {
  has: (id: string) => boolean;
  add: (...models: IModel[]) => number;
  remove: (...ids: string[]) => number;
}

class ModelManager implements IModelManager {

  private models: Record<string, Omit<IModel, 'id' | 'state'> & { saga: ReturnType<typeof coverSaga> }> = {};
  private store: ReduxStore | null = null;
  private listen: Record<string, Record<string, any>> = {
    effecting: {},
    effected: {}
  };

  constructor() {
    this.effect = this.effect.bind(this);
    this.trigger = this.trigger.bind(this);
  }

  private clearOldState = (state: any, ids: string[]) => {
    const newState = { ...state };

    for (let id of ids) {
      if (Object.prototype.hasOwnProperty.call(newState, id)) {
        delete newState[id];
      }
    }

    return newState;
  }

  private splitActionType = (type: string) => {
    return type.split(MODEL_ID_SEPARATOR);
  }

  private get = (id: string, defaultValue: any = undefined) => {
    return this.has(id) ? this.models[id] : defaultValue;
  }

  private addListen = (id: string, model: Record<string, any>) => {
    for (let name in this.listen) {
      if (typeof model[name] === 'function') {
        this.listen[name][id] = model[name];
        delete model[name];
      }
    }
  }

  private removeListen = (id: string) => {
    for (let name in this.listen) {
      if (this.listen[name][id] !== undefined) {
        delete this.listen[name][id];
      }
    }
  }

  private *trigger(event: string, ...parameters: any[]) {
    const listen = this.listen[event];

    for (let id in listen) {
      yield listen[id].call(null, ...parameters);
    }
  }

  private getStore = () => {
    if (this.store === null) {
      throw new Error('Store has not been injected.');
    }

    return this.store;
  }

  private preloadState = (state: Record<string, Promise<any>>) => {
    const states = Object.values(state);

    if (states.length < 1) return;

    const ids = Object.keys(state);
    Promise.all(states).then(states => {
      const payload = states.reduce((res, state, i) => {
        res[ids[i]] = state;
        return res;
      }, {});

      this.getStore().dispatch({ type: MODEL_ADDED, payload });
    });
  }
  
  /**
   * @Internal
   */
  public reducer = (state: any, action: AnyAction) => {
    const { type, payload } = action;

     // Internal action for state initialization after adding a model.
    if (type === MODEL_ADDED) {
      return { ...state, ...payload };
    }

    // Internal action for state cleanup after model deletion.
    if (type === MODEL_REMOVED) {
      return this.clearOldState(state, payload);
    }
   
    if (type !== MODEL_REMOVED) {
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
    }

    return state;
  }

  /**
   * @Internal
   */
  public *effect(action: Action) {
    const [id, key] = this.splitActionType(action.type);
    const { effects, saga } = this.get(id, {});
    
    if (effects !== undefined 
      && typeof effects[key] === 'function'
    ) {
      yield this.trigger('effecting', saga, id, key, action);
      yield effects[key](saga, action);
      yield this.trigger('effected', saga, id, key, action);
    }
  }

  /**
   * @Internal
   */
  public injectStore = (store: ReduxStore) => {
    this.store = store;
  }

  public has = (id: string) => {
    return Object.prototype.hasOwnProperty.call(this.models, id);
  }

  public add = (...models: ({ state?: any } & Omit<IModel, 'state'>)[]) => {
    const states: Record<string, Promise<any>> = {};
    const { length } = models.filter(({ id, state, ...model }) => {
      if (this.models[id] !== undefined) return false;

      if (typeof state === 'function') {
        states[id] = state();
      } else if (state !== undefined) {
        state[id] = state;
      }

      this.addListen(id, model);
      this.models[id] = {
        ...model,
        saga: coverSaga(id),
      };

      return true;
    });

    this.preloadState(states);

    return length;
  }

  public remove = (...ids: string[]) => {
    const payload = ids.filter(id => {
      if (this.models[id] === undefined) return false;

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

function coverSaga(id: string) {
  return {
    ...Saga,
    put<A extends Action>(action: A) {
      return put({ ...action, type: fixActionType(action.type, id) });
    }, 
    putResolve(action: Action) {
      return putResolve({ ...action, type: fixActionType(action.type, id) });
    },
    take(pattern?: Saga.ActionPattern) {
      if (typeof pattern === 'string') {
        return take(fixActionType(pattern, id));
      }
      
      if (Array.isArray(pattern)) {
        return take(pattern.map(t => (typeof t === 'string') ? fixActionType(t, id) : t));
      }

      return take(pattern);
    },
  };
}

function fixActionType(type: string, id: string) {
  if (type.indexOf(MODEL_ID_SEPARATOR) === -1) {
    return id + MODEL_ID_SEPARATOR + type;
  }

  return type;
}

export type Store = ReduxStore & { modelManager: IModelManager };

function createStoreFromModel(
  models: IModel[], 
  preloadedState?: PreloadedState<any>, 
  ...middlewares: Middleware<any, any, any>[]
) {
  const { reducer, effect, injectStore, add, has, remove } = new ModelManager();
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducer, 
    preloadedState || {}, 
    applyMiddleware(sagaMiddleware, ...middlewares)
  ) as Store;
  
  injectStore(store);
  add(...(preloadedState ? models.map(({ state, ...model }) => model) : models));

  sagaMiddleware.run(function*() {
    yield takeEvery('*', effect);
  });

  store.modelManager = { add, has, remove }

  return store;
}


// #if browser
export function configureStore(
  models: IModel[], 
  ...middlewares: Middleware<any, any, any>[]
) {
  const state = window[PRELOADED_STATE];

  if (state !== undefined) {
    delete window[PRELOADED_STATE];
  } 

  return createStoreFromModel(models, state, ...middlewares);
}
// #!endif

// #!if NODE_SERVER
export function createStateScript(state: any) {
  return `
    <script type="text/javascript">
      window.${PRELOADED_STATE} = ${JSON.stringify(state).replace(/</g, '\\u003c')}
    </script>
  `;
}

export async function prepareStore (
  models: IModel[], 
  request: IncomingMessage, 
  ...middlewares: Middleware<any, any, any>[]
) {
  const states = await getModelsInitialState(models, request);
  return createStoreFromModel(models, states, ...middlewares);
}

async function getModelsInitialState(models: IModel[], request: IncomingMessage) {
  const states: Record<string, any> = {};
  const ids: string[] = [];
  const tasks: Promise<any>[] = [];

  for (let { id, state } of models) {
    if (typeof state === 'function') {
      ids.push(id);
      tasks.push(state(request));
    } else {
      states[id] = state;
    }
  }

  return (await Promise.all(tasks)).reduce(
    (states, state, i) => {
      states[ids[i]] = state;
      return states;
    }, 
    states
  );
}
// #!endif
