#!/usr/bin/env node

const program = require('commander');
const { createFileFromTemplate } = require('../utils/artisan');
const { label: { success, error }  } = require('../utils/message');

process.on('unhandledRejection', err => {
  error(err);
});  

program
  .name('make:model')
  .arguments('<name>')
  .option('--preload', 'Indicate whether to preload the state', false)
  .option('-f, --force', 'Create the file even if the model already exists', false)
  .option('-p, --path [path]', 'Indicate the model file storage path', 'src/models')
  .option('-e, --extension [extension]', 'Indicate the extension of the model file', '.ts')
  .action(name => {
    createFileFromTemplate('model', name, program.opts())
      .then(() => success('Model created successfully.', 'DONE'));
  }).parse(process.argv);
