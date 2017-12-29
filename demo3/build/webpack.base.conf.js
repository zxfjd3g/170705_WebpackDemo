const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')

function resolve (dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/index.js'
  },

  output: {
    path: resolve('dist'),
    filename: '[name].js'
  },

  module: {
    rules: [
      // 处理js
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [resolve('src')]
      },
      // 图片
      {
        test: /\.(jpg|png|svg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: 'static/img/[name].[hash:8].[ext]'
        }
      }
    ]
  },

  // 插件
  plugins: [
    // 生成html
    new HtmlPlugin({
      template: 'index.html',
      filename: 'index.html', //目标文件夹是: dist
      inject: true
    })
  ]
}