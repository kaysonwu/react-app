import React, { FC } from 'react';
import { Spin } from 'antd';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Page } from '@/components/loadable';

const Router: FC = () => {
  const loading = <Spin />;

  return (
    <Switch>
      <Route path="/exception/404">
        <Page fallback={loading} path="exception/404" />
      </Route>
      <Route path="/exception/403">
        <Page fallback={loading} path="exception/403" />
      </Route>
      <Route path="/exception/500">
        <Page fallback={loading} path="exception/500" />
      </Route>
      <Route exact path="/">
        <Page fallback={loading} path="home" />
      </Route>
      <Redirect from="*" to="/exception/404" />
    </Switch>
  );
};

export default Router;
