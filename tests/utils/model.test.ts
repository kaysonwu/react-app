import { configureStore, prepareStore }  from '@/utils/model';

function sleep(interval: number) {
  return new Promise(resolve => {
    setTimeout(resolve, interval);
  })
}

const Global: IModel = {
  id: 'global',
  state: {
    menus: [],
    loading: {}
  },
  effects: {
    *fetchMenus({ call, put }, action) {
      const payload = yield call(async () => {
        await sleep(500);
        return ['home', 'user'];
      });
      yield put({ type: 'saveMenus', payload });
    }
  },
  *effecting({ put }, id) {
    yield put({ type: 'saveLoading', payload: { [id]: true } });
  },
  *effected({ put }, id) {
    yield put({ type: 'saveLoading', payload: { [id]: false } });
  },
  reducers: {
    saveMenus(state, action) {
      return {
        ...state,
        menus: action.payload
      };
    },
    saveLoading(state, action) {
      return {
        ...state,
        loading: {
          ...state.loading,
          ...action.payload
        }
      };
    }
  }
};

const User: IModel = {
  id: 'user',
  state: {
    email: 'mail@mail.com'
  },
  async getInitialState(state) {
    await sleep(500);
    return {
      ...state,
      name: 'name'
    };
  },
  reducers: {
    saveName(state, action) {
      return {
        ...state,
        name: action.payload
      }
    }
  }
};

describe('Test model util', () => {

  test('test model manager', () => {
    let state: Record<string, any> = { global: { menus: ['home', 'user'] }};
    const store = configureStore([Global]);
  
    store.dispatch({ type: `${Global.id}/saveMenus`, payload: state.global.menus });
    expect(store.getState()).toMatchObject(state);

    expect(store).toHaveProperty('modelManager');
    expect(store.modelManager.has(Global.id)).toEqual(true);

    store.modelManager.remove(Global.id)
    expect(store.modelManager.has(Global.id)).toEqual(false);
   
    store.modelManager.add(User)
    expect(store.modelManager.has(User.id)).toEqual(true);
    
    store.dispatch({ type: `${User.id}/saveName`, payload: 'name' }); 
    state = store.getState(); 

    expect(state).toHaveProperty(`${User.id}.email`);
    expect(state[Global.id]).toBeUndefined();
  });

  test('test model effect', async () => {
    let state;
    const store = configureStore([Global]);
    store.dispatch({ type: `${Global.id}/fetchMenus` });

    state = store.getState()[Global.id];

    expect(state).toHaveProperty(`loading.${Global.id}`);
    expect(state.loading[Global.id]).toBeTruthy();

    await sleep(550);

    state = store.getState()[Global.id];
  
    expect(state).toHaveProperty('menus');
    expect(state['menus']).toContain('home');
    expect(state.loading[Global.id]).toBeFalsy();
  });

  test('configureStore has preloaded state', () => {
    const state = { global: { menus: ['home', 'user'] }};
    let store = configureStore([Global]);
    
    expect(store.getState()).toHaveProperty(Global.id);

    window.__PRELOADED_STATE__ = state;
    store = configureStore([Global]);
  
    expect(store.getState()).toMatchObject(state);
  });

  test('prepareStore has preloaded state', done => {
    prepareStore([Global, User], {} as any ).then(store => {
      const state = store.getState();
      expect(state).toHaveProperty(`${User.id}.name`);
      expect(state).toHaveProperty(`${Global.id}.menus`);
      done();
    });
  });
});
