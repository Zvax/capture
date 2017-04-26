module.exports = {
  entry: {
    index: './client/index.js'
  },
  output: {
    path: __dirname + '/public/js',
    filename: '[name].js'
  },
  target: 'web',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
          plugins: ['transform-object-rest-spread', 'transform-class-properties']
        },
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader',
      },
      {
        test: /\.css/,
        loader: 'style-loader!css-loader',
      }
    ]
  },
  performance: {
    hints: 'warning', // 'error' or false are valid too
    maxEntrypointSize: 100000, // in bytes
    maxAssetSize: 450000, // in bytes
  },
};
