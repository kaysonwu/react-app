import { serialize, parse } from 'cookie';
import { IncomingHttpHeaders } from 'http';
import { IntlShape, IntlFormatters } from 'react-intl';

const LANGUAGE_KEY = 'locale';

// #if WEB
export const LANGUAGE_CHANGE = 'languageChange';

export function getLocale(fallback = 'zh-CN') {
  // navigator.language minimum support IE11.
  // Use cookies instead of window.localStorage for better SSR compatibility
  return parse(document.cookie)[LANGUAGE_KEY]
    || navigator.language
    || fallback;
}

export function isLocale(locale: string) {
  return getLocale() === locale;
}

export function setLocale(locale: string, reload = true) {
  if (locale === getLocale()) return;

  // Use cookies instead of window.localStorage for better SSR compatibility
  document.cookie = serialize(LANGUAGE_KEY, locale);

  if (reload) {
    window.location.reload();
  } else {
    // dispatchEvent support IE9+
    window.dispatchEvent(new CustomEvent(LANGUAGE_CHANGE, { detail: { locale } }));
  }
}
// #endif

// #if NODE_SERVER
// eslint-disable-next-line no-underscore-dangle
export function __getLocale__(headers: IncomingHttpHeaders, fallback = 'zh-CN') {
  const { cookie } = headers;
  return (cookie && parse(cookie)[LANGUAGE_KEY])
    || headers['accept-language']?.split(',')[0]
    || fallback;
}
// #endif

let intl: IntlShape | undefined;
const intlApi = {} as IntlFormatters;

// @Internal Don't modify it
// Used to expose the react-intl API
export function injectionIntl(intlShap: IntlShape) {
  intl = intlShap;
}

([
  'formatDate',
  'formatTime',
  'formatDateToParts',
  'formatTimeToParts',
  'formatRelativeTime',
  'formatNumber',
  'formatNumberToParts',
  'formatPlural',
  'formatMessage',
  'formatList',
  'formatDisplayName',
] as (keyof IntlFormatters)[]).forEach(method => {
  intlApi[method] = (...args: any[]) => {
    if (intl?.[method]) {
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return intl[method].call(intl, ...args) as any;
    }

    throw new Error(`react-intl ${method} not initialized yet, you should use it after react app mounted.`);
  };
});


export const {
  formatDate,
  formatTime,
  formatDateToParts,
  formatTimeToParts,
  formatRelativeTime,
  formatNumber,
  formatNumberToParts,
  formatPlural,
  formatMessage,
  formatList,
  formatDisplayName,
} = intlApi;
