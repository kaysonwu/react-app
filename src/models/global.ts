import { get } from '@/utils/request';

export interface GlobalState {
  user?: IUser;
  menus?: IMenu[];
  loading?: Record<string, LoadingState>;
}

function getLoadingKey(id: string, effect?: string) {
  switch (effect) {
    case 'show':
      return 'showing';
    case 'create':
    case 'update':
      return 'submitting';
    case 'delete':
      return 'deleting';
    default:
      break;
  }

  return 'loading';
}

const Global: Model<GlobalState> = {
  id: 'global',
  async state() {
    const [user, menus] = await Promise.all([
      get('/v1/currentUser') as Promise<IUser>,
      get('/v1/menus') as Promise<IMenu[]>,
    ]);

    return { user, menus };
  },
  *effecting({ put }, id, effect) {
    const key = getLoadingKey(id, effect);
    yield put({ type: 'saveLoading', id, payload: { [key]: true } });
  },
  *effected({ put }, id, effect) {
    const key = getLoadingKey(id, effect);
    yield put({ type: 'saveLoading', id, payload: { [key]: false } });
  },
  reducers: {
    saveLoading(state, { id, payload }) {
      const loading: Record<string, LoadingState> = { ...state.loading };
      loading[id] = { ...loading[id], ...payload };

      return {
        ...state,
        loading,
      };
    },
  },
};

export default Global;
