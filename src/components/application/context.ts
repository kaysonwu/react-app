import { createContext } from 'react';

export interface GlobalState {
  /**
   * Determine whether the device type is a mobile device.
   */
  isMobile: boolean;
}

interface ContextProps {
  state: GlobalState;
}

export default createContext<ContextProps>({
  state: { isMobile: false },
} as ContextProps);
