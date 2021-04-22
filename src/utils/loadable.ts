import { singular } from 'pluralize';

// #if WEB
export function onLoadError() {
  // do nothing
}
// #endif

export function getNameFromPath(path: string) {
  if (!path || path === '/') {
    return 'home';
  }

  return singular(
    path.replace(/\/\d+\//, '/') // a/:id/b => a/b
      .replace(/^\/|\/$/g, '')
      .replace(/\//g, '-'), // a/b => a-b
  );
}
