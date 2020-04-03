import { createStore, applyMiddleware, Middleware, PreloadedState } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as Saga from 'redux-saga/effects';

const { take, put, putResolve, takeEvery } = Saga;
const MODEL_SEPARATOR = '/';
const PRELOADED_STATE = '__PRELOADED_STATE__';

class ModelManager {

  private models: Record<string, Omit<IModel, 'id'> & { saga: ReturnType<typeof coverSaga> }> = {};
  private ids: string[] = [];

  constructor(models: IModel[]) {
    this.add(...models);
    this.effect = this.effect.bind(this);
    this.trigger = this.trigger.bind(this);
  }

  private clearOldState = (state: any) => {
    const { ids } = this;
    if (ids.length > 0) {
      state = { ...state };
      for (let key of ids) {
        delete state[key];
      }
      this.ids = [];
      return state;
    }
    return state;
  }

  private splitActionType = (action: Action) => {
    return (action.type as string).split(MODEL_SEPARATOR);
  }

  private get = (id: string, defaultValue: any = undefined) => {
    return this.has(id) ? this.models[id] : defaultValue;
  }

  private *trigger(event: string, ...parameters: any[]) {
    const { models } = this;
    for (let id in models) {
      let model = models[id];
      // @ts-ignore
      if (typeof model[event] === 'function') {
        // @ts-ignore
        yield model[event](...parameters);
      }
    }
  }
  
  /**
   * @Internal
   */
  public reducer = (nextState: any, action: Action) => {
    const [id, key] = this.splitActionType(action);
    const { reducers, state } = this.get(id, {});
  
    nextState = this.clearOldState(nextState);
    
    if (reducers !== undefined && 
      typeof reducers[key] === 'function'
    ) {
      nextState[id] = reducers[key](nextState[id] || state, action);
    }

    return nextState;
  }

  /**
   * @Internal
   */
  public *effect(action: Action) {
    const [id, key] = this.splitActionType(action);
    const { effects, saga } = this.get(id, {});
    
    if (effects !== undefined && 
      typeof effects[key] === 'function'
    ) {
      yield this.trigger('effecting', saga, id, key, action);
      yield effects[key](saga, action);
      yield this.trigger('effected', saga, id, key, action);
    }
  }

  public has = (id: string) => {
    return Object.prototype.hasOwnProperty.call(this.models, id);
  }

  public add = (...models: IModel[]) => {
    for (let i = 0;  i < models.length; i++) {
      let { id, ...model } = models[i];
      if (this.models[id] === undefined) {
        this.models[id] = {
          ...model,
          saga: coverSaga(id)
        }
      }
    }
  }

  public remove = (...ids: string[]) => {
    for (let i = 0;  i < ids.length; i++) {
      let id = ids[i];
      if (this.models[id] !== undefined) {
        delete this.models[id];
        this.ids.push(id);
      }
    }
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
      } else if (Array.isArray(pattern)) {
        return take(pattern.map(t => (typeof t === 'string') ? fixActionType(t, id) : t));
      }
      return take(pattern);
    }
  };
}

function fixActionType(type: string, id: string) {
  if (type.indexOf(MODEL_SEPARATOR) === -1) {
    return id + MODEL_SEPARATOR + type;
  }
  return type;
}

export type Store = ReturnType<typeof createStoreFromModel>;

function createStoreFromModel(models: IModel[], preloadedState?: PreloadedState<any>, ...middlewares: Middleware<any, any, any>[]) {
  const { reducer, effect, add, has, remove } = new ModelManager(models);
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, preloadedState, applyMiddleware(sagaMiddleware, ...middlewares));

  sagaMiddleware.run(function*() {
    yield takeEvery('*', effect);
  });

  return {
    ...store,
    modelManager: {
      add,
      has,
      remove
    }
  };
}

// #if browser
export function configureStore(models: IModel[], ...middlewares: Middleware<any, any, any>[]) {
  let state = window[PRELOADED_STATE];

  if (state !== undefined) {
    delete window[PRELOADED_STATE];
  } else {
    state = models.reduce((res: Record<string, any>, model) => {
      res[model.id] = { ...model.state };
      return res;
    }, {});
  }
  
  return createStoreFromModel(models, state, ...middlewares);
}
// #!else

export function createStateScript(state: any) {
  return `
    <script type="text/javascript">
      window.${PRELOADED_STATE} = ${JSON.stringify(state).replace(/</g, '\\u003c')}
    </script>
  `;
}

export function prepareStore
(
  models: IModel[], 
  request: any, 
  done: (store: Store) => void, 
  ...middlewares: Middleware<any, any, any>[]
) {
  const fn: Promise<any>[] = [];
  const ids: string[] = [];
  const preloadedState: Record<string, any> = {};

  for (let i = 0; i < models.length; i++) {
    let { id, state, getInitialState } = models[i];
    if (typeof getInitialState === 'function') {
      ids.push(id);
      fn.push(getInitialState(state, request));
    } else {
      preloadedState[id] = { ...state };
    }
  }

  Promise.all(fn).then(states => {
    for (let i = 0; i < states.length; i++) {
      preloadedState[ids[i]] = { ...states[i] };
    }

    done(createStoreFromModel(models, preloadedState, ...middlewares));
  });
}
// #!endif
