import { config } from '@vue/test-utils';

global.fetch = require('jest-fetch-mock');

config.mocks = {
  $sunrise: {},
  $store: {},
};
