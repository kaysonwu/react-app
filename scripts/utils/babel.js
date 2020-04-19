const { resolve, join, parse, sep } = require('path');
const { transformFileAsync } = require('@babel/core');
const { mkdir, resolveFile, promises: { stat, readdir, writeFile } } = require('./file');
const { info } = require('./message');

async function compile(files, output, options) {
  const compiled = {};

  await doCompile(files, output, options, compiled);

  return Object.keys(compiled);
}

async function doCompile(files, output, options, compiled) {
  for (let file of files) {
    let stats = await stat(file);
    if (stats.isDirectory()) {
     await doCompile(
        (await readdir(file)).map(name => resolve(file, name)),
        join(output, file.split(sep).pop()),
        options,
        compiled,
      );
    } else {
      await compileFile(file, output, options, compiled);
    }
  }
}

async function compileFile(filename, output, options, compiled) {
  const { dir, name } = parse(filename);
  const path = join(output, `${name}.js`);

  if (compiled[path]) return;

  const { code } = await transformFileAsync(filename, options.babel);

  mkdir(output);
  await writeFile(path, code);

  if (options.debug) {
    info(path, 'compiled');
  }

  compiled[path] = true;
  await compileFileModules(code, dir, output, options, compiled);
}

async function compileFileModules(code, root, output, options, compiled) {
  const { extensions = ['.js'] } = options;
  const ids = getRequireIds(code);

  for (let id of ids) {
    let filename = resolveFile(join(root, id), extensions);
    await compileFile(filename, join(output, parse(id).dir), options, compiled);
  }
}

function getRequireIds(code) {
  const ids = [];
  const pattern = /require\(("|')(\..+?)\1\)/g;
  let match;

  while ((match = pattern.exec(code)) !== null) {
    ids.push(match[2]);
  }

  return ids;
}

module.exports = { compile };
