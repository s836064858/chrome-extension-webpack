/*
 * @Author: your name
 * @Date: 2020-04-10 16:31:02
 * @LastEditTime: 2022-07-06 16:22:58
 * @LastEditors: 荛子
 * @Description: In User Settings Edit
 * @FilePath: \chrome-extension-webpack\build\webpack.dev.config.js
 */
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.config')
const WriteFileWebpackPlugin = require('write-file-webpack-plugin')
const webpack = require('webpack')
const WebpackExtensionReloader = require('webpack-extension-reloader')
const version = require('../src/content/js/version').version

module.exports = merge.smart(commonConfig, {
  mode: 'development',
  watch: true,
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new WriteFileWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        VUE_APP_API: JSON.stringify('http://localhost:3000/'),
        VUE_APP_VERSION: JSON.stringify('v' + version + '_test')
      }
    }),
    new WebpackExtensionReloader({ entries: { contentScript: 'content' }, reloadPage: false })
  ]
})
