import request from '@/utils/request';

const { get } = request;

export interface GlobalState {
  user: IUser;
  menus: IMenu[];
  loading: Record<string, boolean>;
}

const Global: IModel<GlobalState> = {
  id: 'global',
  async state(){
    const [user, menus] = await Promise.all([
      get<any, IUser>('v1/currentUser'),
      get<any, IMenu[]>('v1/menus')
    ]);

    return {
      user,
      menus,
      loading: {}
    };
  },
  *effecting({ put }, id) {
    yield put({ type: 'saveLoading', payload: { [id]: true } });
  },
  *effected({ put }, id) {
    yield put({ type: 'saveLoading', payload: { [id]: false } });
  },
  reducers: {
    saveLoading(state, action) {
      return {
        ...state,
        loading: {
          ...state.loading,
          ...action.payload
        }
      };
    }
  },
};

export default Global;
