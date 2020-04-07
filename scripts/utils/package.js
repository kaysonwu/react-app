const { resolve } = require('path');
const { existsSync, promises: { readFile, writeFile } } = require('./file')
const { exec } = require('./process');
const message = require('./message');

async function install(packages, options) {
  const { mirror, dev, debug } = options;
  let command = getCommand(mirror);

  packages = parsePackages(packages);
  command += command.includes('npm') ? 
    ` install --save-${dev ? 'dev' : 'prod'} ${packages}` : 
    ` add ${dev ? '-D ' : ''}${packages}`;
  
  return await runCommand(command, debug);
}

async function remove(packages, options) {
  const { mirror, dev, debug } = options;
  let command = getCommand(mirror);

  packages = parsePackages(packages);
  command += command.includes('npm') ? 
    ` uninstall --save${dev ? '-dev' : ''} ${packages}` : 
    ` remove ${packages}`;

  return await runCommand(command, debug);
}

function getCommand(mirror) {
  // Or use await exec('npm bin -g');
  if (hasYarn()) {
    return mirror ? 'tyarn' : 'yarn';
  } 

  return mirror ? 'cnpm' : 'npm';
}

function parsePackages(packages) {
  if (Array.isArray(packages)) {
    return packages.join(' ');
  }
  
  if (typeof packages === 'object') {
    let result = '';
    for (let name in packages) {
      result += `"${name}@${packages[name]}" `;
    }
    return result.trimEnd();
  }

  return packages;
}

function hasYarn() {
  return existsSync(resolve('yarn.lock')) || 
    ! existsSync(resolve('package-lock.json'));
}

async function runCommand(command, debug) {
  
  if (debug) {
    message.info(command);
  }

  const std = await exec(command);

  if (debug && std.stderr) {
    const errors = std.stderr.split('\n');
    for (let error of errors) {
      if (! error) continue;
      let [fn, ...messages] = error.split(' ');
      if (fn === 'npm') {
        fn = messages.shift();
        message.label[(fn.includes('ERR') ? 'error' : 'warning')](messages.join(' '), fn);
      } else {
        message[fn](messages.join(' '));
      }
    }
  }

  return std;
}

async function createScript(scripts) {
  const filename = resolve('package.json');
  const pattern = hasYarn() ? /npm/g : false;
  const package = await readPackageJson(filename);

  for (let name in scripts) {
    let script = scripts[name];
    if (! package.scripts[name]) {
      package.scripts[name] = pattern ? script.replace(pattern, 'yarn') : script;
    }
  }

  return await storePackageJson(filename, package);
}

async function readPackageJson(filename) {
  const content = await readFile(filename, 'utf-8');
  return JSON.parse(content);
}

async function storePackageJson(filename, space = 2, end = '\n') {
  return await writeFile(filename, JSON.stringify(package, null, space) + end);
}

async function removeScript(names) {
  const filename = resolve('package.json');
  const package = await readPackageJson(filename);

  for (let name of names) {
    if (package.scripts[name]) {
      delete package.scripts[name];
    }
  }

  return await storePackageJson(filename, package);
}

module.exports = { install, remove, createScript, removeScript };
