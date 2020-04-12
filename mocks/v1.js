const { delays } = require('./_utils_')

const proxies = {
  'GET /v1/currentUser': { id: 1, name: 'kayson', avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png' }
}

module.exports = delays(proxies, 1500)
