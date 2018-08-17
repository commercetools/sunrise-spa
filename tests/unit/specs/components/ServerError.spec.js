import VueI18n from 'vue-i18n';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { ApolloError } from 'apollo-client';
import ServerError from '@/components/ServerError.vue';

const localVue = createLocalVue();
localVue.use(VueI18n);

describe('ServerError.vue', () => {
  const graphQLError1 = { code: 'ErrorA' };
  const graphQLError2 = { code: 'ErrorB' };
  const unknownErrorTranslation = 'unknown error';
  const networkErrorTranslation = 'network error';

  let options;

  beforeEach(() => {
    options = {
      localVue,
      i18n: new VueI18n({
        locale: 'en',
        messages: {
          en: {
            unknownError: unknownErrorTranslation,
            networkError: networkErrorTranslation,
          },
        },
      }),
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(ServerError).isVueInstance()).toBeTruthy();
  });

  it('detects internal errors', () => {
    const wrapper = shallowMount(ServerError, options);
    expect(wrapper.vm.isInternalError).toBeFalsy();

    wrapper.setProps({ error: new Error('error') });
    expect(wrapper.vm.isInternalError).toBeTruthy();
  });

  it('detects network errors', () => {
    const wrapper = shallowMount(ServerError, options);
    expect(wrapper.vm.hasNetworkError).toBeFalsy();

    wrapper.setProps({ error: new ApolloError({}) });
    expect(wrapper.vm.hasNetworkError).toBeFalsy();

    wrapper.setProps({
      error: new ApolloError({
        networkError: { message: 'Some error' },
      }),
    });
    expect(wrapper.vm.hasNetworkError).toBeTruthy();
  });

  it('detects GraphQL errors', () => {
    const wrapper = shallowMount(ServerError, options);
    expect(wrapper.vm.hasGraphQLErrors).toBeFalsy();

    wrapper.setProps({ error: new ApolloError({}) });
    expect(wrapper.vm.hasGraphQLErrors).toBeFalsy();

    wrapper.setProps({
      error: new ApolloError({
        graphQLErrors: [],
      }),
    });
    expect(wrapper.vm.hasGraphQLErrors).toBeFalsy();

    wrapper.setProps({
      error: new ApolloError({
        graphQLErrors: [graphQLError1, graphQLError2],
      }),
    });
    expect(wrapper.vm.hasGraphQLErrors).toBeTruthy();
  });

  it('obtains all GraphQL errors', () => {
    const wrapper = shallowMount(ServerError, options);
    expect(wrapper.vm.graphQLErrors).toEqual([]);

    wrapper.setProps({
      error: new ApolloError({
        graphQLErrors: [],
      }),
    });
    expect(wrapper.vm.graphQLErrors).toEqual([]);

    wrapper.setProps({
      error: new ApolloError({
        graphQLErrors: [graphQLError1, graphQLError2],
      }),
    });
    expect(wrapper.vm.graphQLErrors).toEqual([graphQLError1, graphQLError2]);
  });

  it('translates error message', () => {
    const validErrorTranslation = 'bar';
    const wrapper = shallowMount(ServerError, options);
    wrapper.vm.$i18n.mergeLocaleMessage('en', {
      errorCodes: { foo: validErrorTranslation },
    });
    expect(wrapper.vm.translateErrorMessage({ code: 'foo' })).toBe(validErrorTranslation);
    expect(wrapper.vm.translateErrorMessage({ code: 'notfound' })).toBe(unknownErrorTranslation);
    expect(wrapper.vm.translateErrorMessage({})).toBe(unknownErrorTranslation);
  });

  it('renders each GraphQL error', () => {
    const wrapper = shallowMount(ServerError, options);
    expect(wrapper.findAll('[data-test="server-error"]').length).toBe(0);

    wrapper.setProps({
      error: new ApolloError({
        graphQLErrors: [graphQLError1, graphQLError2],
      }),
    });
    expect(wrapper.findAll('[data-test="server-error"]').length).toBe(2);
  });

  it('renders internal error', () => {
    const wrapper = shallowMount(ServerError, options);
    expect(wrapper.findAll('[data-test="server-error"]').length).toBe(0);

    wrapper.setProps({
      error: new Error('some error'),
    });
    expect(wrapper.findAll('[data-test="server-error"]').length).toBe(1);
  });

  it('renders network error', () => {
    const wrapper = shallowMount(ServerError, options);
    expect(wrapper.findAll('[data-test="server-error"]').length).toBe(0);

    wrapper.setProps({
      error: new ApolloError({
        networkError: { message: 'Some error' },
      }),
    });
    expect(wrapper.findAll('[data-test="server-error"]').length).toBe(1);
  });
});
