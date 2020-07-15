import React, { FC, useReducer, useMemo } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { getPathRoutes, injectionRoute } from '@/utils/route';
import { LANGUAGE_CHANGE, formatMessage } from '@/utils/locale';
// #if WEB
import { getNameFromPath } from '@/utils/loadable';
import { ErrorResponse, get } from '@/utils/request';
import { makeRequestContext } from '@/utils/store';
// #endif
import LocaleProvider from '../locale-provider';
import App, { GlobalState } from './context';
import reducer from './reducer';
import Router from './router';

export interface ApplicationProps {
  isMobile: boolean;
  locale: string;
  state?: GlobalState;
  page?: string;
}

const Application: FC<ApplicationProps> = ({ isMobile, state: initialState, locale, page }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { pathname } = useLocation();

  const { menus } = state || {};
  const routes = useMemo(() => menus && getPathRoutes(menus, pathname), [menus, pathname])!;

  injectionRoute(useHistory());

  // #if WEB
  let setLocale: React.Dispatch<React.SetStateAction<string>>;
  // eslint-disable-next-line no-param-reassign
  [locale, setLocale] = React.useState(locale);
  // eslint-disable-next-line no-param-reassign
  page = getNameFromPath(pathname);

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

  if (state === undefined) {
    Application.getInitialProps!(makeRequestContext())
      .then(props => dispatch({ type: 'initial', payload: props.state! }))
      .catch(error => {
        const { response: { status, data } } = error as ErrorResponse;
        if (status === 401) {
          window.location.href = data;
        }
      });

    return null;
  }
  // #endif

  function getPageTitle(customizeTitle?: string, signed = true) {
    const title = customizeTitle || formatMessage({ id: routes[routes.length - 1]?.name });

    if (signed) {
      return `${title} - ${formatMessage({ id: 'App Name' })}`;
    }

    return title;
  }

  return (
    <LocaleProvider locale={locale} files={page ? [locale, `${locale}/${page}`] : undefined}>
      <App.Provider value={{ isMobile, routes, state, dispatch, getPageTitle }}>
        <Router />
      </App.Provider>
    </LocaleProvider>
  );
};

// #if WEB
Application.getInitialProps = async () => {
  const [user, menus, links] = await Promise.all([
    get('/v1/currentUser') as Promise<IUser>,
    get('/v1/my/menus') as Promise<IMenu[]>,
    get('/v1/links', { type: 'ic-footer' }) as Promise<ILink[]>,
  ]);

  return { state: { user, menus, links } };
};
// #endif

export default Application;
