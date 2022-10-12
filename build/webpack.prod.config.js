/*
 * @Author: your name
 * @Date: 2020-04-10 16:31:02
 * @LastEditTime: 2022-07-06 15:05:36
 * @LastEditors: 荛子
 * @Description: In User Settings Edit
 * @FilePath: \chrome-extension-webpack\build\webpack.prod.config.js
 */
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.config')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')
const version = require('../src/content/js/version').version
module.exports = merge.smart(commonConfig, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '127.0.0.1',
      analyzerPort: 8889,
      reportFilename: 'report.html',
      defaultSizes: 'parsed',
      openAnalyzer: true,
      generateStatsFile: false,
      statsFilename: 'stats.json',
      statsOptions: null,
      logLevel: 'info'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        VUE_APP_API: JSON.stringify('http://localhost:3000/'),
        VUE_APP_VERSION: JSON.stringify('v' + version + '_prop')
      }
    })
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        terserOptions: {
          compress: {
            pure_funcs: ['console.log']
          }
        }
      })
    ]
  }
})
