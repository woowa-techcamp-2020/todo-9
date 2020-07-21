const path = require('path')
const babelConfig = require('./babel.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/** @type {import('webpack').Configuration} */
const config = {
  entry: ['@babel/polyfill', './src/index.ts'],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: {
          loader: 'babel-loader',
          options: {
            ...babelConfig,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      { test: /\.(woff|woff2|eot|ttf)$/, loader: 'url-loader?limit=100000' },
    ],
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: path.resolve(__dirname, './public/index.html'),
  //     inject: false,
  //     filename: path.resolve(__dirname, './public/index.html'),
  //   }),
  // ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../server/src/public/'),
  },
}

module.exports = config

// use: 'ts-loader',
// path: path.resolve(__dirname, '../server/src/public/dist'),
