import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Store as ReduxStore } from 'redux';
import { Provider } from 'react-redux';
import { useLocation } from 'react-router-dom';
import LocaleProvider from '../locale-provider';
// #if WEB
import Model from '../loadable/model';
// #endif
import Route from './route';
import { Store } from '@/utils/model';
import { getNameFromPath } from '@/utils/loadable'
import { LANGUAGE_CHANGE } from '@/utils/locale'

export interface ApplicationProps {
  locale: string;
  store: Store | ReduxStore;
  page?: string;
}

function  Application({ locale, store, page }: ApplicationProps) {
  // #if WEB
  let setLocale: Dispatch<SetStateAction<string>>;
  [locale, setLocale] = useState(locale);
  page = getNameFromPath(useLocation().pathname);

  const handleLanguageChange = (e: Event) => {
    setLocale((e as CustomEvent).detail.locale);
  }

  useEffect(() => {
    window.addEventListener(LANGUAGE_CHANGE, handleLanguageChange);
    return () => {
      window.removeEventListener(LANGUAGE_CHANGE, handleLanguageChange)
    }
  }, []);
  // #endif

  return (
    <LocaleProvider locale={locale} files={page ? [locale, `${locale}/${page}`] : undefined}>
      <Provider store={store}>
        {/* #if WEB */}
        <Model paths={[page]}>
          {(models: IModel[]) => {
            (store as Store).modelManager.add(...models)
            return <Route />
          }}
        </Model>
        {/* #else */}
        <Route />
        {/* #endif */}
      </Provider>
    </LocaleProvider>
  );
}

export default Application;
