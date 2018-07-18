import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import LocationSelector from '@/components/LocationSelector.vue';
import SelectBoxIt from '@/components/global/SelectBoxIt.vue';

Vue.component('SelectBoxIt', SelectBoxIt);

describe('LocationSelector.vue', () => {
  it('renders a vue instance', () => {
    expect(shallowMount(LocationSelector).isVueInstance()).toBe(true);
  });

  it('computes languages defined in configuration', () => {
    const wrapper = shallowMount(LocationSelector, {
      mocks: {
        $sunrise: { languages: { it: 'Italiano', es: 'Español' } },
      },
    });
    expect(wrapper.vm.languages).toEqual([{ id: 'it', name: 'Italiano' }, { id: 'es', name: 'Español' }]);
    expect(wrapper.find('[data-test="location-selector"]').exists()).toBe(true);
  });

  it('hides selector on empty languages', () => {
    const wrapper = shallowMount(LocationSelector);
    expect(wrapper.vm.languages).toEqual([]);
    expect(wrapper.find('[data-test="location-selector"]').exists()).toBe(false);
  });
});
