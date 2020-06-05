import { get } from '@/utils/request';

export interface GlobalState {
  user?: IUser;
  menus?: IMenu[];
  loading?: Record<string, LoadingState>;
}

// #if WEB
function mapEffectToLoading(effect?: string) {
  switch (effect) {
    case 'show':
    case 'openForm':
      return 'showing';
    case 'create':
    case 'update':
      return 'submitting';
    case 'delete':
      return 'deleting';
    default:
      return 'loading';
  }
}
// #endif

const Global: Model<GlobalState> = {
  id: 'global',
  async state() {
    const [user, menus] = await Promise.all([
      get('/v1/currentUser') as Promise<IUser>,
      get('/v1/menus') as Promise<IMenu[]>,
    ]);

    return { user, menus };
  },
  // #if WEB
  *effecting({ put, has }, id, effect) {
    const type = `${id}/saveLoading`;

    if (has(type)) {
      yield put({ type, effect, loading: true });
    } else {
      yield put({ type: 'saveLoading', id, effect, loading: true });
    }
  },
  *effected({ put, has }, id, effect) {
    const type = `${id}/saveLoading`;

    if (has(type)) {
      yield put({ type, effect, loading: false });
    } else {
      yield put({ type: 'saveLoading', id, effect, loading: false });
    }
  },
  reducers: {
    saveLoading(state, { id, effect, loading: l }) {
      const name = mapEffectToLoading(effect);
      const loading: Record<string, LoadingState> = { ...state.loading };
      loading[id] = { ...loading[id], [name]: l };

      return {
        ...state,
        loading,
      };
    },
  },
  // #endif
};

export default Global;
