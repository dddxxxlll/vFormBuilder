const path = require('path')
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
//const ProxyAgent = require('proxy-agent')
// const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
  outputDir: 'docs', // 'dist', 生产环境构建文件的目录
  publicPath: './',
  indexPath:'index.html',
  runtimeCompiler: true,
  assetsDir: 'static',
  productionSourceMap: false, // 生产环境的 source map
  parallel: require('os').cpus().length > 1,
  //   outputDir: 'dist',
  // configureWebpack: {
  //   entry: './src/index.js',
  // output: {
  //   //path: path.resolve(__dirname, './dist'),
  //   filename: 'vFormBuilder.min.js',
  //   library: 'vformbuilder',
  //   libraryTarget: 'umd',
  //   umdNamedDefine: true
  // },
  // },
  css: {
    loaderOptions: {
      css: {
        importLoaders: 1 // @import 引入的文件可被一个loader处理 （2 可被两个loader处理）
      }
    }
  }
}