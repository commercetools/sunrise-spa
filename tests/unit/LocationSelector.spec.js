import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import LocationSelector from '@/components/LocationSelector.vue';
import SelectBoxIt from '@/components/global/SelectBoxIt.vue';

require('./test-utils.config');

Vue.component('SelectBoxIt', SelectBoxIt);

describe('LocationSelector.vue', () => {
  it('renders a vue instance', () => {
    const wrapper = shallowMount(LocationSelector);
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('displays languages defined in configuration', () => {
    const wrapper = shallowMount(LocationSelector, {
      mocks: {
        $sunrise: ({ languages: { en: 'English', de: 'Deutsch' } }),
      },
    });
  });
});
