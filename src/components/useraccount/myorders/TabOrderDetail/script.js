import gql from 'graphql-tag';
import BaseDate from '../../../common/BaseDate/index.vue';
import CartLikeSummary from '../../../common/cartlike/CartLikeSummary/index.vue';
import ORDER_FRAGMENT from '../../../Order.gql';
import ADDRESS_FRAGMENT from '../../../Address.gql';
import MONEY_FRAGMENT from '../../../Money.gql';
import { locale } from '../../../common/shared';

export default {
  components: {
    CartLikeSummary,
    BaseDate,
  },
  data: () => ({
    me: null,
  }),
  apollo: {
    me: {
      query: gql`
        query orderById($id: String, $locale: Locale!) {
          me {
            order(id: $id) {
              ...OrderFields
            }
          }
        }
        ${ORDER_FRAGMENT}
        ${MONEY_FRAGMENT}
        ${ADDRESS_FRAGMENT}`,
      variables() {
        return {
          id: this.$route.params.id,
          locale: locale(this),
        };
      },
    },
  },
};
