import { createStore, applyMiddleware, Middleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as Saga from 'redux-saga/effects';

const { take, put, putResolve, takeEvery } = Saga;

const MODEL_SEPARATOR = '/';
class ModelManager {

  private models: Record<string, Omit<IModel, 'id'> & { saga: ReturnType<typeof coverSaga> }>;
  private ids: string[];

  constructor(models: IModel[]) {
    this.models = {};
    this.ids = [];

    this.add(...models);
    this.effect = this.effect.bind(this);
  }

  private clearOldState = (state: any) => {
    if (this.ids.length > 1) {
      state = { ...state };
      for (let key of this.ids) {
        delete state[key];
      }
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
  
  /**
   * @Internal
   */
  public reducer = (nextState: any, action: Action) => {

    const [id, key] = this.splitActionType(action);
    const { reducers } = this.get(id, {});

    nextState = this.clearOldState(nextState);

    if (reducers !== undefined && 
      typeof reducers[key] === 'function'
    ) {
      nextState[id] = reducers[key](nextState[id], action);
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
      yield effects[key](saga, action);
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
        return take(pattern.map(t => (typeof t === 'string') ? fixActionType(t, id) : t))
      }

      return take(pattern)
    }
  }
}

function fixActionType(type: string, id: string) {
  if (type.indexOf(MODEL_SEPARATOR) === -1) {
    return id + MODEL_SEPARATOR + type;
  }

  return type;
}

export function configureStore(models: IModel[], ...middlewares: Middleware<any, any, any>[]) {
  const { reducer, effect, add, has, remove } = new ModelManager(models);
  const states = models.reduce((states: Record<string, any>, model) => { 
    states[model.id] = { ...model.state };
    return states;
  }, {});

  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, states, applyMiddleware(sagaMiddleware, ...middlewares));
  sagaMiddleware.run(function*() {
    yield takeEvery('*', effect)
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

// #!if !browser
export function prepareStore
(
  models: IModel[], 
  request: any, 
  done: (store: ReturnType<typeof configureStore>) => void, 
  ...middlewares: Middleware<any, any, any>[]
) {
  const fn: Promise<any>[] = [];
  const indices: number[] = [];
  const modelled: IModel[] = [];

  for (let i = 0; i < models.length; i++) {
    let { getInitialState, ...model } = models[i];
    if (typeof getInitialState === 'function') {
      fn.push(getInitialState(request));
      indices.push(i);
    }
    modelled.push(model);
  }

  Promise.all(fn).then(states => {
    for (let i = 0; i < states.length; i++) {
      modelled[indices[i]].state = { ...states[i] };
    }

    done(configureStore(modelled, ...middlewares));
  });
}
// #!endif
