module.exports = {
  publicPath: "./",
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "./src/styles/global.scss";'
      }
    }
  }
};
