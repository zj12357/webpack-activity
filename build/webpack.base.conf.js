const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WebpackBar = require('webpackbar');
const HappyPack = require('happypack');
let os = require('os')
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length 
});

module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    extensions: [".ts", ".js",".css",".scss"],
  },
  module: {
    rules: [{
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: ['happypack/loader?id=babel'],
      },
    
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['happypack/loader?id=styles'],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [{
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].min.[ext]',
              limit: 1000, // size <= 1KB
              outputPath: 'images/'
            }
          },
          // img-loader for zip img
          {
            loader: 'image-webpack-loader',
            options: {
              // 压缩 jpg/jpeg 图片
              mozjpeg: {
                progressive: true,
                quality: 65 // 压缩率
              },
              // 压缩 png 图片
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]-[hash:5].min.[ext]',
            limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
            publicPath: 'fonts/',
            outputPath: 'fonts/'
          }
        }
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          // Disables attributes processing
          attributes: false,
        },
      },
    ]
  },
  plugins: [
    // 开发环境和生产环境二者均需要的插件
    new WebpackBar(),
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory'],
      threadPool: happyThreadPool
    }),
    new HappyPack({
      id: 'styles',
      loaders: ['style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2, // 在一个 css 中引入了另一个 css，也会执行之前两个 loader，即 postcss-loader 和 sass-loader
            sourceMap: true
          }
        },
        'postcss-loader', // 使用 postcss 为 css 加上浏览器前缀
        'sass-loader' // 使用 sass-loader 将 scss 转为 css
      ],
      threadPool: happyThreadPool
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '..', 'index.html'),
      minify: {
        collapseWhitespace: true
      },
      favicon: path.resolve(__dirname, '../src/assets/images', 'icon.png')
    }),
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    new CleanWebpackPlugin()
  ],
  performance: false
}