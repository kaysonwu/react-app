/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosInterceptorManager, AxiosResponse } from 'axios';
import { stringify } from 'qs';
import { message } from 'antd';
import { FormInstance } from 'antd/lib/form';

export type ParamsType = Record<string, string | string[]>;

interface RequestConfig extends AxiosRequestConfig {
  withoutInterceptor?: true | number | number[];
  form?: FormInstance;
}

export interface Response<T = any> extends AxiosResponse<T> {
  config: RequestConfig;
}

type MethodHandler<T = any, R = Response<T>> = (
  url: string,
  params?: ParamsType,
  config?: RequestConfig,
) => Promise<R> | Promise<T>;

interface AxiosInstance {
  interceptors: {
    request: AxiosInterceptorManager<RequestConfig>;
    response: AxiosInterceptorManager<Response>;
  };
  getUri(config?: RequestConfig): string;
  request<T = any, R = Response<T>> (config: RequestConfig): Promise<R> | Promise<T>;
  get: MethodHandler;
  delete: MethodHandler;
  head: MethodHandler;
  options: MethodHandler;
  post: MethodHandler;
  put: MethodHandler;
  patch: MethodHandler;
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

instance.interceptors.response.use(res => {
  const { config: { withoutInterceptor, form }, data: response } = res;

  if (withoutInterceptor) {
    return res;
  }

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

  if (form) {
    form.resetFields();

    if (typeof response === 'string') {
      message.success(response || window.intl.formatMessage({ id: 'Successful operation' }));
      return true;
    }
  }

  return response;
}, error => {
  const { config: { withoutInterceptor, form }, status, data } = error.response as Response;
  const statuses = typeof withoutInterceptor === 'number' ? [withoutInterceptor] : withoutInterceptor;

  if (!statuses
    || statuses === true
    || !statuses.includes(status)
  ) {
    switch (status) {
      case 422:
        if (typeof data === 'string') {
          message.error(data);
        } else {
          form?.setFields(convertValidationErrorToFieldData(data));
        }
        return;
      default:
        // TODO 根据错误码渲染错误
        return;
    }
  }

  throw error;
});

type Method = 'delete' | 'get' | 'head' | 'options';
const methods: Method[] = ['get', 'delete', 'head', 'options'];

methods.forEach(method => {
  instance[method] = (
    url: string,
    params?: ParamsType,
    config?: RequestConfig,
  ) => instance.request({ ...config, method, url, params });
});

export const { getUri, request, get, delete: del, head, options, post, patch, put } = instance;
