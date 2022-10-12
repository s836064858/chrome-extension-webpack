/**
 * https://www.babeljs.cn/
 * @type {Object}
 */
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: {
          version: 3,
          proposals: true
        },
        targets: {
          esmodules: true
        }
      }
    ]
  ]
}
