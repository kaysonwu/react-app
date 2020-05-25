import { createContext } from 'react';
import { NormalizeColumnsType } from './interface';

interface ListContext {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: NormalizeColumnsType<any>;
}

export default createContext<ListContext>({ columns: [] });
