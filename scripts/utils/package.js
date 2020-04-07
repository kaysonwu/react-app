const { existsSync } = require('fs')
const { resolve } = require('path');
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
  if (existsSync(resolve('yarn.lock')) || 
    ! existsSync(resolve('package-lock.json'))
  ) {
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
      result += `${name}@${packages[name]} `;
    }
    return result.trimEnd();
  }

  return packages;
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

module.exports = { install, remove };
