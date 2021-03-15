const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.base.conf.js')


const devConfig = {
  mode: 'development',
  output: {
    chunkFilename: '[name].js'
  },

  devtool: 'cheap-module-eval-soure-map',
  devServer: {
    contentBase: path.join(__dirname, "../src/app.js"),
    publicPath: '/',
    host: "127.0.0.1",
    port: 8000,
    hot: true,
    overlay: true,
    proxy: {
      '/comments': {
        target: 'https://m.weibo.cn',
        changeOrigin: true,
        logLevel: 'debug',
        headers: {
          Cookie: ''
        }
      }
    },
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ]
}

module.exports = merge(commonConfig, devConfig)