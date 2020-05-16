import React from 'react';
import loadable from '@loadable/component';
import { onLoadError } from '@/utils/loadable';

const Module = loadable.lib(
  (props: any) => import(/* webpackChunkName: "locales/[request]" */`@/locales/${props.path}`).catch(onLoadError),
  {
    cacheKey: props => `locales/${props.path}`
  }
);

interface LocaleProps {
  paths: string[];
  children: (messages: ILocale) => React.ReactNode;
}

export default function Locale(props: LocaleProps) {
  return props.paths.reduceRight((children, path) => {
    return (messages: ILocale) => (
      <Module path={path}>
        {(module?: { default: ILocale }) => children((module ? { ...messages, ...module.default } : messages))}
      </Module>
    );
  }, props.children)({}) as JSX.Element;
}
