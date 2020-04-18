import React from 'react';
import loadable from '@loadable/component';
import ErrorBoundary from './boundary';

interface Props {
  path: string;
}

const Page = loadable<Props>(
  props => import(/* webpackChunkName: "pages/[request]" */`@/pages/${props.path}`),
  {
    cacheKey: props => `pages/${props.path}`
  }
);

export const NotFound = loadable(
  () => import(/* webpackChunkName: "pages/404" */ '@/pages/exception/404'),
  {
    cacheKey: () => 'pages/exception-404'
  }
);

// #if WEB
// @ts-ignore
export default ({ path, children }: any) => {
  return (
    <ErrorBoundary fallback={() => children}>
      <Page path={path}>{children}</Page>
    </ErrorBoundary>
  );
}
// #else
// @ts-ignore
export default Page;
// #endif
