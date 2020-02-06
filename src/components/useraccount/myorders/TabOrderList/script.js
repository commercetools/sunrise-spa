import gql from 'graphql-tag';
import BaseMoney from '../../../common/BaseMoney/index.vue';
import BaseDate from '../../../common/BaseDate/index.vue';
import LoadingSpinner from '../../../common/LoadingSpinner/index.vue';
import MONEY_FRAGMENT from '../../../Money.gql';

export default {
  components: {
    BaseMoney, BaseDate, LoadingSpinner,
  },
  data: () => ({
    me: null,
    page: 0,
    limit: 3,
  }),
  computed: {
    ordersPerPage() {
      return this.me?.orders?.results.slice(this.page * this.limit, this.page * this.limit + this.limit);
    },
    isLoading() {
      return this.$apollo.loading;
    },
    orderListNotEmpty() {
      return this.me?.orders?.results.length > 0;
    },
    totalPages() {
      return Math.ceil(this.me?.orders?.results.length / this.limit);
    },

    isInFirstPage() {
      return this.page === 0;
    },
    isInLastPage() {
      return this.page >= this.me?.orders?.results.length / this.limit - 1;
    },

  },
  methods: {
    translateStatus(state) {
      return state ? this.$t(state) : '-';
    },
    pageForward() {
      this.page += 1;
    },
    pageBack() {
      this.page -= 1;
    },
  },
  apollo: {
    me: {
      query: gql`
        query MyOrders {
          me {
            orders(sort: "createdAt desc") {
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
      fetchPolicy: 'no-cache',
    },
  },
};
