import { message } from 'antd';
import { get } from '@/utils/request';

export interface GlobalState {
  user?: IUser;
  menus?: IMenu[];
  loading?: Record<string, LoadingState>;
}

// #if WEB
function mapEffectToLoading(effect?: string) {
  switch (effect) {
    case 'create':
    case 'update':
      return 'submitting';
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
    const loading = true;

    if (id !== 'global' && has(type)) {
      yield put({ type, effect, loading });
    } else if (effect === 'show') {
      message.loading({ key: `${id}/${effect}`, content: window.intl!.formatMessage({ id: 'Fetching' }), duration: 0 });
    } else if (effect === 'delete') {
      message.loading({ key: `${id}/${effect}`, content: window.intl!.formatMessage({ id: 'Deleting' }), duration: 0 });
    } else {
      yield put({ type: 'saveLoading', id, effect, loading });
    }
  },
  *effected({ put, has }, id, effect) {
    const type = `${id}/saveLoading`;
    const loading = false;

    if (id !== 'global' && has(type)) {
      yield put({ type, effect, loading });
    } else if (effect === 'show') {
      message.loading({ key: `${id}/${effect}`, content: window.intl!.formatMessage({ id: 'Fetching' }), duration: 0.01 });
    } else if (effect === 'delete') {
      message.loading({ key: `${id}/${effect}`, content: window.intl!.formatMessage({ id: 'Deleting' }), duration: 0.01 });
    } else {
      yield put({ type: 'saveLoading', id, effect, loading });
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
