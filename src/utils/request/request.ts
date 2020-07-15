/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import axios, { AxiosRequestConfig, AxiosInterceptorManager, AxiosResponse } from 'axios';
import { stringify } from 'qs';
import { message } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { push } from '../route';
import { formatMessage } from '../locale';

export type ParamsType = Record<string, any>;

export interface RequestConfig extends AxiosRequestConfig {
  // 禁用给定状态码的响应拦截器
  withoutInterceptor?: number | number[];
  form?: FormInstance;
}

export interface Response<T = any> extends AxiosResponse<T> {
  config: RequestConfig;
}

export interface ErrorResponse extends Error {
  config: RequestConfig;
  request: XMLHttpRequest;
  response: Response;
  isAxiosError: boolean;
}

interface AxiosInstance {
  interceptors: {
    request: AxiosInterceptorManager<RequestConfig>;
    response: AxiosInterceptorManager<Response>;
  };
  getUri(config?: RequestConfig): string;
  request<T = any, R = Response<T>>(config: RequestConfig): Promise<T | R>;
  get<T = any, R = Response<T>>(url: string, params?: ParamsType, config?: RequestConfig): Promise<T | R>;
  delete<T = any, R = Response<T>>(url: string, params?: ParamsType, config?: RequestConfig): Promise<T | R>;
  head<T = any, R = Response<T>>(url: string, params?: ParamsType, config?: RequestConfig): Promise<T | R>;
  options<T = any, R = Response<T>>(url: string, params?: ParamsType, config?: RequestConfig): Promise<T | R>;
  post<T = any, R = Response<T>>(url: string, data?: ParamsType, config?: RequestConfig): Promise<T | R>;
  put<T = any, R = Response<T>>(url: string, data?: ParamsType, config?: RequestConfig): Promise<T | R>;
  patch<T = any, R = Response<T>>(url: string, data?: ParamsType, config?: RequestConfig): Promise<T | R>;
}

const { transformRequest } = axios.defaults;
const instance = axios.create({
  paramsSerializer(params) {
    return stringify(params);
  },
  transformRequest(data, headers) {
    // Plain object are resolved to querystring first.
    if (Object.prototype.toString.call(data) === '[object Object]') {
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
}) as AxiosInstance;

function convertValidationErrorToFieldData(response: any) {
  const { errors } = response;

  // For Laravel:
  // {"message":"The given data was invalid.","errors":{"field": ["error message"]}}
  if (errors !== undefined) {
    return Object.keys(errors)
      .map(name => ({ name, errors: errors[name], value: undefined }));
  }

  // For Customize
  // {"field": "first error message"}
  return Object.keys(response)
    .map(name => ({ name, erros: [response[name]], value: undefined }));
}

function withoutInterceptor(response: Response) {
  const { config: { withoutInterceptor }, status } = response;
  const codes = typeof withoutInterceptor === 'number' ? [withoutInterceptor] : withoutInterceptor;
  return codes?.includes(status);
}

instance.interceptors.response.use(res => {
  if (withoutInterceptor(res)) {
    return res;
  }

  const { config: { form }, data: response } = res;

  if (Object.prototype.hasOwnProperty.call(response, 'current_page')) {
    return {
      dataSource: response.data,
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

  if (form) {
    form.resetFields();

    if (typeof response === 'string') {
      message.success(response || formatMessage({ id: 'Successful operation' }));
      return true;
    }
  }

  return response;
}, error => {
  const { response } = error as ErrorResponse;
  if (!withoutInterceptor(response)) {
    const { config: { form }, status, data } = response;
    switch (status) {
      case 422:
        if (typeof data === 'string') {
          message.error(data);
        } else {
          form?.setFields(convertValidationErrorToFieldData(data));
        }
        return;
      case 401:
        window.location.href = data;
        return;
      case 403:
        push('/exception/404');
        return;
      case 404:
        message.error(data);
        return;
      case 500:
        push('/exception/500');
        return;
      default: // TODO 更多的错误拦截
    }
  }

  throw error;
});

type Method = 'delete' | 'get' | 'head' | 'options';
const methods: Method[] = ['get', 'delete', 'head', 'options'];

methods.forEach(method => {
  instance[method] = <T = any, R = Response<T>>(
    url: string,
    params?: ParamsType,
    config?: RequestConfig,
  ): Promise<T | R> => instance.request<T, R>({ ...config, method, url, params });
});

export const { getUri, request, get, delete: del, head, options, post, patch, put } = instance;
