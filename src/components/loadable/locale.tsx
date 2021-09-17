import { Dispatch, FC, SetStateAction, useState } from 'react';
import usePrevious from '@/hooks/usePrevious';
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
  let messages: Locale | undefined =
    // #if IS_NODE
    paths.reduce((message, path) => {
      try {
        return Object.assign(
          message,
          // eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-dynamic-require, global-require
          require(`../../locales/${path}`).default,
        );
      } catch {
        return message;
      }
    }, {});

  // #elif IS_BROWSER
  const previousPaths = usePrevious(paths);
  let setMessages: Dispatch<SetStateAction<Locale | undefined>>;
  // eslint-disable-next-line prefer-const
  [messages, setMessages] = useState<Locale>();

  if (messages === undefined || previousPaths?.toString() !== paths.toString()) {
    Promise.all(
      paths.map(path =>
        import(/* webpackChunkName: "locales/[request]" */ `@/locales/${path}`).catch(onLoadError),
      ),
    ).then(modules =>
      setMessages(
        modules.reduce(
          (message, module) => (module ? Object.assign(message, module.default) : message),
          {},
        ),
      ),
    );
    return fallback || null;
  }
  // #endif

  return children(messages);
};

export default Locale;
