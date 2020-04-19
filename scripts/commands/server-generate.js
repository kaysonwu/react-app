#!/usr/bin/env node

const program = require('commander');
const { relative, parse } = require('path');
const { createFileFromTemplate } = require('../utils/artisan');
const { install, createScript } = require('../utils/package');
const { error } = require('../utils/message');
const packages = {
  prod: {
    'serve-static': '^1.13.0',
    '@loadable/server': '^5.12.0'
  },
  dev: {
    '@loadable/babel-plugin': '^5.12.0',
    '@loadable/webpack-plugin': '^5.12.0',
    '@types/loadable__server': '^5.12.0',
    '@types/serve-static': '^1.13.0',
    'terser': '^4.5.0',
    'webpack-node-externals': '^1.7.2',
  },
};

process.on('unhandledRejection', err => {
  error(err);
});

program
  .name('server:generate')
  .option('-l, --latest', 'Indicate the installation of dependent packages to use the latest version', false)
  .option('-m, --mirror', 'Indicate that the dependent package is install using a mirror', false)
  .option('-f, --force', 'Create the files even if the server files already exists', false)
  .option('-p, --path [path]', 'Indicate the server files storage path', 'src')
  .option('-e, --extension [extension]', 'Indicate the extension of the server files', '.tsx')
  .option('--entry [name]', 'Server render entry filename', 'node')
  .option('--server [name]', 'Node server filename', 'server')
  .action(() => {
    const { mirror, latest, entry, server, ...opts } = program.opts();
  
    install((latest ? Object.keys(packages.prod) : packages.prod), { mirror, debug: true });
    install((latest ? Object.keys(packages.dev) : packages.dev), { mirror, debug: true, dev: true });

    createFileFromTemplate('node', entry, opts);
    createFileFromTemplate('server', server, opts).then(file => {
      const filename = relative(process.cwd(), file).replace(/\\/g, '/');

      createScript({
        'start': `pm2 ./server/${parse(file).name}.js`,
        'dev:ssr': 'npm dev --targets=node && npm build:server && npm start',
        'build:ssr': 'npm build --targets=node && npm build:server',
        'build:server': `node ./scripts/build-server.js ${filename} src/models`,
      });
    });
  })
  .parse(process.argv);
  