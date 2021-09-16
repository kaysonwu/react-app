import axios from 'axios';
import { paginate, serialize, unserialize } from './transformers';
import errorHandler from './errorHandler';
import type { RequestInstance, Response, RequestError } from './interface';

const instance = axios.create({
  headers: { Accept: 'application/json, text/plain, */*' },
  paramsSerializer: serialize,
  transformRequest: [],
  transformResponse: [],
}) as RequestInstance;

// 请求拦截器
instance.interceptors.request.use(config => ({
  ...config,
  transformRequest: [...config.transformRequest!, serialize],
  transformResponse: [unserialize, ...config.transformResponse!, paginate],
}));

// 通过请求拦截器设置错误处理程序
instance.interceptors.response.use(undefined, errorHandler);

export type { Response, RequestError };
export const { getUri, request, get, post, put, patch, delete: del, head, options } = instance;
