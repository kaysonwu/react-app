const util = require('util');
const process = require('child_process');

const exec = util.promisify(process.exec);
const execFile = util.promisify(process.execFile);

const fork = util.promisify(process.fork);
const spawn = util.promisify(process.spawn);

module.exports = { exec, execFile, fork, spawn }
