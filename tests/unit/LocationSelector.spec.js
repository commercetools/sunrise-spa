import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import LocationSelector from '@/components/LocationSelector.vue';
import SelectBoxIt from '@/components/global/SelectBoxIt.vue';

Vue.component('SelectBoxIt', SelectBoxIt);

describe('LocationSelector.vue', () => {
  it('displays languages defined in configuration', () => {
    const wrapper = shallowMount(LocationSelector, {
      mocks: {
        $i18n: ({ locale: 'en' }),
        $sunrise: ({ languages: { en: 'English', de: 'Deutsch' } }),
        $t: () => {},
      },
      stubs: {
        SelectBoxIt: '<div/>',
      },
    });
    console.log(wrapper.find(SelectBoxIt).props());
  });
});
