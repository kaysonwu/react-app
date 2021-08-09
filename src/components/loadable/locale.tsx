import React from 'react';
import loadable from '@loadable/component';
import { onLoadError } from '@/utils/loadable';

type ModuleType = { default: Locale };

type ModuleProps = {
  path: string;
};

const Module = loadable.lib(
  (props: ModuleProps) => import(`@/locales/${props.path}`).catch(onLoadError),
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

export default function Locale({ paths, children }: LocaleProps) {
  return paths.reduceRight(reduce, children)({}) as JSX.Element;
}
