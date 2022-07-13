const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
module.exports = defineConfig({
  //transpileDependencies: true,
  productionSourceMap:false,
  //关闭eslint
  lintOnSave:false,
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
    resolve: {
      fallback: {
        fs : false, 
        net: false,
        unknownContextCritical : false,
        exprContextCritical: false
      }
    }
  },
  //代理跨域
  devServer: {
    proxy: {
      '/api': {
        target:'http://gmall-h5-api.atguigu.cn',
      },
    },
  },
})
