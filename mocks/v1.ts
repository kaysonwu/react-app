import { IMock } from 'serve-mock';
import { delays } from 'serve-mock/utils';

const user: IUser = {
  id: 1,
  name: 'kayson',
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
};

const menus: IMenu[] = [
  { id: 1, name: 'Home', url: '/' },
  { id: 2, name: 'User', url: '/user' },
];

const mock: IMock = {
  'GET /v1/currentUser': user,
  'GET /v1/menus': menus,
};

export default delays(mock, 100, 1500);
