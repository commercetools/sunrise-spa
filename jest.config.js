module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue',
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '\\.(gql|graphql)$': 'jest-transform-graphql',
    '^.+\\.jsx?$': 'babel-jest',
  },
  //another point for React, need to apply this workarround because
  //  amateur vue-apollo takes months to merge in a simple fix
  //  https://github.com/vuejs/vue-apollo/issues/1081#issuecomment-746652213
  moduleNameMapper: {
    '@vue/apollo-composable': '@vue/apollo-composable/dist/index.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: ['/node_modules/(?!@vue/apollo-composable).+\\.js$'], 
  snapshotSerializers: [
    'jest-serializer-vue',
  ],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
  ],
  testURL: 'http://localhost/',
  setupFiles: [
    'jest-localstorage-mock',
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/unit/jest.init.js'],
};
