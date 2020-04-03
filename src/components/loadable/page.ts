import loadable from '@loadable/component';

interface Props {
  path: string;
}

export default loadable<Props>(
  props => import(/* webpackChunName: "pages/[request]" */`@/pages/${props.path}`),
  {
    cacheKey: props => `pages/${props.path}`
  }
);