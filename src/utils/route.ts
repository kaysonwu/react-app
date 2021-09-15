import type { History as HistoryInstance } from 'history';

// @Internal Don't modify it
let History: HistoryInstance | undefined;
const Route = {} as Omit<HistoryInstance, 'length' | 'action' | 'location'>;

// Used to expose the react-router-dom API
export function injectionHistory(history: HistoryInstance): void {
  History = history;
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
  ] as (keyof HistoryInstance)[]
).forEach(method => {
  // @ts-expect-error: Wait for type inference upgrade.
  Route[method] = (...parameters) => {
    if (History?.[method]) {
      // @ts-expect-error: Wait for type inference upgrade.
      return History[method].call(_, ...parameters);
    }

    throw new Error(
      `react-router-dom ${method} not initialized yet, you should use it after react app mounted.`,
    );
  };
});

export const { push, replace, go, goBack, goForward, block, listen, createHref } = Route;
