import loadable from '@loadable/component';

interface PageProps {
  path: string;
}

export default loadable<PageProps>(
  props => import(/* webpackChunkName: "pages/[request]" */`@/pages/${props.path}`),
  {
    cacheKey: props => `pages/${props.path}`
  }
);
