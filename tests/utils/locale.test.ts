import { getLocale, setLocale, __getLocale__, LANGUAGE_CHANGE } from '@/utils/locale';

const LANGUAGE_KEY = 'locale';

describe('Test locale util', () => {

  test('test getLocal', () => {
    expect(getLocale()).toEqual(navigator.language);

    document.cookie = `${LANGUAGE_KEY}=en;`;
    expect(getLocale()).toEqual('en');
  });

  test('test setLocale', () => {
    const dispatchEvent = jest.fn(e => e);
    window.dispatchEvent = dispatchEvent;

    setLocale('en-US', false);
   
    expect(getLocale()).toEqual('en-US');
    expect(dispatchEvent.mock.results.length).toBe(1);

    expect(dispatchEvent.mock.results[0].value).toHaveProperty('type', LANGUAGE_CHANGE);
    expect(dispatchEvent.mock.results[0].value).toHaveProperty('detail.locale', 'en-US');
  });

  test('test __getLocale__', () => {
    expect(__getLocale__({}, 'zh-CN')).toEqual('zh-CN');
    expect(__getLocale__({ "accept-language": 'en-US,zh;q=0.9,en;q=0.8' })).toEqual('en-US');
    expect(__getLocale__({ cookie: `${LANGUAGE_KEY}=en;` })).toEqual('en');
  });
});
