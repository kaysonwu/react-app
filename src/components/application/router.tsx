import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Page from '../loadable/page';

function Router() {
  return (
    <Switch>
      <Route path="/user">
        <Page path="user" />
      </Route>
      <Route path="/exception/404">
        <Page path="exception/404" />
      </Route>
      <Route exact path="/">
        <Page path="home" />
      </Route>
      <Redirect from="*" to="/exception/404" />
    </Switch>
  );
}

export default Router;
