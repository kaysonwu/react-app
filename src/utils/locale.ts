import { serialize, parse } from 'cookie';
import type { IncomingMessage } from 'http';
import type { IntlShape, IntlFormatters } from 'react-intl';

const LOCALE_KEY = 'locale';

// #if IS_BROWSER
export const LOCALE_CHANGE = 'LocaleChange';

/**
 * Get the locale of the application.
 */
export function getLocale(fallback = 'zh-CN'): string {
  // navigator.language minimum support IE11.
  // Use cookies instead of window.localStorage for better SSR compatibility
  return parse(document.cookie)[LOCALE_KEY] || navigator.language || fallback;
}

/**
 * Determine whether the application locale is the same as the given locale.
 */
export function isLocale(locale: string): boolean {
  return getLocale() === locale;
}

/**
 * Set the locale of the application.
 */
export function setLocale(locale: string, reload = true): void {
  if (locale === getLocale()) return;

  // Use cookies instead of window.localStorage for better SSR compatibility
  document.cookie = serialize(LOCALE_KEY, locale);

  if (reload) {
    window.location.reload();
  } else {
    // dispatchEvent support IE9+
    window.dispatchEvent(new CustomEvent(LOCALE_CHANGE, { detail: { locale } }));
  }
}

// #else

/**
 * Get the locale of the application from the request.
 */
export function getLocaleFromRequest(request: IncomingMessage, fallback = 'zh-CN'): string {
  const { headers } = request;

  return (
    (headers.cookie && parse(headers.cookie)[LOCALE_KEY]) ||
    headers['accept-language']?.split(',')[0] ||
    fallback
  );
}
// #endif

// @Internal Don't modify it
let Intl: IntlShape | undefined;
const IntlFormatter = {} as IntlFormatters;

// Used to expose the react-intl API
export function injectionIntl(intlShap: IntlShape): void {
  Intl = intlShap;
}

(
  [
    'formatDateTimeRange',
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
    'formatListToParts',
    'formatDisplayName',
  ] as (keyof IntlFormatters)[]
).forEach(method => {
  IntlFormatter[method] = (...parameters) => {
    if (Intl?.[method]) {
      // @ts-expect-error: Wait for type inference upgrade.
      return Intl[method].call(Intl, ...parameters) as never;
    }

    throw new Error(
      `react-intl ${method} not initialized yet, you should use it after react app mounted.`,
    );
  };
});

export const {
  formatDateTimeRange,
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
  formatListToParts,
  formatDisplayName,
} = IntlFormatter;
