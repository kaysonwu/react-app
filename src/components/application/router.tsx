import React, { FC, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Spin } from 'antd';
import Page from '../loadable/page';
import { Basic } from '../layout';

const Router: FC = () => {
  let loading;

  // #if WEB
  const intl = useIntl();
  const history = useHistory();

  // eslint-disable-next-line prefer-const
  loading = <Spin />;

  useEffect(() => {
    window.intl = intl;
    window.route = history;
  }, [intl, history]);
  // #endif

  return (
    <Basic>
      <Switch>
        <Route path="/user">
          <Page path="user" fallback={loading} />
        </Route>
        <Route path="/exception/404">
          <Page path="exception/404" fallback={loading} />
        </Route>
        <Route exact path="/">
          <Page path="home" fallback={loading} />
        </Route>
        <Redirect from="*" to="/exception/404" />
      </Switch>
    </Basic>
  );
};

export default Router;
