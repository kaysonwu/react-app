import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { Store } from '@/utils/model';
// #if WEB
import { useLocation } from 'react-router-dom';
import { getNameFromPath } from '@/utils/loadable';
import { LANGUAGE_CHANGE } from '@/utils/locale';
import Model from '../loadable/model';
// #endif
import LocaleProvider from '../locale-provider';
import Router from './router';

export interface ApplicationProps {
  locale: string;
  store: Store;
  page?: string;
}

const Application: FC<ApplicationProps> = ({ locale, page, store }) => {
  // #if WEB
  let setLocale: React.Dispatch<React.SetStateAction<string>>;
  // eslint-disable-next-line no-param-reassign
  [locale, setLocale] = React.useState(locale);
  // eslint-disable-next-line no-param-reassign
  page = getNameFromPath(useLocation().pathname);

  function onLanguageChange(e: Event) {
    setLocale((e as CustomEvent).detail.locale);
  }

  React.useEffect(() => {
    window.addEventListener(LANGUAGE_CHANGE, onLanguageChange);
    return () => {
      window.removeEventListener(LANGUAGE_CHANGE, onLanguageChange);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
};

export default Application;
