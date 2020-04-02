import React, { useEffect, useState } from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import LocaleProvider from '../locale-provider';
import { getNameFromPath, getLocale } from '@/utils/locale'

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
    setLocale(getLocale());
  }


  useEffect(() => {
    return () => {

    }
  });
  // #!endif

  return (
    <LocaleProvider locale={locale} files={files}>
      <Provider store={store}>
        <div>Hello ssr!</div>
      </Provider>
    </LocaleProvider>
  );
}
