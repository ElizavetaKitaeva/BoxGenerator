const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './src/js/index.js',
  module: {
    rules: [
      { test: /\.s[ac]ss$/i, use: [ 'style-loader', 'css-loader', 'sass-loader' ] },
      { test: /\.(js)$/, use: 'babel-loader' }
    ]
  },
  output: {
    filename: './js/index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
  ],
  devServer: {
    open: true,
  },
  mode: 'production'
}