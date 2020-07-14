/* eslint-disable @typescript-eslint/interface-name-prefix */
/* API contracts */

interface IUserLevel {
  id: number;
  name: string;
}

interface IUser {
  id: number;
  avatar: string;
  name: string;
  sex?: number;
  level?: IUserLevel;
  phone?: string;
  balance?: string;
  points?: string;
  state?: number;
  created_at?: string;
  updated_at?: string;
}

interface IMenu {
  id: number;
  name: string;
  subtitle?: string;
  url: string;
  icon?: string;
  hide?: boolean;
  is_group?: boolean;
  disabled?: boolean;
  children?: IMenu[];
}
