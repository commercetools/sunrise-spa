module.exports = {
  pluginOptions: {
    enableInSFC: true,
  },
  configureWebpack: {
    performance: {
      maxEntrypointSize: 500000,
      maxAssetSize: 350000,
    },
  },
};
