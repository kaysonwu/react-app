import React from 'react';
import loadable from '@loadable/component';
import ErrorBoundary from './boundary';

const Model = loadable.lib(
  ({ path }: any) => import(`@/models/${path}`), 
  { cacheKey: props => `models/${props.path}` }
);

interface ModelProps {
  paths: string[];
  children: (models: IModel[]) => React.ReactNode;
}

function reduce(children: Function, path: string) {
  return (models: IModel[]) => {
    return (
      <ErrorBoundary fallback={() => children(models)}>
        <Model path={path}>
          {({ default: model }: any) => {
            const { dependencies } = model as IModel;
            if (dependencies) {
              return dependencies.reduceRight(reduce, children)([...models, model]);
            }
            return children([...models, model]);
          }}
        </Model>
      </ErrorBoundary>
    );
  }
}

export default ({ paths, children }: ModelProps) => {
  return paths.reduceRight(reduce, children)([]);
}
