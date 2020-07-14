import { post, put as Put, get, del } from '@/utils/request';

export interface UserState {
  data: IUser[];
  record?: IUser;
  formVisible?: boolean;
}

const User: Model<UserState> = {
  id: 'user',
  async state(request) {
    const data = await get('/v1/users', request.query);

    return { data };
  },
  // #if WEB
  effects: {
    *create({ call, select, put }, { data, form, formVisible }) {
      const record = yield call(post, '/v1/users', data, { form });

      if (record) {
        const data = (yield select(state => state.data)) as IUser[];
        yield put({ type: 'saveData', data: [record, ...data], formVisible });
      }
    },
    *update({ call, put, select }, { id, data, form, formVisible }) {
      const record = (yield call(Put, `/v1/users/${id}`, data, { form })) as IUser;

      if (record) {
        const data = (yield select(state => state.data)) as IUser[];
        yield put({ type: 'saveData', data: data.map(r => (r.id === record.id ? record : r)), formVisible });
      }
    },
    *query({ call, put }, action) {
      const data = yield call(get, '/v1/users', action.payload);
      yield put({ type: 'saveData', data });
    },
    *show({ call, put }, { id }) {
      const record = yield call(get, `/v1/users/${id}`);

      if (record) {
        yield put({ type: 'openForm', record });
      }
    },
    *delete({ call, select, put }, { id }) {
      const res = yield call(del, `/v1/users/${id}`);
      if (res) {
        const data = (yield select(state => state.data)) as IUser[];
        yield put({ type: 'saveData', data: data.filter(record => record.id === Number(id)) });
      }
    },
  },
  reducers: {
    saveData(state, { data, formVisible = state.formVisible }) {
      return {
        ...state,
        data,
        formVisible,
      };
    },
    saveRecord(state, { record }) {
      return {
        ...state,
        record,
      };
    },
    openForm(state, { record }) {
      return { ...state, formVisible: true, record };
    },
    closeForm(state) {
      return { ...state, formVisible: false };
    },
  },
  // #endif
};

export default User;
