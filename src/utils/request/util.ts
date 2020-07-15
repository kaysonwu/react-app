
import { parse, stringify } from 'qs';
import { ParseOptions, TokensToRegexpOptions, RegexpToFunctionOptions, match } from 'path-to-regexp';
import { ParamsType } from './request';

function isH5() {
  return typeof window.history.replaceState !== 'undefined';
}

export function getQueryParams() {
  const { location } = window;
  return parse(isH5()
    ? location.search.replace(/^\?+/g, '')
    : location.hash.replace(/^#/g, ''));
}

export function storeQueryParams(params: ParamsType) {
  const { location } = window;
  const query = stringify(params);

  if (isH5()) {
    window.history.replaceState(null, '', query ? `?${query}` : location.pathname);
  } else {
    location.hash = query;
  }
}

export function updateQueryParams(params: ParamsType, renewal?: boolean) {
  const updated = renewal ? params : getQueryParams();

  storeQueryParams(updated);

  return updated;
}

export function getPathParams(
  route: string,
  pathname: string,
  options?: ParseOptions & TokensToRegexpOptions & RegexpToFunctionOptions,
): ParamsType {
  const result = match(route, options)(pathname);
  return result ? result.params : {};
}
