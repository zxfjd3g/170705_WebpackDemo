const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  // 入口
  entry: './src/index.js',
  // 出口
  output: {
    path: resolve('dist'),
    filename: 'bundle.js'
  },
  // 模块加载器
  module: {
    rules: [
      // es6-->es5
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [resolve('src')]
      },
      // css
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

      // 图片
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: 'file-loader',
      }
    ]
  },
  //插件
  plugins: [
    new HtmlPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: true
    })
  ]
}