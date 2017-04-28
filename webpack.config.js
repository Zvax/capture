'use strict';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: {
    'js/index.js': './client/index.js',
    'css/style.css': './client/style/capture.scss',
  },
  output: {
    path: __dirname + '/public/',
    filename: "[name]"
  },
  plugins: [
    new ExtractTextPlugin('css/style.css'),
  ],
  target: 'web',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-object-rest-spread', 'transform-class-properties'],
        },
      },
      {
        test: /\.scss/,
        loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader!sass-loader'}),
      },
      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'}),
      },
    ],
  },
  performance: {
    hints: 'warning', // 'error' or false are valid too
    maxEntrypointSize: 100000, // in bytes
    maxAssetSize: 450000, // in bytes
  },
};
