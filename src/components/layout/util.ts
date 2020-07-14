import { pathToRegexp } from 'path-to-regexp';

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

// eslint-disable-next-line import/prefer-default-export
export function getPathRoutes(menus: IMenu[], pathname: string) {
  const menu = findParentMenu(menus, pathname);

  if (!menu) {
    return [];
  }

  const { children } = menu;

  if (!children) {
    return [menu];
  }

  const submenus = getSubRoutes(children, pathname);

  if (submenus.length > 0) {
    submenus.unshift(menu);
  }

  return submenus;
}
