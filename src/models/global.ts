import request from '@/utils/request'

const { get } = request

interface GlobalState {
  user?: IUser;
  menus?: IMenu[];
  loading: Record<string, boolean>;
}

const Global: IModel<GlobalState> = {
  id: 'global',
  state: {
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
    *fetchUser({ call, put }) {
      const payload = yield call(get, 'v1/currentUser')
      yield put({ type: 'saveUser', payload })
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
