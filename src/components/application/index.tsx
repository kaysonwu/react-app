import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import LocaleProvider from '../locale-provider';
import Model from '../loadable/model';
import { Store } from '@/utils/model';
import { getNameFromPath } from '@/utils/loadable'
import { LANGUAGE_CHANGE } from '@/utils/locale'

export interface ApplicationProps {
  locale: string;
  store: Store;
  location?: { pathname: string; }
}

export default ({ locale, store, location }: ApplicationProps) => {
  
  // #!if browser
  let setLocale: any;
  [locale, setLocale] = useState(locale);
  // #!endif
  const files = location ? [locale, `${locale}/${getNameFromPath(location.pathname)}`] : undefined;
  
  // #!if browser
  const handleLanguageChange = (e: any) => {
    setLocale((e as CustomEvent).detail.locale);
  }

  useEffect(() => {
    window.addEventListener(LANGUAGE_CHANGE, handleLanguageChange);
    return () => {
      window.removeEventListener(LANGUAGE_CHANGE, handleLanguageChange)
    }
  }, []);
  // #!endif

  return (
    <LocaleProvider locale={locale} files={files}>
      <Provider store={store}>
        {/* #!if browser */}
        <Model paths={['user']}>
          {(models: IModel[]) => {
            store.modelManager.add(...models)
            return <div>Hello ssr!</div>
          }}
        </Model>
        {/* #!else */}
        <div>Hello ssr!</div>
        {/* #!endif */}
      </Provider>
    </LocaleProvider>
  );
}
