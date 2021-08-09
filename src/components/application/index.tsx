import React, { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import isMobile from 'is-mobile';
import { LOCALE_CHANGE } from '@/utils/locale';
// #if IS_BROWSER
import { getNameFromPath } from '@/utils/loadable';
import { makeRequestContext } from '@/utils/store';
// #endif
import LocaleProvider from '../locale-provider';
import App, { GlobalState } from './context';
import Router from './router';

export interface ApplicationProps {
  /**
   * Application Locale Configuration.
   */
  locale: string;

  /**
   * Global Props.
   */
  state?: GlobalState;
}

const Application: FC<ApplicationProps> = ({ state: initialState, locale }) => {
  const [state, setState] = useState(initialState);
  const files = [locale, `${locale}/${getNameFromPath(useLocation().pathname)}`];

  // #if IS_BROWSER
  let setLocale: React.Dispatch<React.SetStateAction<string>>;
  [locale, setLocale] = useState(locale);

  function onLocaleChange(e: Event) {
    setLocale((e as CustomEvent).detail.locale);
  }

  React.useEffect(() => {
    window.addEventListener(LOCALE_CHANGE, onLocaleChange);
    return () => {
      window.removeEventListener(LOCALE_CHANGE, onLocaleChange);
    };
  }, []);

  if (state === undefined) {
    Application.getInitialProps!(makeRequestContext())
      .then(props => setState(props.state))
      .catch(error => console.error(error));

    return null;
  }
  // #endif

  return (
    <LocaleProvider locale={locale} files={files}>
      <App.Provider value={{ state }}>
        <Router />
      </App.Provider>
    </LocaleProvider>
  );
};

Application.getInitialProps = async (ctx) => {
  const ua = ctx.request ? ctx.request.headers['user-agent'] : navigator.userAgent;

  return { state: { isMobile: isMobile({ ua }) } };
};

export default Application;
