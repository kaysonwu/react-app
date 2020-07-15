// #if WEB
import { parse } from 'qs';
// #endif
// #if NODE_SERVER
import { IncomingMessage } from 'http';
import { parse as parseUrl } from 'url';
// #endif

export function pullInitialProps(key: string, defaultValue?: object) {
  const g = typeof window === undefined ? global : window;

  if (typeof g.initialProps === 'undefined') {
    return defaultValue;
  }

  if (typeof g.initialProps === 'string') {
    g.initialProps = JSON.parse(g.initialProps) as object;
  }

  if (!Object.prototype.hasOwnProperty.call(g.initialProps, key)) {
    return defaultValue;
  }

  const props = g.initialProps[key];
  delete g.initialProps[key];

  return props;
}

export function makeRequestContext(req?: IncomingMessage) {
  let context: React.RequestContext;

  if (typeof window !== 'undefined') {
    context = {
      ...window.location,
      query: parse(window.location.search.replace(/^\?+/g, '')),
    };
  } else if (req !== undefined) {
    context = parseUrl(req.url!, true);
    context.req = req;
  } else {
    throw new Error('The req parameter must be provided on the server side');
  }

  return context;
}

// #if NODE_SERVER
export function createStateScript(props: object) {
  return `
    <script type="text/javascript">
      window.initialProps = ${JSON.stringify(props).replace(/</g, '\\u003c')}
    </script>
  `;
}
// #endif
