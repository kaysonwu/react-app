import type { History } from 'history';

// @Internal Don't modify it
let _: History | undefined;
const Route = {} as Omit<History, 'length' | 'action' | 'location'>;

// Used to expose the react-router-dom API
export function injectionHistory(history: History): void {
  _ = history;
}

(
  [
    'push',
    'replace',
    'go',
    'goBack',
    'goForward',
    'block',
    'listen',
    'createHref',
  ] as (keyof History)[]
).forEach(method => {
  // @ts-expect-error: Wait for type inference upgrade.
  Route[method] = (...parameters) => {
    if (_?.[method]) {
      // @ts-expect-error: Wait for type inference upgrade.
      return _[method].call(_, ...parameters);
    }

    throw new Error(
      `react-router-dom ${method} not initialized yet, you should use it after react app mounted.`,
    );
  };
});

export const { push, replace, go, goBack, goForward, block, listen, createHref } = Route;
