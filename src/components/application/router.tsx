import React, { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Spin } from 'antd';
import Page from '../loadable/page';

const Router: FC = () => {
  const loading = <Spin />;

  return (
    <Switch>
      <Route path="/exception/404">
        <Page path="exception/404" fallback={loading} />
      </Route>
      <Route path="/exception/403">
        <Page path="exception/403" fallback={loading} />
      </Route>
      <Route path="/exception/500">
        <Page path="exception/500" fallback={loading} />
      </Route>
      <Route exact path="/">
        <Page path="home" fallback={loading} />
      </Route>
      <Redirect from="*" to="/exception/404" />
    </Switch>
  );
};

export default Router;
