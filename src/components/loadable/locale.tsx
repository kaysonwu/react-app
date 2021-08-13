import { FC, useState } from 'react';
import { onLoadError } from '@/utils/loadable';

interface LocaleProps {
  /**
   * Locale files path, relative to `@/locale` folder.
   */
  paths: string[];

  /**
   * Fallback displayed during the loading.
   */
  fallback?: JSX.Element;

  /**
   * The locale messages are received by the child.
   */
  children: (messages: Locale) => JSX.Element;
}

const Locale: FC<LocaleProps> = ({ paths, fallback, children }) => {
  // #if IS_BROWSER
  const [messages, setMessages] = useState<Locale>();

  if (messages === undefined) {
    Promise.all(paths.map(path => import(`@/locales/${path}`).catch(onLoadError))).then(modules =>
      setMessages(
        modules.reduce(
          (state, module) => (module ? Object.assign(state, module.default) : state),
          {},
        ),
      ),
    );

    return fallback || null;
  }

  return children(messages);
  // #endif

  return children(
    paths.reduce((state, path) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-dynamic-require, global-require
        return Object.assign(state, require(`@/locales/${path}`).default);
      } catch {
        return state;
      }
    }, {}),
  );
};

export default Locale;
