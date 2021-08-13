import { createServer } from 'http';
import serveStatic from 'serve-static';
// import { parse as parseUrl } from 'url';
import { resolve } from 'path';
import { AddressInfo } from 'net';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Application from './index';
// import { getNameFromPath } from './utils/loadable';
import { getLocaleFromRequest } from './utils/locale';
import { makeRequestContext } from './utils/store';

const serve = serveStatic(resolve(__dirname, '..', 'public'));

const server = createServer((req, res) => {
  serve(req, res, async () => {
    // const pathname = parseUrl(req.url!).pathname!;
    // const page = getNameFromPath(pathname);

    const state = await Application.getInitialProps?.(makeRequestContext(req));
    const app = renderToString(
      <StaticRouter location={req.url}>
        <Application state={state?.state} locale={getLocaleFromRequest(req)} />
      </StaticRouter>,
    );

    res.setHeader('Content-Type', 'text/html');
    res.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1" />
        </head>
        <body>
          <div id="app">${app}</div>
        </body>
      </html>
    `);
    res.end();
  });
}).listen(process.env.port || 8080, () => {
  const { address, port } = server.address() as AddressInfo;
  // eslint-disable-next-line no-console
  console.log('Server started http://%s:%d', address === '::' ? 'localhost' : address, port);
});
