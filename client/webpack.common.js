const path = require('path')
const babelConfig = require('./babel.config')

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
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './public/'),
  },
}

module.exports = config

// use: 'ts-loader',
// path: path.resolve(__dirname, '../server/src/public/dist'),
