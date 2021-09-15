import { message } from 'antd';
import { is, isPlainObject } from '@/utils/is';
import { formatMessage } from '@/utils/locale';
import type { FieldData } from 'rc-field-form/lib/interface';
import type { RequestError } from './interface';

interface ValidateError {
  message: string;
  errors: Record<string, string[]>;
}

function isValidateError(value: unknown): value is ValidateError {
  return isPlainObject<unknown>(value) && isPlainObject<string[]>(value.errors);
}

function normalizeMessage(value: unknown, defaultMessage = ''): string {
  if (is<string>('string', value)) {
    return value;
  }

  if (isValidateError(value)) {
    return value.errors[Object.keys(value.errors)[0]][0];
  }

  if (isPlainObject<string>(value)) {
    return value.message || defaultMessage;
  }

  return defaultMessage;
}

function convertEntityErrorToFieldData(data: unknown): FieldData[] {
  if (isValidateError(data)) {
    return Object.keys(data.errors).map(key => ({
      name: key.replace(/\.\d+/g, ''),
      errors: data.errors[key],
      value: undefined,
    }));
  }

  // For Customize
  // {"field": "first error message"}
  if (isPlainObject<string>(data)) {
    return Object.keys(data).map(
      name => ({ name, errors: [data[name]], value: undefined } as FieldData),
    );
  }

  return [];
}

export default function errorHandler<T>(error: RequestError<T>): unknown {
  const {
    config: { form, errorHandler: handler },
    response,
  } = error;

  if (handler) {
    return handler(error);
  }

  const { status, statusText, data } = response || { status: 0 };

  switch (status) {
    case 401: // 未登录
      window.location.href = '//passport.jinmao.com';
      break;
    case 403: // 未获得权限
    case 404: // 未找到数据
    case 419: // 认证令牌失效
    case 429: // 请求过快
    case 500: // 服务器错误
      message.error(normalizeMessage(data) || formatMessage({ id: statusText }));
      break;
    case 422: // 数据验证错误
      if (form) {
        form.setFields(convertEntityErrorToFieldData(data));
      } else {
        message.error(normalizeMessage(data) || formatMessage({ id: statusText }));
      }
      break;
    default:
      message.error(error.message);
      break;
  }

  return undefined;
}
