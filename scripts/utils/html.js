const { promises: { readFile } } = require('./file');

/**
 * Compile data using the given template file.
 * 
 * @param {string} filename   Data file path.
 * @param {string} template   Template file path.
 */
async function compileTemplate(filename, template) {
  const content = await readFile(filename, 'utf-8');
  const data = await readFile(template, 'utf-8');

  return matchTemplates(content).reduce(
    (c, m) => c.replace(m[0], replaceTemplate(data, m[1])), 
    content,
  );
}

function matchTemplates(content) {
  const matches = [];
  const pattern = /<template>([\s\S]*?)<\/template>/ig;
  let match;

  while((match = pattern.exec(content)) !== null) {
    matches.push(match);  
  }

  return matches;
}

function replaceTemplate(data, template) {
  const pattern = /<(head|body|footer)(?:\s+id=('|")(\w+)\2)?>([\s\S]*?)<\/\1>/ig;
  let match;

  while ((match = pattern.exec(template)) !== null) {
    let [, label, , id, child] = match;
    
    if (id) {
      label = new RegExp(`( id=('|")${id}\\2[^>]*>)`, 'i');
      child = `$1${child}`;
    } else {
      label = label === 'footer' ? '</html>' : `</${label}>`;
      child += label;
    }

    data = data.replace(label, child);
  }
  
  return data;
}

module.exports = { compileTemplate };
