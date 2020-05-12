/**
 * API contracts
 */
interface IUserLevel {
  id: number;
  name: string;
}

interface IUser {
  id: number;
  avatar: string;
  name: string;
  level?: IUserLevel;
  phone?: string;
  balance?: string;
  points?: string;
  state?: number;
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
