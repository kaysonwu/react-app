import React, { FC, ComponentType, useState, useRef } from 'react';
import { pullInitialProps, makeRequestContext } from '@/utils/store';

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
  const [View, setView] = useState<ComponentType>(
    // #if
    // eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-dynamic-require, global-require
    () => require(`@/pages/${path}`).default,
    // #endif
  );

  if (initialProps.current === undefined) {
    initialProps.current = pullInitialProps('page');
  }

  // #if IS_BROWSER
  if (View === undefined) {
    import(`@/pages/${path}`).then(async module => {
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
