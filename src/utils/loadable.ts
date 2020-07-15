// #if WEB
export function onLoadError() {
  // do nothing
}
// #endif

export function getNameFromPath(path: string) {
  if (!path || path === '/') {
    return 'home';
  }

  // TODO 复数转单数，目前是仅去除结尾的 s
  return path.replace(/^\/|s$/g, '')
    .replace(/\/\d+\//, '/') // a/:id/b => a/b
    .replace(/\//g, '-'); // a/b => a-b
}
