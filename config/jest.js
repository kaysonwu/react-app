const { resolve, join } = require('path');
const rootDir = resolve(__dirname, '..');

module.exports = {
  rootDir,
  moduleNameMapper: {
    '@/(.*)': join(rootDir, 'src', '$1')
  },
  transform: {
    '\\.(j|t)sx?$': [
      'babel-jest', 
      { 
        configFile: resolve(__dirname, 'babel.node.json') 
      }
    ]
  }
};
