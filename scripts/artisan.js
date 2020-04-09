#!/usr/bin/env node

const program = require('commander');

program
  .usage('command [options] [arguments]')
  .command('make:page', 'Create a new page file', { executableFile: './commands/make-page.js' })
  .command('make:model', 'Create a new model file', { executableFile: './commands/make-model.js' })
  .command('server:generate', 'Generate missing server render files, dependencies, and script commands', { executableFile: './commands/server-generate.js' })
  .command('server:clear', 'Clear server render files, dependencies, and script commands', { executableFile: './commands/server-clear.js' })
  .parse(process.argv);
  