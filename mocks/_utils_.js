function delay(proxy, ms) {
  return function(req, res, next) {
    setTimeout(() => {
      const type = typeof proxy
      if (type === 'function') {
        return proxy(req, res, next)
      } else if (type === 'object' || type === 'array') {
        return res.json(proxy)
      }
      return res.send(proxy)    
    }, ms)
  }
}

function delays(proxies, ms) {
  const results = {}
  for (let key in proxies) {
    results[key] = delay(proxies[key], ms)
  }
  return results
}

module.exports = { delay, delays }
