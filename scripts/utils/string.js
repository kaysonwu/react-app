function ucfirst(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function ucwords(string) {
  return string.replace(/\b(\w)|\s(\w)/g, m => m.toUpperCase());
}

module.exports = { ucfirst, ucwords };
