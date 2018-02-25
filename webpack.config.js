const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpackDevServer = process.argv[1].indexOf('webpack-dev-server') !== -1

const config = {
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader?minimize&-autoprefixer'
      })
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react']
        }
      }
    }]
  },
  devtool: 'source-map',
  plugins: [
        // 加入 html 模板任务
    new HtmlWebpackPlugin({
        // 模板文件
      template: 'src/index.html',
        // 打包后文件名称，会自动放到 output 指定的 dist 目录
      filename: 'index.html',
      inject: true,
      minify: {
        minifyCSS: true,
        removeComments: true,
        removeEmptyAttributes: true,
        collapseWhitespace: true
      }
    }),
    new UglifyWebpackPlugin({
      test: /\.jsx$/i,
      uglifyOptions: {
        ecma: 6,
        output: {
          comments: false,  // 删除所有注释
          beautify: false   // 紧凑输出
        },
        compress: {
          drop_console: true, // 删除 console
          collapse_vars: true,  // 内嵌定义但只用到一次的变量
          reduce_vars: true   // 提取出出现多次但没有定义成变量去引用的静态值
        },
        warnings: false   // 在uglifyJs删除没有用到的代码时不输出警告
      }
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    })
  ]
}

// 判断是 webpack-dev-server 还是 webpack，若是前者则去除 cleanWebpackPlugin
config.plugins = config.plugins || []
if (!webpackDevServer) {
  config.plugins.push(new CleanWebpackPlugin('./dist/'))
}

module.exports = config
