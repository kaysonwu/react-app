const { join, parse, relative } = require('path');
const { transformFileAsync } = require('@babel/core');
const terser = require('terser');
const { resolveFile } = require('./file');

/**
 * 
 * @param {string} code 
 * @param {string} path 
 * @param {array} extensions 
 * @param {boolean} minify 
 * @param {object} options 
 */
async function compile(code, path, extensions = ['.js'], minify = true, options = {}) {
  const modules = extractModules(code, path);
  const entry = { code, path, modules };

  for (let name in modules) {
    let { filename, identifier } = modules[name];
    if (filename) {
      await x(entry, resolveFile(filename, extensions), identifier, options);
    }
  }

  return terser.minify(
    entry.code, 
    minify ? {
      toplevel: true
    } : {
      compress: {
        join_vars: false,
        toplevel: true
      },
      output: { 
        beautify: true,
        indent_level: 2
      } 
    }
  ).code;
}

function extractModules(content, path, root) {
  const pattern = /var\s+(\w+)\s*=(?:[\w\s(]+)?require\(['"](.+?)['"]\)\)*;?/g;
  const modules = {}; let matches;

  while((matches = pattern.exec(content)) !== null) {
    let [, identifier, name] = matches;
    let filename = name.startsWith('./') ? join(path, name) : undefined;

    if (root && filename) {
      name = relative(root, filename);
    }

    modules[name] = { filename, identifier, position: pattern.lastIndex };
  }

  return modules;
}

async function x(entry, filename, id, options) {
  let { code } =  await transformFileAsync(filename, options);
  let requires = '';

  const { dir } = parse(filename);
  const modules = extractModules(code, dir, entry.path);

  // 入口文件
  // 1. 替换变量名 √
  // 2. 替换本地导入成模块文件的模块导入 √

  // 模块文件
  // 1. 替换导出名 √

  for (let name in modules) {
    let { filename, identifier, position } = modules[name];
    let module = entry.modules[name];

    if (filename) {
      // If the module file refers to a local module, it needs to be processed recursively.
      await x(entry, filename, identifier, options);
    } else if (module) {
      // If the module file and the entry file depend on the same package.
      // The package variable name of the module file should be consistent with the entry file.
      code = syncModuleIdentifier(code, identifier, module.identifier);
    } else if (code.includes(identifier, position)) {
      // If the module file introduces other packages and uses it, it should be appended to the entry file.
      entry.modules[name] = { ...modules[name] };
      requires = requires + buildRequire(name, identifier);
    }
  }

  entry.code = renameModuleIdentifier(
    replaceModuleRequire(entry.code, id, requires), 
    id
  ) + removeKeywords(renameIdentifier(code, id));
  
  return entry;
}

function syncModuleIdentifier(code, from, to) {
  if (from === to) {
    return code;
  } else if (code.includes(to)) {
    code = code.replace(to, to + (new Date).getTime());
  }

  return code.replace(from, to);
}

function buildRequire(name, identifier) {
  return `var ${identifier} = require("${name}");\r\n`;
}

function replaceModuleRequire(code, identifier, requires) {
  // TODO For test tips.
  // var identifier = require('fs'); | var identifier = _interopRequireDefault(require('fs'));
  const pattern = new RegExp(`var ${identifier}\\s*=\\s*[\\w(]*require\\(.+?\\)\\)*;?`, 'g');
  return code.replace(pattern, requires);  
}

function renameModuleIdentifier(code, identifier) {
  return code.replace(new RegExp(identifier + '\\.', 'g'), getNewIdentifier(identifier));
}

function getNewIdentifier(identifier) {
  return `_${identifier}__`;
}

function renameIdentifier(code, identifier) {
  // TODO For test tips.
  // function name() | const a =name() | const a = a(name()) | const a = a[name()] | const a = a({}, name()) | return name() ....
  const pattern = /(function)\s+(\w+)(\s*\()/g
  let matches, coded = code;

  identifier = getNewIdentifier(identifier);

  while ((matches = pattern.exec(code)) !== null) {
    let [, keyword, name] = matches;
    let newName = `$1${identifier}${name}$2`;

    switch (keyword) {
      case 'function':
        coded = coded.replace(new RegExp(`([ =\\[(,]\\s*)${name}(\\s*\\()`, 'g'), newName);
        break;
    }
  }

  return coded;
}

function removeKeywords(code) {
  const pattern = /(var \w+\s*=\s*[\w(]*require\(.+?\)\)*|exports\.\w+\s*=\s*[\w ]+|"use strict"|Object\.defineProperty\(exports[\s\S]+?\));?/g;
  return code.replace(pattern, '');
}

module.exports = { compile };
