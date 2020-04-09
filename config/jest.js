const { resolve } = require('path');

module.exports = {
  rootDir: resolve(__dirname, '..'),
  transform: {
    '\\.(j|t)sx?$': [
      'babel-jest', 
      { 
        configFile: resolve(__dirname, 'babel.node.json') 
      }
    ]
  }
};
