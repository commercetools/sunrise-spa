const path = require('path');
const PROJECT_VIEW_PATH =
  process.env.PROJECT_VIEW_PATH ||
  'src/presentation/fashion/';

module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true,
    },
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "presentation/assets/scss/_global.scss";
        `,
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        presentation: path.resolve(
          __dirname,
          PROJECT_VIEW_PATH
        ),
        containers: path.resolve(
          __dirname,
          'src/containers'
        ),
        react: path.resolve(__dirname, 'composition/react'),
        hooks: path.resolve(__dirname, 'composition'),
        SASS: path.resolve(
          __dirname,
          'presentation/assets/scss'
        ),
      },
    },
  },
};
