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
    loading: {},
  },
// #!if !browser  
  async getInitialState() {
    return {
      user: {} as IUser,
      menus: [],
      loading: {}
    };
  },
// #!endif  
  effects: {
    *fetchUser({ put }, action) {
      
    }
  },
  *effecting({ put }, id) {
    yield put({ type: 'saveLoading', payload: { [id]: true } });
  },
  *effected({ put }, id) {
    yield put({ type: 'saveLoading', payload: { [id]: false } })
  },
  reducers: {
    saveUser(state, action) {
      console.log('saveUser', state, action);
      return {
        ...state,
        user: action.payload
      };
    },
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
      }
    }
  }
};

export default Global;
