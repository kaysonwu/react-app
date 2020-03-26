import React from 'react';
// #!if browser
import ErrorBoundary from './boundary';
// #!endif
import { LocaleFile } from '@/utils/loadable';

interface Props {
  paths: string[];
  children: (messages: ILocale) => React.ReactNode;
}

export default ({ paths, children  }: Props) => {
  return paths.reduceRight((fn, path) => {
    return (messages: ILocale) => {
      return (
        // #!if browser
        <ErrorBoundary fallback={() => fn(messages)}>
        {/* #!endif */}
          <LocaleFile path={path}>
            { ({ default: _ }: any) => fn({ ...messages, ..._ }) }
          </LocaleFile>
        {/* #!if browser */}
        </ErrorBoundary>
        // #!endif
      );
    }
  }, children)({}) as JSX.Element;
}
