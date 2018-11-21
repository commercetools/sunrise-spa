import VueTestUtils from '@vue/test-utils';

global.fetch = require('jest-fetch-mock');

VueTestUtils.config.mocks = {
  $sunrise: {},
  $store: {},
};
