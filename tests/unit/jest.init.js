import VueTestUtils from '@vue/test-utils';

VueTestUtils.config.mocks = {
  $i18n: {},
  $t: jest.fn(),
  $sunrise: {},
};
