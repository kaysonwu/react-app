import { SyntheticEvent } from 'react';

export function hasAction(actions: IMenu[], name: string) {
  for (const action of actions) {
    if (action.name === name) {
      return true;
    }
  }

  return false;
}

export function getIdFromEvent(e: SyntheticEvent) {
  return e.currentTarget.getAttribute('data-id');
}

export function getRealName<T>(
  alias: Record<string, string | ((record: T) => string)>,
  name: string,
  record: T,
) {
  if (!Object.prototype.hasOwnProperty.call(alias, name)) {
    return name;
  }

  if (typeof alias[name] === 'function') {
    return (alias[name] as Function)(record);
  }

  return alias[name];
}
