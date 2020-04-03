import { serialize, parse } from 'cookie';
import { IncomingHttpHeaders } from "http";

const LANGUAGE_KEY = 'locale';

// #!if browser
export const LANGUAGE_CHANGE = 'languageChange';

// @ts-ignore
export function getLocale(fallback: string = 'zh-CN') {
  // navigator.language minimum support IE11.
  // Use cookies instead of window.localStorage for better SSR compatibility
  return parse(document.cookie)[LANGUAGE_KEY] || navigator.language || fallback;
}

export function isLocale(locale: string) {
  return getLocale() === locale;
}

export function setLocale(locale: string, reload: boolean = true): void {

  if (locale === getLocale()) return;

  // localStorage support IE8.0
  // Use cookies instead of window.localStorage for better SSR compatibility
  document.cookie = serialize(LANGUAGE_KEY, locale);
  
  if (reload) {
    return window.location.reload();
  } else {
    // localStorage support IE9+
    window.dispatchEvent(new CustomEvent(LANGUAGE_CHANGE, { detail: { locale } }));
  }
}

// #!else
// @ts-ignore
export function getLocale(headers: IncomingHttpHeaders, fallback = 'zh-CN') {
  return parse(`${headers.cookie}`)[LANGUAGE_KEY] || 
    headers["accept-language"]?.split(',')[0] || 
    fallback;
}
// #!endif
