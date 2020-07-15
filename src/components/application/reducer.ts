import { GlobalState, ReducerAction } from './context';

interface InternalReducerAction {
  type: 'initial';
  payload: GlobalState;
}

function reducer(state: GlobalState | undefined, action: InternalReducerAction | ReducerAction) {
  const { type } = action;

  if (type === 'initial') {
    return (action as InternalReducerAction).payload;
  }

  if (state && Object.prototype.hasOwnProperty.call(state, type)) {
    return { ...state, [type]: (action as ReducerAction)[type] } as GlobalState;
  }

  return state;
}

export default reducer;
