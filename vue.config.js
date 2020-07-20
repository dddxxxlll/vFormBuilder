const path = require('path')
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
//const ProxyAgent = require('proxy-agent')
// const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
  outputDir: 'dist', // 'dist', 生产环境构建文件的目录
  //baseUrl:'./',
  publicPath: './',
  indexPath:'index.html',
  runtimeCompiler: true,
  assetsDir: 'static',
  productionSourceMap: false, // 生产环境的 source map
  parallel: require('os').cpus().length > 1,
  // configureWebpack: config => {
  //   // 公共配置
  //   // cdn引用时配置externals 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
  //   config.externals = {
  //     'vue': 'Vue',
  //     'vue-router': 'VueRouter',
  //     'vuex': 'Vuex',
  //     'axios': 'axios'
  //   }
  //   config.resolve.alias = Object.assign({}, config.resolve.alias, {
  //     'src': resolve('src/common'),
  //     'common': resolve('src/views/common'),
  //     'static': resolve('static')
  //   })
  //   if (process.env.NODE_ENV === 'production') {
  //     // 为生产环境修改配置...
  //     config.optimization = {
  //       minimizer: [
  //         new UglifyJsPlugin({
  //           uglifyOptions: {
  //             compress: {
  //               drop_console: true, // console
  //               drop_debugger: false,
  //               pure_funcs: ['console.log']// 移除console
  //             }
  //           }
  //         })
  //       ]
  //     }
  //   } else {
  //     // 为开发环境修改配置...
  //   }
  // },
  css: {
    loaderOptions: {
      css: {
        importLoaders: 1 // @import 引入的文件可被一个loader处理 （2 可被两个loader处理）
      }
    }
  },
  devServer: {
    // proxy: {
    //   // 代理所有请求
    //   "/jghService": {
    //     target: "http://10.10.198.71",
    //     changeOrigin: true,
    //   },
    // }
  }
}