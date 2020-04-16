import { createServer } from 'http';
import serveStatic from 'serve-static';
import { parse as parseUrl } from 'url';
import { join, resolve } from 'path';
import { AddressInfo } from 'net';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { ApplicationProps } from './node';
import { createStateScript, prepareStore } from './utils/model';
import { getNameFromPath, loadModel, hasLocaleFile } from './utils/loadable';
import { __getLocale__ } from './utils/locale';

const nodeExtractor = new ChunkExtractor({ statsFile: join(__dirname, 'node-stats.json') });
const webExtractor = new ChunkExtractor({ statsFile: resolve(__dirname, 'web-stats.json'), entrypoints: ['app'] });

const modelPath = join(__dirname, 'models');
const Application = nodeExtractor.requireEntrypoint('app').default as React.ComponentType<ApplicationProps>;
const serve = serveStatic((webExtractor as any).stats.outputPath);

const server = createServer((req, res) => {
  
  serve(req as any, res as any, async () => {
    const pathname = parseUrl(req.url as string).pathname as string;
    const page = getNameFromPath(pathname);

    const store = await prepareStore(loadModel(['global', page], modelPath), req);
    const app = renderToString(
      <ChunkExtractorManager extractor={webExtractor}>
        <StaticRouter location={req.url}>
          <Application 
            store={store} 
            locale={__getLocale__(req.headers)} 
            page={hasLocaleFile(page) ? page : undefined}
          />
        </StaticRouter>
      </ChunkExtractorManager>
    );

    res.setHeader('Content-Type', 'text/html');
    res. write(`
      <template>
        <head>
          ${webExtractor.getLinkTags()}
          ${webExtractor.getStyleTags()}
        </head>
        <body id="app">
          ${app}
        </body>
        <footer>
          ${createStateScript(store.getState())}
          ${webExtractor.getScriptTags()}
        </footer>
      </template>
    `);
    res.end();
  });
}).listen(process.env.port || 8080, () => {
  const { address, port } = server.address() as AddressInfo;
  console.log('Server started http://%s:%d', (address === '::' ? 'localhost' : address), port);
});
