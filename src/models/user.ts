import { post, put, get, del } from '@/utils/request';

export interface UserState {
  users: IUser[];
  user?: IUser;
  formVisible?: boolean;
}

const User: IModel<UserState> = {
  id: 'user',
  async state(request) {
    const users = await (get('/v1/users', request.query) as Promise<any[]>);

    return {
      users,
    };
  },
  effects: {
    *create({ call, put }, action) {
      yield call(post, '/v1/users', action.payload);
      yield put({ type: 'query' });

      if (!action.formVisible) {
        yield put({ type: 'setFormVisible', formVisible: false });
      }
    },
    *update(saga, action) {
      yield saga.call(put, `/v1/users/${action.id}`, action.payload);
      yield saga.put({ type: 'query' });

      if (!action.formVisible) {
        yield saga.put({ type: 'setFormVisible', formVisible: false });
      }
    },
    *query({ call, put }, action) {
      const users = yield call(get, '/v1/users', action.payload);
      yield put({ type: 'saveUsers', users });
    },
    *show({ call, put }, action) {
      yield put({ type: 'setFormVisible', formVisible: true });
      const user = yield call(get, `/v1/users/${action.payload}`);
      yield put({ type: 'saveUser', user });
    },
    *delete({ call, put }, action) {
      yield call(del, `/v1/users/${action.payload}`);
      yield put({ type: 'query' });
    },
  },
  reducers: {
    saveUsers(state, { users }) {
      return {
        ...state,
        users,
      };
    },
    saveUser(state, { user }) {
      return {
        ...state,
        user,
      };
    },
    setFormVisible(state, { visible }) {
      return {
        ...state,
        formVisible: visible,
      };
    },
  },
};

export default User;
