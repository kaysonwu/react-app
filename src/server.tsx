import http from 'http';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Application from '@/components/application';

const port = 3000;
console.log(`Server starting ${port}`);

http.createServer((req, res) => {

  const context = {};
  const html = ReactDOM.renderToString(
    <StaticRouter location={req.url} context={context}>
      <Application />
    </StaticRouter>
  );      

  console.log(req.url, html, context);
  res.write(html);
  res.end();

}).listen(port);

console.log('Server started');
