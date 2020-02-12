import gql from 'graphql-tag';
import BaseMoney from '../../../common/BaseMoney/index.vue';
import BaseDate from '../../../common/BaseDate/index.vue';
import LoadingSpinner from '../../../common/LoadingSpinner/index.vue';
import MONEY_FRAGMENT from '../../../Money.gql';
import { pageFromRoute } from '../../../common/shared';

export default {
  components: {
    BaseMoney, BaseDate, LoadingSpinner,
  },
  data: () => ({
    me: null,
    limit: Number(process.env.VUE_APP_PAGE_SIZE || 10),
  }),
  computed: {
    isLoading() {
      return this.$apollo.loading || !this.me;
    },
    page() {
      return pageFromRoute(this.$route).page;
    },
    orders() {
      return this.isLoading ? [] : this.me?.orders.results;
    },
    orderListNotEmpty() {
      return this.me?.orders?.results.length > 0;
    },
    totalPages() {
      return Math.ceil(this.me?.orders.total / this.limit);
    },

    disablePagePrev() {
      return this.page === 1;
    },
    disablePageNext() {
      return this.page >= this.totalPages;
    },
    showPaging() {
      return this.totalPages > 1;
    },

  },
  methods: {
    translateStatus(state) {
      return state ? this.$t(state) : '-';
    },
    pushPage(page) {
      const { params } = this.$route;
      this.$router.push({
        name: 'orders',
        params: { ...params, page },
      });
    },
    pageForward() {
      this.pushPage(this.page + 1);
    },
    pageBack() {
      this.pushPage(this.page - 1);
    },
  },
  apollo: {
    me: {
      query: gql`
        query MyOrders($limit: Int,$offset: Int) {
          me {
            orders(sort: "createdAt desc",limit: $limit,offset: $offset) {
              total
              results {
                id
                orderNumber
                totalPrice {
                  ...MoneyFields
                }
                createdAt
                shipmentState
                paymentState
              }
            }
          }
        },
        ${MONEY_FRAGMENT}`,
      variables() {
        const { page, limit } = this;
        return {
          limit,
          offset: (page - 1) * limit,
        };
      },

      fetchPolicy: 'no-cache',
    },
  },
};
