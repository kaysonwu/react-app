import React from 'react';
import loadable from '@loadable/component';
import { onLoadError } from '@/utils/loadable';

type ModuleType = { default: Locale };

const Module = loadable.lib(
  props => import(/* webpackChunkName: "locales/[request]" */`@/locales/${(props as { path: string }).path}`).catch(onLoadError),
  { cacheKey: props => `locales/${props.path}` },
);

interface LocaleProps {
  paths: string[];
  children: (messages: Locale) => React.ReactNode;
}

function reduce(children: Function, path: string) {
  return (messages: Locale) => (
    <Module path={path}>
      {(module?: ModuleType) => children(module ? { ...messages, ...module.default } : messages)}
    </Module>
  );
}

export default function Locale(props: LocaleProps) {
  return props.paths.reduceRight(reduce, props.children)({}) as JSX.Element;
}
