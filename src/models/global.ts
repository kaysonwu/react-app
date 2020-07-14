import { message } from 'antd';
import IsMobile from 'is-mobile';
import { get } from '@/utils/request';

export type Theme = {
  // Menu layout
  layout: 'top' | 'sider' | 'top-sider' | 'sider2';
  // Theme style light-dark 与 dark-light 不支持 top 布局
  style: 'dark' | 'light' | 'light-dark' | 'dark-light';
  // Primary Color
  color: string;
  // true 流式宽度 number 固定宽度 仅在布局为 top 时有效
  contentWidth: true | number;
  colorWeak?: boolean;
  fixedHeader?: boolean;
  fixSiderbar?: boolean;
};

export interface GlobalState {
  user?: IUser;
  menus?: IMenu[];
  links?: ILink[];
  theme?: Theme;
  isMobile?: boolean;
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
  async state(request) {
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent : request;
    const isMobile = IsMobile({ ua });

    const [user, menus, links] = await Promise.all([
      get('/v1/currentUser') as Promise<IUser>,
      get('/v1/menus') as Promise<IMenu[]>,
      get('/v1/links', { type: 'ic-footer' }) as Promise<ILink[]>,
    ]);

    const theme = {
      layout: 'top',
      style: 'light-dark',
      color: '#1890ff',
      contentWidth: true,
      fixedHeader: true,
    };

    return { user, menus, theme, links, isMobile } as GlobalState;
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
