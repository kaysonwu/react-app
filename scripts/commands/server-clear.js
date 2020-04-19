#!/usr/bin/env node

const program = require('commander');
const { resolve, parse } = require('path');
const { label: { success, error }  } = require('../utils/message');
const { remove, removeScript } = require('../utils/package');
const { promises: { unlink } } = require('../utils/file');

process.on('unhandledRejection', err => {
  error(err);
});

program
  .name('server:clear')
  .option('-p, --path [path]', 'Indicate the server files storage path', 'src')
  .option('-e, --extension [extension]', 'Indicate the extension of the server files', '.tsx')
  .option('--entry [name]', 'Server render entry filename', 'node')
  .option('--server [name]', 'Node server filename', 'server')
  .action(() => {
    const { path, entry, server, extension } = program.opts();
    const files = [entry, server].map(n => {
      let { dir, name, ext } = parse(n);
      return unlink(resolve(dir || path, `${name}${ext || extension}`));
    });

    Promise.all([
      files,
      remove([
        'serve-static', 
        '@loadable/server', 
        '@loadable/babel-plugin', 
        '@loadable/webpack-plugin', 
        '@types/loadable__server', 
        '@types/serve-static',
        'terser',
        'webpack-node-externals',
      ], { debug: true }),
      removeScript(['start', 'dev:ssr', 'build:ssr', 'build:server']),
    ]).then(() => {
      success('Server files have been cleaned up', 'DONE');
    });
  })
  .parse(process.argv);
