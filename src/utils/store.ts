import { parse } from 'qs';
import { parse as parseUrl } from 'url';
import type { IncomingMessage } from 'http';

export function pullInitialProps(key: string, defaultValue?: object) {
  const store = typeof window === 'undefined' ? global : window;

  if (typeof store.initialProps === 'undefined') {
    return defaultValue;
  }

  if (typeof store.initialProps === 'string') {
    store.initialProps = JSON.parse(store.initialProps) as object;
  }

  if (!Object.prototype.hasOwnProperty.call(store.initialProps, key)) {
    return defaultValue;
  }

  const props = store.initialProps[key];
  delete store.initialProps[key];

  return props;
}

/**
 * Create context for client request.
 */
export function makeRequestContext(request?: IncomingMessage): React.RequestContext {
  // #if IS_NODE_SERVER
  return { ...parseUrl(request!.url!, true), request };
  // #else
  return { ...window.location, query: parse(window.location.search.replace(/^\?+/g, '')) };
  // #endif
}

// #if IS_NODE_SERVER

/**
 * Store the global initial props on the window object.
 */
export function createStateScript(props: object): string {
  return `
    <script type="text/javascript">
      window.initialProps = ${JSON.stringify(props).replace(/</g, '\\u003c')}
    </script>
  `;
}
// #endif
