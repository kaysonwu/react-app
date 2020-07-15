import { ParamsType, RequestConfig, updateQueryParams, get } from '@/utils/request';
import { ErrorEventHandler } from '../interface';

function createQuery<T>(
  url: string,
  onStart: () => void,
  onSuccess: (data: T) => void,
  onError: ErrorEventHandler,
) {
  return (params: ParamsType, renewal?: boolean, config?: RequestConfig) => {
    onStart();
    get(url, updateQueryParams(params, renewal), config).then(onSuccess).catch(onError);
  };
}

export default createQuery;
