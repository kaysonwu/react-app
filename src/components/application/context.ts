import { createContext } from 'react';

export interface GlobalState {
  user: IUser;
  menus: IMenu[];
  links: ILink[];
}

export interface ReducerAction extends Partial<GlobalState> {
  type: keyof GlobalState;
}

interface ContextProps {
  isMobile: boolean;
  routes: IMenu[];
  state: GlobalState;
  dispatch: (action: ReducerAction) => void;
  getPageTitle: (customizeTitle?: string, signed?: boolean) => string;
}

export default createContext<ContextProps>({
  isMobile: false,
  routes: [] as IMenu[],
  state: {} as GlobalState,
  dispatch() {
    // Do nothing by default
  },
  getPageTitle() {
    return '';
  },
} as ContextProps);
