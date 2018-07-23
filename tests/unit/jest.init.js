import VueTestUtils from '@vue/test-utils';

// config.stubs['my-component'] = '<div />';

VueTestUtils.config.mocks = {
  $i18n: {},
  $t: jest.fn(),
  $sunrise: {},
};

VueTestUtils.config.stubs = {
  'router-link': '<a></a>',
};
