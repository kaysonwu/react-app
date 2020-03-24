import React from 'react';
import loadable from '@loadable/component';
import ErrorBoundary from './boundary';

interface Props {
  paths: string[];
  children: (messages: ILocale) => React.ReactNode;
}

const LocaleFile = loadable.lib(
  ({ path }: any) => import(`@/locales/${path}`), 
  { cacheKey: props => `locales/${props.path}` }
);

export default ({ paths, children  }: Props) => {
  return paths.reduceRight((fn, path) => {
    return (messages: ILocale) => {
      return (
        <ErrorBoundary fallback={() => fn(messages)}>
          <LocaleFile path={path}>
            { ({ default: _ }: any) => fn({ ...messages, ..._ }) }
          </LocaleFile>
        </ErrorBoundary>
      );
    }
  }, children)({}) as JSX.Element;
}
