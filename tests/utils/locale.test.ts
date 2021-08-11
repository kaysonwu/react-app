import type { IncomingMessage } from 'http';
import { getLocale, setLocale, getLocaleFromRequest, LOCALE_CHANGE } from '@/utils/locale';

const LANGUAGE_KEY = 'locale';

describe('Test locale util', () => {
  test('getLocal', () => {
    expect(getLocale()).toEqual(navigator.language);

    document.cookie = `${LANGUAGE_KEY}=en;`;
    expect(getLocale()).toEqual('en');
  });

  test('setLocale', () => {
    const dispatchEvent = jest.fn(e => e);
    window.dispatchEvent = dispatchEvent;

    setLocale('en-US', false);

    expect(getLocale()).toEqual('en-US');
    expect(dispatchEvent.mock.results.length).toBe(1);

    expect(dispatchEvent.mock.results[0].value).toHaveProperty('type', LOCALE_CHANGE);
    expect(dispatchEvent.mock.results[0].value).toHaveProperty('detail.locale', 'en-US');
  });

  test('getLocaleFromRequest', () => {
    expect(getLocaleFromRequest({ headers: {} } as IncomingMessage, 'zh-CN')).toEqual('zh-CN');
    expect(
      getLocaleFromRequest({
        headers: { 'accept-language': 'en-US,zh;q=0.9,en;q=0.8' },
      } as IncomingMessage),
    ).toEqual('en-US');
    expect(
      getLocaleFromRequest({ headers: { cookie: `${LANGUAGE_KEY}=en;` } } as IncomingMessage),
    ).toEqual('en');
  });
});
