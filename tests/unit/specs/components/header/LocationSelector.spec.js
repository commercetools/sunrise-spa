import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import LocationSelector from '@/components/header/LocationSelector/LocationSelector.vue';
import SelectBoxIt from '@/components/common/form/SelectBoxIt/SelectBoxIt.vue';

Vue.component('SelectBoxIt', SelectBoxIt);

describe('LocationSelector/index.vue', () => {
  let options;

  beforeEach(() => {
    options = {
      mocks: { $t: jest.fn() },
      propsData: {
        values: {
          it: 'Italiano',
          es: 'Español',
        },
        title: 'hello world',
      },
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(LocationSelector, options).vm).toBeTruthy();
  });

  it('computes languages defined in configuration', () => {
    options.mocks.$i18n = {};
    options.mocks.$sunrise = { languages: { it: 'Italiano', es: 'Español' } };
    const wrapper = shallowMount(LocationSelector, options);

    expect(wrapper.vm.listValues).toEqual([{ id: 'it', name: 'Italiano' }, { id: 'es', name: 'Español' }]);
  });
});
