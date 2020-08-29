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
        target: 'http://localhost:8888',
        changeOrigin: true,
      }
    },
  }

}
