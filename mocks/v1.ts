import { IMock } from 'serve-mock';
import { delays } from 'serve-mock/utils';

const user: IUser = {
  id: 1,
  name: 'kayson',
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
};

const menus: IMenu[] = [
  { id: 1, name: 'Home', url: '/' },
  {
    id: 2,
    name: 'User',
    url: '/user',
    children: [
      { id: 3, name: 'New', url: '', hide: true },
      { id: 4, name: 'Edit', url: '', hide: true },
      { id: 5, name: 'Delete', url: '', hide: true },
    ],
  },
];

const mock: IMock = {
  'GET /v1/currentUser': user,
  'GET /v1/my/menus': menus,
};

export default delays(mock, 100, 1500);
