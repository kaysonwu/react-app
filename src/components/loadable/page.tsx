import React from 'react';
import loadable from '@loadable/component';
import ErrorBoundary from './boundary';

interface Props {
  path: string;
}

const Page = loadable<Props>(
  props => import(/* webpackChunName: "pages/[request]" */`@/pages/${props.path}`),
  {
    cacheKey: props => `pages/${props.path}`
  }
);

// #!if browser
// @ts-ignore
export default ({ path, children }: any) => {
  return (
    <ErrorBoundary fallback={() => children}>
      <Page path={path}>{children}</Page>
    </ErrorBoundary>
  );
}
// #!else
// @ts-ignore
export default Page;
// #!endif
