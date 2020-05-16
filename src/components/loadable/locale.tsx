import React from 'react';
import loadable from '@loadable/component';
import { onLoadError } from '@/utils/loadable';

type ModuleType = { default: ILocale };

const Module = loadable.lib(
  (props: any) => import(/* webpackChunkName: "locales/[request]" */`@/locales/${props.path}`).catch(onLoadError),
  { cacheKey: props => `locales/${props.path}` },
);

interface LocaleProps {
  paths: string[];
  children: (messages: ILocale) => React.ReactNode;
}

function reduce(children: Function, path: string) {
  return (messages: ILocale) => (
    <Module path={path}>
      {(module?: ModuleType) => children(module ? { ...messages, ...module.default } : messages)}
    </Module>
  );
}

export default function Locale(props: LocaleProps) {
  return props.paths.reduceRight(reduce, props.children)({}) as JSX.Element;
}
