module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
  moduleNameMapper: {
    '^react$': '<rootDir>/composition/react',
    '^composition$': '<rootDir>/composition',
  },
};
