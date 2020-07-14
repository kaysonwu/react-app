/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react';
import { NormalizeColumnsType } from './interface';

interface ListContext {
  columns: NormalizeColumnsType<any>;
  onColumnsChange: (columns: NormalizeColumnsType<any>) => void;
}

export { NormalizeColumnsType };
export default createContext<ListContext>({
  columns: [],
  onColumnsChange() {
    // do nothing
  },
});
