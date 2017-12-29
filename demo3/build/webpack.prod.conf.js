const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const CleanPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')
const baseConfig = require('./webpack.base.conf')


function resolve (dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = merge(baseConfig, {

  entry: {
    vendor: ['jquery']
  },

  output: {
    filename: 'static/js/[name].[chunkhash].js',
    publicPath: '/'
  },

  // 模块加载器
  module: {
    rules: [
      // 加载css
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      }
    ]
  },
  devtool: '#sourcemap',
  plugins: [
    new CleanPlugin(['dist'], {
      root: resolve('')
    }),
    new ExtractTextPlugin({
      filename: 'static/css/[name].[contenthash].css'
    }),
    // 压缩css, 重复的样式也会被移除
    /*new OptimizeCssPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),*/

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),

    // 第三方包模块单独打包
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    // 将webpack模板代码单独打包
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    }),
  ]
})