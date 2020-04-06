const { existsSync, mkdirSync, promises } = require('fs');

function mkdir(path, options) {
  if (! existsSync(path)) {
    mkdirSync(path, options);
  }
}

function resolveFile(filename, extensions) {
  for (let extension of extensions) {
    let path = `${filename}${extension}`;
    if (existsSync(path)) {
      return path;
    }
  }
  
  throw new Error(`no such file or directory, open '${filename}'`);
}

// promises depend on node >= 10.0.0.
// promises are mainly used for async functions.
// If your node version is too low, please rewrite here.
module.exports = { mkdir, resolveFile, existsSync, promises };
