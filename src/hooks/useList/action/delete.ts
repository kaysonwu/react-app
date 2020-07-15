import { Key, SyntheticEvent } from 'react';
import { message } from 'antd';
import { del } from '@/utils/request';
import { ErrorEventHandler } from '../interface';
import { getIdFromEvent } from '../util';

export type DeleteEventHandler = (id: Key[] | SyntheticEvent) => void;

function createDelete(
  url: string,
  loading: string,
  onSuccess: (ids: Key[]) => void,
  onError: ErrorEventHandler,
): DeleteEventHandler | undefined {
  return e => {
    const hide = message.loading(loading, 0);
    const ids = Array.isArray(e) ? e : [getIdFromEvent(e)!];

    del(`${url}/${ids.join(',')}`)
      .then(() => onSuccess(ids))
      .catch(onError)
      .finally(hide);
  };
}

export default createDelete;
