import type { FormInstance } from 'antd';
import type { AxiosPromise, AxiosRequestConfig, AxiosResponse, AxiosTransformer } from 'axios';
import type { ClientRequest, IncomingHttpHeaders } from 'http';

interface RequestConfig extends AxiosRequestConfig {
  transformRequest?: AxiosTransformer[];
  transformResponse?: AxiosTransformer[];
  form?: FormInstance;
  errorHandler?: <T = unknown>(error: RequestError<T>) => unknown;
}

export interface Response<T = unknown> extends AxiosResponse<T> {
  config: RequestConfig;
  headers: IncomingHttpHeaders;
}

export interface RequestError<T = unknown> extends Error {
  config: RequestConfig;
  code?: string;
  request?: XMLHttpRequest | ClientRequest;
  response?: Response<T>;
  isAxiosError: boolean;
  toJSON: () => Record<string, unknown>;
}

interface InterceptorManager<V> {
  use<T = V>(
    onFulfilled?: (value: V) => T | Promise<T>,
    onRejected?: (error: RequestError<T>) => unknown,
  ): number;
  eject(id: number): void;
}

export interface RequestInstance {
  (config: RequestConfig): AxiosPromise;
  (url: string, config?: RequestConfig): AxiosPromise;
  defaults: RequestConfig;
  interceptors: {
    request: InterceptorManager<RequestConfig>;
    response: InterceptorManager<Response>;
  };
  getUri(config?: RequestConfig): string;
  request<T = unknown, R = Response<T>>(config: RequestConfig): Promise<R>;
  get<T = unknown, R = Response<T>>(url: string, config?: RequestConfig): Promise<R>;
  delete<T = unknown, R = Response<T>>(url: string, config?: RequestConfig): Promise<R>;
  head<T = unknown, R = Response<T>>(url: string, config?: RequestConfig): Promise<R>;
  options<T = unknown, R = Response<T>>(url: string, config?: RequestConfig): Promise<R>;
  post<T = unknown, R = Response<T>>(url: string, data?: T, config?: RequestConfig): Promise<R>;
  put<T = unknown, R = Response<T>>(url: string, data?: T, config?: RequestConfig): Promise<R>;
  patch<T = unknown, R = Response<T>>(url: string, data?: T, config?: RequestConfig): Promise<R>;
}
