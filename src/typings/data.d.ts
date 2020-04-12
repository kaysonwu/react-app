/**
 * API contracts
 */

interface IUser {
  id: number | string;
  avatar: string;
  name: string;
}

interface IMenu {
  key: React.Key;
  name: string;
  url: string;
  icon?: string;
  disabled?: boolean;
  children?: IMenu[];
}

interface Window {
  // For state key
  [key: string]: any
}
