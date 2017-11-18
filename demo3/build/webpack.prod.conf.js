/*
生产环境的配置
 */
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')
const baseConfig = require('./webpack.base.conf')

function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = merge(baseConfig, { // 合并配置
  // 入口
  entry: {
    // 指定第三方模块包含哪些
    vendor: ["jquery"]
  },
  // 出口
  output: {
    filename: 'static/js/[name].[chunkhash].js'
  },
  // 模块加载器
  module: {
    rules: [
      // 加载css
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ // 抽取css
          use: 'css-loader'
        })
      }
    ]
  },
  // 插件
  plugins: [
    // 清理dist文件夹
    new CleanPlugin(['dist'], {
      root: resolve('')
    }),
    // 抽取所有css到指定文件
    new ExtractTextPlugin({
      filename: 'static/css/[name].[contenthash].css'
    }),
    // 第三方包模块单独打包
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    // 将webpack模板代码单独打包
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    }),
    // 压缩css
    new OptimizeCssPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // 压缩JS
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
})