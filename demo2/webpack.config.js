const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')

function resolve(dir) {
  return path.resolve(__dirname, dir)
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
      // js(es6)
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [resolve('src')]
      },
      // css
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // 图片
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: ['file-loader']
      }
    ]
  },

  plugins: [
    new HtmlPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: true
    })
  ]
}