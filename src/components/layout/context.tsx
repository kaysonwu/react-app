import { createContext } from 'react';

interface ContextProps {
  routes: IMenu[];
  getPageTitle: (suffix?: string, customizeTitle?: string) => string;
}

export default createContext<ContextProps>({
  routes: [] as IMenu[],
  getPageTitle() {
    return '';
  },
} as ContextProps);
