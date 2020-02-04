import gql from 'graphql-tag';
import BaseMoney from '../../../common/BaseMoney/index.vue';
import BaseDate from '../../../common/BaseDate/index.vue';
import LoadingSpinner from '../../../common/LoadingSpinner/index.vue';
import MONEY_FRAGMENT from '../../../Money.gql';

export default {
  components: { BaseMoney, BaseDate, LoadingSpinner },
  data: () => ({
    me: null,
  }),
  computed: {
    isLoading() {
      return this.$apollo.loading;
    },
    orderListNotEmpty() {
      return this.me?.orders?.results.length > 0;
    },
  },
  methods: {
    translateStatus(state) {
      return state ? this.$t(state) : '-';
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
