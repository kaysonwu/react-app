import { pathToRegexp } from 'path-to-regexp';
import type { History } from 'history';

function findParentMenu(menus: IMenu[], pathname: string) {
  return menus.find(({ children, url }) => (
    children ? pathname.startsWith(url) : pathToRegexp(url).test(pathname)
  ));
}

function getSubRoutes(menus: IMenu[], pathname: string): IMenu[] {
  for (const menu of menus) {
    if (pathToRegexp(menu.url).test(pathname)) {
      return [menu];
    }

    if (menu.children) {
      const children = getSubRoutes(menu.children, pathname);

      if (children.length > 0) {
        children.unshift(menu);
        return children;
      }
    }
  }

  return [];
}

export function getPathRoutes(menus: IMenu[], pathname: string) {
  const menu = findParentMenu(menus, pathname);

  if (!menu) {
    return [];
  }

  return getSubRoutes([menu], pathname);
}

type HistoryMethods = Omit<History, 'length' | 'action' | 'location'>

let route: History | undefined;
const routeApi = {} as HistoryMethods;

// @Internal Don't modify it
// Used to expose the react-router-dom API
export function injectionRoute(history: History) {
  route = history;
}

([
  'push',
  'replace',
  'go',
  'goBack',
  'goForward',
  'block',
  'listen',
  'createHref',
] as (keyof HistoryMethods)[]).forEach(method => {
  routeApi[method] = (...args: any[]) => {
    if (route?.[method]) {
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return route[method].call(route, ...args) as any;
    }

    throw new Error(`react-router-dom ${method} not initialized yet, you should use it after react app mounted.`);
  };
});

export const {
  push,
  replace,
  go,
  goBack,
  goForward,
  block,
  listen,
  createHref,
} = routeApi;
