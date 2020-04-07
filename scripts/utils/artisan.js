const { resolve, parse } = require('path');
const { promises: { readFile, writeFile }, existsSync } = require('./file');
const { label: { error, success } } = require('./message');
const { ucfirst } = require('./string');

/**
 * Create a new file from a template file.
 * 
 * @param {string} template   Template name
 * @param {string} output     Output filename
 * @param {object} options 
 */
async function createFileFromTemplate(template, output, options) {
  const { force, path, extension, ...opts } = options;
  const [name, filename] = resolveOutput(output, path, extension);

  if (existsSync(filename) && ! force) {
    return error(`${ucfirst(template)} already exists!`);
  }

  opts.name = ucfirst(name);
  const content = replaceTemplateVars(
    await readFile(resolveTemplate(template), 'utf-8'),
    opts
  );

  await writeFile(filename, content);
  success(`${ucfirst(template)} created successfully.`, 'DONE');
}

function resolveOutput(filename, path, extension) {
  const { dir, name, ext } = parse(filename);
  return [
    name, 
    resolve(
      (dir || path), 
      name + (ext || extension)
    )
  ];
}

function resolveTemplate(template) {
  return resolve(__dirname, '..', 'commands', 'templates', `${template}.tpl`);
}

function replaceTemplateVars(content, data) {
  const eof = '\\r?\\n?';
  for (let name in data) {
    let value = data[name];
    let type = typeof value;
    switch(type) {
      case 'string':
        content = content.replace(
          new RegExp(`\\[${name}\\]`, 'g'), 
          value
        );
        break;
      case 'boolean':
        content = content.replace(
          new RegExp(`${eof}\\[${name}\\]([\\s\\S]+)\\[/${name}\\]${value ? eof : ''}`, 'g'),
          value ? '$1' : ''
        );
        break;
    }
  }

  return content;
}

module.exports = { createFileFromTemplate };
