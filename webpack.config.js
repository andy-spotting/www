const path = require('path');

module.exports = {
  entry: './src/js/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/js'),
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react'],
      },
    },
    {
      test: /\.scss$/,
      use: [{
        loader: 'style-loader', // creates style nodes from JS strings
      }, {
        loader: 'css-loader', // translates CSS into CommonJS
      }, {
        loader: 'sass-loader', // compiles Sass to CSS
      }],
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
  },
};
