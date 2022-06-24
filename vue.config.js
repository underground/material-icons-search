module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/material-icons-search/' : '/',
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "./src/styles/global.scss";'
      }
    }
  },
  configureWebpack: {
    resolve: {
      // https://github.com/primer/css/issues/442#issuecomment-860242683
      alias: {
        '/images/spinners': false,
        '/images/modules': false
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => ({
        ...options,
        compilerOptions: {
          // treat any tag that starts with ion- as custom elements
          isCustomElement: tag => tag.startsWith("details-dialog"),
        }
      }))
  }
};
