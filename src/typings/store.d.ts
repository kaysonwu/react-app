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
    pathname: string | null;
    query: Record<string, any>;
    // HTTP request object (server only)
    req?: import('http').IncomingMessage;
  }

  interface FunctionComponent<P = {}> {
    getInitialProps?: (request: RequestContext) => Promise<Partial<P>>;
  }

  interface ComponentClass<P = {}> {
    getInitialProps?: (request: RequestContext) => Promise<Partial<P>>;
  }
}
