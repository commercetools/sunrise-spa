import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import LocationSelector from '@/components/header/LocationSelector.vue';
import SelectBoxIt from '@/components/common/form/SelectBoxIt.vue';

Vue.component('SelectBoxIt', SelectBoxIt);

describe('LocationSelector.vue', () => {
  let options;

  beforeEach(() => {
    options = {
      mocks: { $t: jest.fn() },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(LocationSelector, options).isVueInstance()).toBe(true);
  });

  it('computes languages defined in configuration', () => {
    options.mocks.$i18n = {};
    options.mocks.$sunrise = { languages: { it: 'Italiano', es: 'Español' } };
    const wrapper = shallowMount(LocationSelector, options);

    expect(wrapper.vm.languages).toEqual([{ id: 'it', name: 'Italiano' }, { id: 'es', name: 'Español' }]);
    expect(wrapper.find('[data-test="location-selector"]').exists()).toBe(true);
  });

  it('hides selector on empty languages', () => {
    const wrapper = shallowMount(LocationSelector);

    expect(wrapper.vm.languages).toEqual([]);
    expect(wrapper.find('[data-test="location-selector"]').exists()).toBe(false);
  });
});
