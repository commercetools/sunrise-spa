import VueI18n from 'vue-i18n';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { ApolloError } from 'apollo-client';
import ServerError from '@/components/common/form/ServerError/ServerError.vue';

const localVue = createLocalVue();
localVue.use(VueI18n);

describe('ServerError/index.vue', () => {
  const graphQLError1 = { code: 'ErrorA' };
  const graphQLError2 = { code: 'ErrorB' };
  const unknownErrorTranslation = 'unknown error';
  const networkErrorTranslation = 'network error';
  const badRequestErrorTranslation = 'bad request error';

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
            badRequestError: badRequestErrorTranslation,
          },
        },
      }),
    };
  });

  it('renders a vue instance', () => {
    expect(shallowMount(ServerError, options).vm).toBeTruthy();
  });

  it('detects network errors', () => {
    const wrapper = shallowMount(ServerError, options);
    expect(wrapper.vm.isNetworkError).toBeFalsy();

    wrapper.setProps({ error: new ApolloError({}) });
    expect(wrapper.vm.isNetworkError).toBeFalsy();

    wrapper.setProps({
      error: new ApolloError({
        networkError: { message: 'Some error' },
      }),
    });
    expect(wrapper.vm.isNetworkError).toBeTruthy();
  });

  it('detects 400 errors', () => {
    const wrapper = shallowMount(ServerError, options);
    expect(wrapper.vm.is400Error).toBeFalsy();

    wrapper.setProps({ error: new ApolloError({}) });
    expect(wrapper.vm.is400Error).toBeFalsy();

    wrapper.setProps({ error: new ApolloError({ networkError: {} }) });
    expect(wrapper.vm.is400Error).toBeFalsy();

    wrapper.setProps({
      error: new ApolloError({
        networkError: { message: 'Some error', statusCode: 400 },
      }),
    });
    expect(wrapper.vm.isBadRequestError).toBeTruthy();
  });

  it('detects GraphQL errors', () => {
    const wrapper = shallowMount(ServerError, options);
    expect(wrapper.vm.isGraphQLError).toBeFalsy();

    wrapper.setProps({ error: new ApolloError({}) });
    expect(wrapper.vm.isGraphQLError).toBeFalsy();

    wrapper.setProps({
      error: new ApolloError({
        graphQLErrors: [],
      }),
    });
    expect(wrapper.vm.isGraphQLError).toBeFalsy();

    wrapper.setProps({
      error: new ApolloError({
        graphQLErrors: [graphQLError1, graphQLError2],
      }),
    });
    expect(wrapper.vm.isGraphQLError).toBeTruthy();
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

  it('renders GraphQL error as unknown when no slot is provided', async () => {
    const wrapper = shallowMount(ServerError, options);
    expect(wrapper.text()).toBe('');

    wrapper.setProps({
      error: new ApolloError({
        graphQLErrors: [graphQLError1],
      }),
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toBe(unknownErrorTranslation);
  });

  it('renders internal error', async () => {
    const wrapper = shallowMount(ServerError, options);
    expect(wrapper.text()).toBe('');

    wrapper.setProps({
      error: new Error('some error'),
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toBe(unknownErrorTranslation);
  });

  it('renders 400 error', async () => {
    const wrapper = shallowMount(ServerError, options);
    expect(wrapper.text()).toBe('');

    wrapper.setProps({
      error: new ApolloError({
        networkError: { message: 'Some error', statusCode: 400 },
      }),
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toBe(badRequestErrorTranslation);
  });

  it('renders network error', async () => {
    const wrapper = shallowMount(ServerError, options);
    expect(wrapper.text()).toBe('');

    wrapper.setProps({
      error: new ApolloError({
        networkError: { message: 'Some error' },
      }),
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toBe(networkErrorTranslation);
  });

  it('renders bad request error', async () => {
    const wrapper = shallowMount(ServerError, options);
    expect(wrapper.text()).toBe('');

    wrapper.setProps({
      error: new ApolloError({
        networkError: { statusCode: 400 },
      }),
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toBe(badRequestErrorTranslation);
  });
});
