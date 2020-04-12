import React from 'react';
import { Switch, Route } from 'react-router-dom';
// @ts-ignore
import Page, { NotFound } from '../loadable/page';

export default () => {
  return (
    <Switch>
      <Route path="/user">
        <Page path="user" />
      </Route>
      <Route path="/">
        <Page path="home" />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
}
