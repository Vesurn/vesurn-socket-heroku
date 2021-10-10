const path = require('path');

module.exports = {
    entry: {
      index: './client/js/index.js',
      chat: './client/js/chat.js'
    },
    devtool: 'source-map',
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, './public/js'),
    },
  };