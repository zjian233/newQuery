const path = require('path');

module.exports = {
  entry: './src/newQuery.js',
  output: {
    filename: 'newQuery.js',
    path: path.resolve(__dirname, 'dist')
  }
};