module.exports = {
  publicPath: "./",
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "./src/styles/global.scss";'
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
