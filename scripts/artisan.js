#!/usr/bin/env node

const program = require('commander');

program
  .usage('command [options] [arguments]')
  .command('make:page', 'Create a new page file', { executableFile: './commands/make-page.js' })
  .command('make:model', 'Create a new model file', { executableFile: './commands/make-model.js' })
  .parse(process.argv);
  