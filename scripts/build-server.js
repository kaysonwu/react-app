#!/usr/bin/env node

const program = require('commander');
const { resolve } = require('path');
const { compile } = require('./utils/babel');
const { compileTemplate } = require('./utils/html');
const { promises: { writeFile } } = require('./utils/file');
const { label: { error, success } } = require('./utils/message');

process.on('unhandledRejection', err => {
  error(err);
});

program
  .description('Build node server')
  .arguments('<entry> [files...]')
  .option('-o, --out-path [path]', 'Output directory', 'server')
  .option('-t, --template [filename]', 'HTML template file', 'src/index.html')
  .option('-x, --extensions [extensions]', 'List of extensions to compile when a directory has been the input', ['.js', '.ts', '.jsx', '.tsx'])
  .option('--debug', 'Indicate whether to print compilation information', false)
  .action((entry, files) => {
    const { outPath, template, ...options } = program.opts();
    options.babel = { caller: { name: 'node-server' } }; // Pass the object identify to babel
    
    compile([entry, ...files].map(f => resolve(f)), resolve(outPath), options)
      .then(files => {
        if (template) {
          compileTemplate(files[0], template).then(content => {
            writeFile(files[0], content);
          });
        }

        success('%d dependent files compiled.', 'DONE', files.length);
      });
  })
  .parse(process.argv);
