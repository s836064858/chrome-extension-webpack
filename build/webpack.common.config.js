const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')
const Fiber = require('fibers')
const Sass = require('sass')
const webpack = require('webpack')
const fs = require('fs')
const { createHash } = require('crypto')

const HASH = createHash('md5').update(Math.random().toString()).digest('hex').slice(0, 8)
const version = require('../src/content/js/version').version

const commonConfig = {
  entry: {
    content: './src/content/index.js'
  },
  output: {
    publicPath: './',
    path: path.resolve(__dirname, '../chromeExtension'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js'
  },
  stats: {
    modules: false,
    entrypoints: false
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendors'
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      images: '@/assets/images',
      styles: '@/assets/styles',
      fonts: '@/assets/fonts'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: [
          'cache-loader',
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          }
        ]
      },
      {
        test: /\.(css|scss)$/,
        sideEffects: true,
        use: [
          {
            loader: 'style-loader',
            options: {
              attributes: {
                'data-style-id': HASH
              }
            }
          },

          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: Sass,
              fiber: Fiber
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash:6].[ext]',
              outputPath: 'images'
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash:6].[ext]',
              outputPath: 'medias'
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash:6].[ext]',
              outputPath: 'fonts'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    function () {
      // manifest.json中的版本号
      this.plugin('done', function () {
        const pkgPath = path.join(__dirname, '../chromeExtension/manifest.json')
        let pkg = fs.readFileSync(pkgPath)
        pkg = JSON.parse(pkg)
        pkg.version = version
        fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
      })
    },
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public'),
        to: path.resolve(__dirname, '../chromeExtension')
      },
      {
        from: path.resolve(__dirname, '../src/background'),
        to: path.resolve(__dirname, '../chromeExtension/js')
      }
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        HASH: JSON.stringify(HASH)
      }
    }),
    new WebpackBuildNotifierPlugin(),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/)
  ]
}

module.exports = commonConfig
