import React, { ReactNode } from 'react';
import loadable from '@loadable/component';
import { onLoadError } from '@/utils/loadable';

const Module = loadable.lib(
  (props: any) => import(/* webpackChunkName: "models/[request]" */`@/models/${props.path}`).catch(onLoadError), 
  { cacheKey: props => `models/${props.path}` }
);

type ModelChildren = (models: IModel[]) => ReactNode;

interface ModelProps {
  paths: string[];
  children: ModelChildren;
}

function reduce(children: ModelChildren, path: string) {
  return function(models: IModel[]) {
    return (
      <Module path={path}>
        {(module?: { default: IModel }) => {
          if (module) {
            const { dependencies } = module.default;
            models.push(module.default);

            if (dependencies) {
              return dependencies.reduceRight(reduce, children)(models);
            }
          }

          return children(models);
        }}
      </Module>
    );
  }
}

export default function Model({ paths, children }: ModelProps) {
  return paths.reduceRight(reduce, children)([]) as JSX.Element;
}
