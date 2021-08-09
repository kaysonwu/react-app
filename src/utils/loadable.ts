import { singular } from 'pluralize';

// #if IS_BROWSER
export function onLoadError(): void {
  // do nothing
}
// #endif

/**
 * Parse the given path to a singular filename.
 */
export function getNameFromPath(path: string): string {
  if (!path || path === '/') {
    return 'home';
  }

  const name = path.replace(/\/\d+\//, '/') // a/:id/b => a/b
    .replace(/^\/|\/$/g, '')
    .replace(/\//g, '-'); // a/b => a-b

  // Special noun.
  if (['goods'].includes(name)) {
    return name;
  }

  return singular(name);
}
