#!/usr/bin/env node

const program = require('commander');
const { resolve, join, parse } = require('path');
const { transformFileAsync } = require('@babel/core');
const { compileDir } = require('./utils/babel');
const { compileTemplate } = require('./utils/html');
const { compile } = require('./utils/bundle');
const { promises: { writeFile } } = require('./utils/file');
const { label: { error, success } } = require('./utils/message');

process.on('unhandledRejection', err => {
  error(err.message);
});

program
  .description('Build node server')
  .arguments('<file>')
  .option('-m, --model [dir]', 'Model directory', 'src/models')
  .option('-p, --path [dir]', 'Output directory', 'server')
  .option('-c, --config-file [path]', 'Babel configuration file', undefined)
  .option('-t, --template [filename]', 'HTML template file', 'src/index.html')
  .option('-x, --extensions [extensions]', 'List of extensions to compile when a directory has been the input', ['.js', '.ts', '.jsx', '.tsx'])
  .option('--minify', 'Indicate whether to compress the code', false)
  .action(file => {
    let { model, path, ...options } = program.opts();
    path = resolve(path);

    if (model) {
      compileDir(resolve(model), join(path, 'models'), { configFile: options.configFile })
    }

    compileEntry(resolve(file), path, options);
  })
  .parse(process.argv);

async function compileEntry(filename, output, options) {
  const { dir, name } = parse(filename);
  const { template, extensions, minify, ...opts } = options;
  let { code } = await transformFileAsync(filename, opts);

  if (template) {
    code = await compileTemplate(resolve(template), code);
  }

  code = await compile(code, dir, extensions, minify, opts);
  output = join(output, `${name}.js`);

  await writeFile(output, code)
  success('Compilation successful, output file: %s', 'DONE', output)
}
