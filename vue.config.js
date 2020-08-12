const path = require('path');

module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@kazupon/vue-i18n-loader')
      .end()
      .use('yaml')
      .loader('yaml-loader')
      .end();
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "SASS/_global.scss";
        `,
      },
    },
  },
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
    resolve: {
      alias: {
        SASS: path.resolve(
          __dirname,
          'src/assets/scss/',
        ),
      },
    },
  },
};
