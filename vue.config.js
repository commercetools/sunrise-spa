module.exports = {
  pluginOptions: {
    i18n: {
      enableInSFC: true,
    },
  },
  configureWebpack: {
    performance: {
      maxEntrypointSize: 500000,
      maxAssetSize: 350000,
    },
  },
};
