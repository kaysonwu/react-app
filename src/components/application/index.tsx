import React from 'react';
import LocaleProvider from '../locale-provider';
import { Provider } from 'react-redux';
import { Store } from '@/utils/model';
// #if WEB
import { useLocation } from 'react-router-dom';
import { getNameFromPath } from '@/utils/loadable'
import { LANGUAGE_CHANGE } from '@/utils/locale'
import Model from '../loadable/model';
// #endif
import Router from './router';

export interface ApplicationProps {
  locale: string;
  store: Store;
  page?: string;
}

function Application({ locale, store, page }: ApplicationProps) {
  // #if WEB
  let setLocale: React.Dispatch<React.SetStateAction<string>>;
  [locale, setLocale] = React.useState(locale);
  page = getNameFromPath(useLocation().pathname);

  function onLanguageChange(e: Event) {
    setLocale((e as CustomEvent).detail.locale);
  }

  React.useEffect(() => {
    window.addEventListener(LANGUAGE_CHANGE, onLanguageChange);
    return () => {
      window.removeEventListener(LANGUAGE_CHANGE, onLanguageChange);
    }
  }, []);
  // #endif

  return (
    <LocaleProvider locale={locale} files={page ? [locale, `${locale}/${page}`] : undefined}>
      <Provider store={store}>
        {/* #if WEB */}
        <Model paths={[page]}>
          {models => {
            store.modelManager.add(...models);
            return <Router />;
          }}
        </Model>
        {/* #else */}
        <Router />
        {/* #endif */}
      </Provider>
    </LocaleProvider>
  );
}

export default Application;
