import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { stringify } from 'qs';

const { transformRequest } = axios.defaults;
const instance = axios.create({
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

instance.interceptors.response.use(response => {
  return response.data;
}, error => {
  // TODO Global error handle.  
});

/**
 * Use params to rewrite the methods, the response result follow the `no-unnecessary-generics` rule.
 * 
 * @see https://github.com/Microsoft/dtslint/blob/master/docs/no-unnecessary-generics.md
 */
interface AxiosInstanceWithParams extends AxiosInstance {
  delete(url: string, params?: any, config?: AxiosRequestConfig): Promise<any>;
  get(url: string, params?: any, config?: AxiosRequestConfig): Promise<any>;
  head(url: string, params?: any, config?: AxiosRequestConfig): Promise<any>;
  options(url: string, params?: any, config?: AxiosRequestConfig): Promise<any>;
}

['delete', 'get', 'head', 'options'].reduce((instance, method: any) => {
  // @ts-ignore
  instance[method] = function(url: string, params?: any, config?: AxiosRequestConfig) {
    return instance.request({ ...config, method, url, params });
  }

  return instance;
}, instance);

export const { 
  request, 
  delete: del, 
  get, 
  head, 
  options, 
  post, 
  put, 
  patch,
} = instance as AxiosInstanceWithParams;
