const { promises: { readFile } } = require('./file');

/**
 * Compile data using the given template file.
 * 
 * @param {string} filename Template file path.
 * @param {string} data     Data to compile.
 */
async function compileTemplate(filename, data) {
  const pattern = /<template>([\s\S]*?)<\/template>/ig
  const labels = [['head', '</head>'], ['body', '</body>'], ['footer', '</html>']];

  const content = await readFile(filename, 'utf-8');
  let matches;
  
  while((matches = pattern.exec(data)) !== null) {
    data = data.replace(matches[0], replaceTemplate(content, matches[1], labels));
  }

  return data;
}

function replaceTemplate(data, template, labels) {
  for (let label of labels) {
    [data, template] = replaceLabel(data, template, label);
  }
  return replaceIdLabel(data, template);
}

function replaceLabel(data, template, label) {
  const [from, to] = Array.isArray(label) ? label : [label, `</${label}>`];
  const pattern = new RegExp(`<${from}>([\\s\\S]*?)</${from}>`, 'ig');
  let matches;

  while ((matches = pattern.exec(template)) !== null) {
    data = data.replace(to, matches[1] + to);
  }

  return [data, template.replace(pattern, '')];
}

function replaceIdLabel(data, template) {
  const pattern = /<([a-z0-9]+)[^>]*? id=('|")(\w+)\2[^>]*?>([\s\S]*?)<\/\1>/ig;
  let matches;

  while ((matches = pattern.exec(template)) !== null) {
    data = data.replace(new RegExp(`( id=('|")${matches[3]}\\2[^>]*?>)`, 'i'), `$1${matches[4]}`);
  }

  return data;
}

module.exports = { compileTemplate };
