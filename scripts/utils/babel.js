const { join, parse } = require('path');
const { transformFileAsync } = require('@babel/core');
const { mkdir, promises: { readdir, writeFile } } = require('./file');

async function compileDir(path, output, options) {
  const files = await readdir(path, { withFileTypes: true });
  mkdir(output);

  for (let file of files) {
    let filename = join(path, file.name);
    let outpuFile = join(output, parse(file.name).name);

    if (file.isFile()) {
      let result = await transformFileAsync(filename, options)
      await writeFile(outpuFile + '.js', result.code);
    } else if (file.isDirectory()) {
      await compileDir(filename, outpuFile, options);
    }
  }
}

module.exports = { compileDir };
