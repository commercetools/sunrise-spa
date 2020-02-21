import gql from 'graphql-tag';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import BasePrice from '../../common/BasePrice/index.vue';
import BaseMoney from '../../common/BaseMoney/index.vue';
import productMixin from '../../../mixins/productMixin';
import cartMixin from '../../../mixins/cartMixin';
import CartLikePriceDetail from '../../common/cartlike/CartLikePriceDetail/index.vue';
import LineItemInfo from '../../common/cartlike/LineItemInfo/index.vue';
import CART_FRAGMENT from '../../Cart.gql';
import MONEY_FRAGMENT from '../../Money.gql';
import ADDRESS_FRAGMENT from '../../Address.gql';
import { totalPrice, locale } from '../../common/shared';

export default {
  components: {
    LineItemInfo,
    CartLikePriceDetail,
    BasePrice,
    BaseMoney,
    VuePerfectScrollbar,
  },
  mixins: [productMixin, cartMixin],
  data: () => ({
    me: null,
  }),
  methods: {
    totalPrice,
  },
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
