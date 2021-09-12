import React, { FC, ComponentType, useState, useRef } from 'react';
import { pullInitialProps, makeRequestContext } from '@/utils/store';
import usePrevious from '@/hooks/usePrevious';

interface PageProps {
  /**
   * Page component path, relative to `@/pages` folder.
   */
  path: string;

  /**
   * Fallback displayed during the loading.
   */
  fallback?: JSX.Element;

  /**
   * Disable children.
   */
  children?: null;
}

const Page: FC<PageProps> = ({ path, fallback, ...props }) => {
  const initialProps = useRef<unknown>();

  if (initialProps.current === undefined) {
    initialProps.current = pullInitialProps('page');
  }

  let View: ComponentType | undefined =
    // #if IS_NODE
    // TODO: Waiting https://github.com/tleunen/babel-plugin-module-resolver/issues/322
    // eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-dynamic-require, global-require
    require(`../../pages/${path}`).default;

  // #elif IS_BROWSER
  const previousPath = usePrevious(path);
  let setView: React.Dispatch<React.SetStateAction<ComponentType | undefined>>;
  // eslint-disable-next-line prefer-const
  [View, setView] = useState<ComponentType>();

  if (View === undefined || previousPath !== path) {
    import(
      /* webpackInclude: /\.(j|t)sx?$/ */
      /* webpackChunkName: "pages/[request]" */
      `@/pages/${path}`
    ).then(async module => {
      const view = module.default as ComponentType;

      if (initialProps.current === undefined && view.getInitialProps) {
        initialProps.current = await view
          .getInitialProps(makeRequestContext())
          .catch(e => console.error(e));
      }
      setView(() => view);
    });

    return fallback || null;
  }
  // #endif

  return <View {...props} {...initialProps.current} />;
};

export default Page;
