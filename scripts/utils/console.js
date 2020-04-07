function info(format, ...args) {
  console.log('\033[44;30m INFO \033[40;34m ' + format + '\033[0m', ...args);
}

function error(format, ...args) {
  console.log('\033[41;30m ERROR \033[40;31m ' + format + '\033[0m', ...args);
}

function warn(format, ...args) {
  console.log('\033[43;30m WARN \033[40;33m ' + format + '\033[0m', ...args);
}

function success(format, ...args) {
  console.log('\033[42;30m SUCCESS \033[40;32m ' + format + '\033[0m', ...args);
}

function done(format, ...args) {
  console.log('\033[42;30m DONE \033[40;32m ' + format + '\033[0m', ...args);
}

module.exports = { info, error, warn, success, done };
