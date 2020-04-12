const { resolve, join } = require('path')
const { parse } = require('url')
const { existsSync } = require('fs')

function resolveMockFile(pathname, root) {
  const paths = pathname.split('/')
  for (let i = paths.length; i > 0; i--) {
    let filename = join(root, paths[i] + '.js')
    if (existsSync(filename)) {
      return filename    
    }
  }
  return ''
}

function mockServe(root) {
  return function(req, res, next) {
    const { pathname } =  parse(req.url)
    const filename = resolveMockFile(pathname, root)

    if (!filename) {
      return next()
    }

    const key = req.method + ' ' + pathname
    const module = require(filename)
    const type = typeof module[key]

    if (type === 'function') {
      return module[key](req, res, next)
    } else if (type === 'object' || type == 'array') {
      return res.json(module[key])
    } else if (type === 'string') {
      return res.send(module[key])
    }

    return next()
  }
}

const mock = mockServe(resolve(__dirname, '..', 'mocks'))

module.exports = {
  devtool: false,
  devServer: {
    open: true,
    hot: true,
    historyApiFallback: true,
    after: (app) => {
      app.all('*', mock)
    }
  }
}
