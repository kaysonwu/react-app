/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
interface Window {
  initialProps?: string | Record<string, any>;
}

declare namespace NodeJS {
  interface Global {
    initialProps?: string | Record<string, any>;
  }
}

declare namespace React {
  interface RequestContext {
    hash: string | null;
    host: string | null;
    hostname: string | null;
    href: string;
    pathname: string | null;
    protocol: string | null;
    port: string | null;
    query: Record<string, any>;
    // HTTP request object (server only)
    request?: import('http').IncomingMessage;
  }

  interface FunctionComponent<P = {}> {
    getInitialProps?: (context: RequestContext) => Promise<Partial<P>>;
  }

  interface ComponentClass<P = {}> {
    getInitialProps?: (context: RequestContext) => Promise<Partial<P>>;
  }
}
