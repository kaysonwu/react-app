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
  level?: IUserLevel;
  phone?: string;
  balance?: string;
  points?: string;
  state?: number;
}

interface IMenu {
  id: number;
  name: string;
  subtitle?: string;
  url: string;
  icon?: string;
  hide?: boolean;
  isGroup?: boolean;
  disabled?: boolean;
  children?: IMenu[];
}
