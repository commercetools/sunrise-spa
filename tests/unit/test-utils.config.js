import { config } from '@vue/test-utils';

// config.stubs['my-component'] = '<div />';

config.mocks.$i18n = {};
config.mocks.$t = jest.fn();
config.mocks.$sunrise = {};

