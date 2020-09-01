module.exports = {
  // publicPath: '/poplar',//静态资源路径好像
  pluginOptions: {
    // i18n: {
    //   locale: 'zh',
    //   fallbackLocale: 'en',
    //   localeDir: 'locales',
    //   enableInSFC: true
    // }
  },

  // devServer 选项单独配置
  devServer: {
    https: false,
    proxy: {
      '/api': {
        target: 'http://localhost:58888',
        // target: 'http://thetime50.com:58888',
        changeOrigin: true,
      }
    },
  },

  //https://blog.csdn.net/zxb89757/article/details/103256614
  //cnpm install --save sass-resources-loader
  // chainWebpack: config => {
  //   const oneOfsMap = config.module.rule('scss').oneOfs.store
  //   oneOfsMap.forEach(item => {
  //     item
  //       .use('sass-resources-loader')
  //       .loader('sass-resources-loader')
  //       .options({
  //         // Provide path to the file with resources
  //         // 要公用的scss的路径
  //         resources: './src/style/theme.scss'
  //       })
  //       .end()
  //   })
  // },

  publicPath: "./",//vue-cli 4.x //不知道el icon会不会正常
}
