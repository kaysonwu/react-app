import { IMock } from 'serve-mock';

const links: ILink[] = [
  { id: 1, name: '关于我们', url: '' },
  { id: 2, name: '帮助中心', url: '' },
  { id: 3, name: '在线客服', url: '' },
];

const mock: IMock = {
  'GET /v1/links': links,
};

export default mock;
