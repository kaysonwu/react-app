import { get } from '@/utils/request';

export interface GlobalState {
  user?: IUser;
  menus?: IMenu[];
  loading?: Record<string, boolean>;
}

function getLoadingKey(id: string, effect?: string) {
  switch (effect) {
    case 'show':
      return `${id}Forming`;
    case 'create':  
    case 'update':
      return `${id}FormSubmitting`;
  }  

  return id;
}

const Global: IModel<GlobalState> = {
  id: 'global',
  async state(){
    const [user, menus] = await Promise.all([
      get('/v1/currentUser') as Promise<IUser>,
      get('/v1/menus') as Promise<IMenu[]>,
    ]);

    return { user, menus };
  },
  *effecting({ put }, id, effect) {
    const key = getLoadingKey(id, effect);
    yield put({ type: 'saveLoading', payload: { [key]: true } });
  },
  *effected({ put }, id, effect) {
    const key = getLoadingKey(id, effect);
    yield put({ type: 'saveLoading', payload: { [key]: false } });
  },
  reducers: {
    saveLoading(state, action) {
      return {
        ...state,
        loading: {
          ...state.loading,
          ...action.payload,
        },
      };
    }
  },
};

export default Global;
