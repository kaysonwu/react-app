const { delays } = require('./_utils_');

const proxies = {
  'GET /v1/currentUser': {
    id: 1, 
    name: 'kayson', 
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' 
  },
  'GET /v1/menus': [
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
  ],
};

module.exports = delays(proxies, 1500)
