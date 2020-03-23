import { createStore, applyMiddleware, combineReducers, Middleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as Saga from 'redux-saga/effects';

const { 
  take, 
  put, 
  putResolve,
  takeEvery,
} = Saga;

const MODEL_SEPARATOR = '/';

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

function fixActionType(type: string, id: string): string {
  
  if (type.indexOf(MODEL_SEPARATOR) === -1) {
    return id + MODEL_SEPARATOR + type;
  }

  return type;
}

type SagaModel = {
  saga: ReturnType<typeof coverSaga>;
}

class ModelManager {

  private models: Record<string, Omit<IModel, 'id'> & SagaModel> = {};

  private ids: string[] = [];

  constructor(models: IModel[]) {
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

  private splitActionType(action: Action) {
    return (action.type as string).split(MODEL_SEPARATOR);
  }

  private get = (id: string, defaultValue: any = undefined) => {
    return this.has(id) ? this.models[id] : defaultValue;
  }
  
  private getInitialState = () => {
    const { models } = this;
    const state: Record<string, any> = {};

    for (let id in models) {
      state[id] = { ...models[id].state };
    }

    return state;
  }

  /**
   * @Internal
   */
  public reducer = (nextState: any, action: Action) => {

    // Initialization models state.
    if (nextState === undefined) {
      return this.getInitialState();
    }

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

export function configureStore(models: IModel[], ...middlewares: Middleware<any, any, any>[]) {
  const { reducer, effect, add, has, remove } = new ModelManager(models);
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(reducer, undefined, applyMiddleware(sagaMiddleware, ...middlewares));
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
  }
}
