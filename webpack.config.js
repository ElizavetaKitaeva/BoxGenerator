const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './app/js/index.js',
  module: {
    rules: [
      { test: /\.s[ac]ss$/i, use: [ 'style-loader', 'css-loader', 'sass-loader' ] },
      { test: /\.(js)$/, use: 'babel-loader' }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/index.html'
    }),
  ],
  devServer: {
    open: true,
  },
  mode: 'production'
}