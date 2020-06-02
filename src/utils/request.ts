/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { stringify } from 'qs';

export type ParamsType = Record<string, string | string[]>;

/**
 * Use params to rewrite the methods, the response result follow the `no-unnecessary-generics` rule.
 *
 * @see https://github.com/Microsoft/dtslint/blob/master/docs/no-unnecessary-generics.md
 */
interface AxiosInstanceWithParams extends AxiosInstance {
  delete(url: string, params?: ParamsType, config?: AxiosRequestConfig): Promise<any>;
  get(url: string, params?: ParamsType, config?: AxiosRequestConfig): Promise<any>;
  head(url: string, params?: ParamsType, config?: AxiosRequestConfig): Promise<any>;
  options(url: string, params?: ParamsType, config?: AxiosRequestConfig): Promise<any>;
}

const { transformRequest } = axios.defaults;
const instance: AxiosInstanceWithParams = axios.create({
  paramsSerializer(params) {
    return stringify(params);
  },
  transformRequest(data, headers) {
    // Plain object are resolved to querystring first.
    if (toString.call(data) === '[object Object]') {
      return stringify(data);
    }

    if (Array.isArray(transformRequest)) {
      return transformRequest.reduce((data, fn) => fn(data, headers), data);
    }

    if (transformRequest) {
      return transformRequest(data, headers);
    }

    return data;
  },
});

instance.interceptors.response.use(({ data: response }) => {
  if (Object.prototype.hasOwnProperty.call(response, 'current_page')) {
    return {
      data: response.data,
      pagination: {
        showQuickJumper: true,
        showSizeChanger: true,
        current: response.current_page,
        pageSize: response.per_page,
        total: response.total,
        pageSizeOptions: ['15', '30', '50', '100'],
      },
    };
  }

  return response;
}, () => {
  // TODO Global error handle.
});

type Method = 'delete' | 'get' | 'head' | 'options';
const mehtods: Method[] = ['get', 'delete', 'head', 'options'];

mehtods.forEach(method => {
  instance[method] = (
    url: string,
    params?: ParamsType,
    config?: AxiosRequestConfig,
  ) => instance.request({ ...config, method, url, params });
});

export const { getUri, request, get, delete: del, head, options, post, patch, put } = instance;
