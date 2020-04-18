import React from 'react';
import loadable from '@loadable/component';
import ErrorBoundary from './boundary';

const Locale = loadable.lib(
  (props: any) => import(/* webpackChunkName: "locales/[request]" */`@/locales/${props.path}`),
  {
    cacheKey: props => `locales/${props.path}`
  }
);

interface Props {
  paths: string[];
  children: (messages: ILocale) => React.ReactNode;
}

export default ({ paths, children  }: Props) => {
  return paths.reduceRight((fn, path) => {
    return (messages: ILocale) => {
      return (
        /* #if WEB */
        <ErrorBoundary fallback={() => fn(messages)}>
        {/* #endif */}
          <Locale path={path}>
            { ({ default: m }: any) => fn({ ...messages, ...m }) }
          </Locale>
        {/* #if WEB */}
        </ErrorBoundary>
        /* #endif */
      );
    }
  }, children)({}) as JSX.Element;
}
