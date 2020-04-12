const menus: IMenu[] = [
  {
    key: 1,
    name: 'Home',
    url: '/'
  },
  {
    key: 2,
    name: 'User',
    url: '/user',
    children: [
      {
        key: 3,
        name: 'User Level',
        url: '/user/level',
      },
      {
        key: 4,
        name: 'User Manage',
        url: '/user',
      }
    ]
  }
];

export default menus;
