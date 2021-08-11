import React, { ComponentType, ReactNode, FC, useState } from 'react';
import loadable from '@loadable/component';
import { pullInitialProps, makeRequestContext } from '@/utils/store';

type ModuleType = { default: ComponentType };

interface ModuleProps {
  path: string;
  loading?: ReactNode;
}

const Module = loadable.lib((props: ModuleProps) => import(`@/pages/${props.path}`), {
  cacheKey: props => `pages/${props.path}`,
});

function wrapInitialPropsFetch(Component: ComponentType, loading: ReactNode): FC {
  return props => {
    const [initialProps, setInitialProps] = useState(() => pullInitialProps('page'));

    // #if IS_BROWSER
    if (initialProps === undefined && Component.getInitialProps) {
      Component.getInitialProps(makeRequestContext())
        .then(data => setInitialProps(data))
        .catch(error => console.error(error));

      return <>{loading}</>;
    }
    // #endif

    return <Component {...props} {...initialProps} />;
  };
}

const Page = <P extends ModuleProps>({ path, loading, ...props }: P): JSX.Element => (
  <Module path={path} fallback={loading}>
    {(module: ModuleType) => {
      const Component = wrapInitialPropsFetch(module.default, loading);
      return <Component {...props} />;
    }}
  </Module>
);

export default Page;
