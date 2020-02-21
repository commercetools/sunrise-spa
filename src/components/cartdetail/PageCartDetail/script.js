import gql from 'graphql-tag';
import cartMixin from '../../../mixins/cartMixin';
import LoadingSpinner from '../../common/LoadingSpinner/index.vue';
import CartLikeContentDetail from '../../common/cartlike/CartLikeContentDetail/index.vue';
import CartLikePriceDetail from '../../common/cartlike/CartLikePriceDetail/index.vue';
import AddDiscountCodeForm from '../AddDiscountCodeForm/index.vue';
import CART_FRAGMENT from '../../Cart.gql';
import ADDRESS_FRAGMENT from '../../Address.gql';
import MONEY_FRAGMENT from '../../Money.gql';
import { locale } from '../../common/shared';

export default {
  components: {
    LoadingSpinner,
    CartLikeContentDetail,
    CartLikePriceDetail,
    AddDiscountCodeForm,
  },
  data: () => ({
    me: null,
  }),
  computed: {
    isLoading() {
      return this.$apollo.loading;
    },
  },
  mixins: [cartMixin],
  apollo: {
    me: {
      query: gql`
        query me($locale: Locale!) {
          me {
            activeCart {
              ...CartFields
            }
          }
        }
        ${CART_FRAGMENT}
        ${MONEY_FRAGMENT}
        ${ADDRESS_FRAGMENT}`,
      variables() {
        return {
          locale: locale(this),
        };
      },
    },
  },
};
