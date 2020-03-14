import React from 'react';
import { Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';

const Page = loadable((props: any) => import(/* webpackChunkName: "pages/[request]" */`@/pages/${props.path}`), {
  cacheKey: props => props.path
});
const NotFound = loadable(() => import('@/pages/exception/404'), {
  cacheKey: () => 'NotFound'
});

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
