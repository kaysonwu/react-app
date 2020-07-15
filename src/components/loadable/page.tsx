import React, { ComponentType, ReactNode, FC, useState } from 'react';
import loadable from '@loadable/component';
import { pullInitialProps, makeRequestContext } from '@/utils/store';

type ModuleType = { default: ComponentType };

interface ModuleProps {
  path: string;
  loading?: ReactNode;
}

const Module = loadable.lib(
  props => import(/* webpackChunkName: "pages/[request]" */`@/pages/${(props as ModuleProps).path}`),
  { cacheKey: props => `pages/${props.path}` },
);

function wrapInitialPropsFetch(Component: ComponentType, loading: ReactNode): FC {
  return props => {
    const [initialProps, setInitialProps] = useState(() => pullInitialProps('page'));

    // #if WEB
    if (initialProps === undefined
      && Component.getInitialProps
    ) {
      Component.getInitialProps(makeRequestContext())
        .then(props => setInitialProps(props))
        .catch(() => {
          // TODO Page errors can use interceptor
        });

      return <>{loading}</>;
    }
    // #endif

    return <Component {...props} {...initialProps} />;
  };
}

const Page = <P extends object = {}>({ path, loading, ...props }: P & ModuleProps) => (
  <Module path={path} fallback={loading}>
    {(module: ModuleType) => {
      const Component = wrapInitialPropsFetch(module.default, loading);
      return <Component {...props} />;
    }}
  </Module>
);

export default Page;
