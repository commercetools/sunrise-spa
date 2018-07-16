import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import LocationSelector from '@/components/LocationSelector.vue';
import SelectBoxIt from '@/components/global/SelectBoxIt.vue';

Vue.component('SelectBoxIt', SelectBoxIt);

describe('LocationSelector.vue', () => {
  it('renders props.msg when passed', () => {
    // const msg = 'new message';
    const wrapper = shallowMount(LocationSelector, {
      mocks: {
        $i18n: ({ locale: 'en' }),
        $sunrise: ({ languages: { en: 'English', de: 'Deutsch' } }),
        $t: () => {},
      },
    });
    console.log(wrapper);
  });
});
