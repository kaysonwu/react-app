import { parse as parseUrl } from 'url';
import { parse } from 'qs';
import type { IncomingMessage } from 'http';

export function pullInitialProps<T>(key: string, defaultValue?: T): T | undefined {
  const store = typeof window === 'undefined' ? global : window;

  if (typeof store.initialProps === 'undefined') {
    return defaultValue;
  }

  if (typeof store.initialProps === 'string') {
    store.initialProps = JSON.parse(store.initialProps) as T;
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
  // #if IS_NODE
  return { ...parseUrl(request!.url!, true), request };
  // #elif IS_BROWSER
  return { ...window.location, query: parse(window.location.search.replace(/^\?+/g, '')) };
  // #endif
}

// #if IS_NODE

/**
 * Store the global initial props on the window object.
 */
export function createStateScript(props: Record<string, unknown>): string {
  return `
    <script type="text/javascript">
      window.initialProps = ${JSON.stringify(props).replace(/</g, '\\u003c')}
    </script>
  `;
}
// #endif
