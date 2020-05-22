import { serialize, parse } from 'cookie';
import { IncomingHttpHeaders } from 'http';

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
