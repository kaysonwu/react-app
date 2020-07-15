import { SyntheticEvent } from 'react';
import { message } from 'antd';
import { get } from '@/utils/request';
import { ErrorEventHandler } from '../interface';
import { getIdFromEvent } from '../util';

function createEdit<T>(
  url: string,
  loading: string,
  onSuccess: (record?: T) => void,
  onError: ErrorEventHandler,
) {
  return (e: SyntheticEvent) => {
    const id = getIdFromEvent(e);
    const hide = message.loading(loading, 0);
    get(`${url}/${id}`).then(onSuccess).catch(onError).finally(hide);
  };
}

export default createEdit;
