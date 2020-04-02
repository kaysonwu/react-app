import React from 'react';
import loadable from '@loadable/component';
import ErrorBoundary from './boundary';

const Model = loadable.lib(
  (props: any) => import(/* webpackChunkName: "models/[request]" */`@/models/${props.path}`), 
  { cacheKey: props => `models/${props.path}` }
);

interface Props {
  paths: string[];
  children: (models: IModel[]) => React.ReactNode;
}

const reducer = (children: Function, path: string) => {
  return (models: IModel[]) => {
    return (
      <ErrorBoundary fallback={() => children(models)}>
        <Model path={path}>
          {({ default: model }: any) => {
            const { dependencies } = model as IModel;
            if (dependencies) {
              return dependencies.reduceRight(reducer, children)([...models, model]);
            }
            return children([...models, model]);
          }}
        </Model>
      </ErrorBoundary>
    );
  }
}

export default ({ paths, children }: Props) => {
  return paths.reduceRight(reducer, children)([]) as JSX.Element;
}
