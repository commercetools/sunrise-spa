import gql from 'graphql-tag';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import ShippingMethod from '../ShippingMethod/ShippingMethod.vue';
import PaymentMethod from '../PaymentMethod/PaymentMethod.vue';
import BasePrice from '../../common/BasePrice/BasePrice.vue';
import BaseMoney from '../../common/BaseMoney/BaseMoney.vue';
import productMixin from '../../../mixins/productMixin';
import cartMixin from '../../../mixins/cartMixin';
import CartLikePriceDetail from '../../common/cartlike/CartLikePriceDetail/CartLikePriceDetail.vue';
import LineItemInfo from '../../common/cartlike/LineItemInfo/LineItemInfo.vue';
import CART_FRAGMENT from '../../Cart.gql';
import MONEY_FRAGMENT from '../../Money.gql';
import ADDRESS_FRAGMENT from '../../Address.gql';
import { totalPrice, locale } from '../../common/shared';

export default {
  components: {
    LineItemInfo,
    ShippingMethod,
    PaymentMethod,
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
    updateShippingMethod(shippingId) {
      this.$emit('updateShipping', shippingId);
      this.$apollo.queries.me.refresh();
    },
    placeOrder() {
      this.$emit('completeOrder');
    },
  },
  computed: {
    subtotal() {
      if (this.me) {
        const { currencyCode, fractionDigits } = this.me.activeCart.totalPrice;
        return {
          centAmount: this.me.activeCart.lineItems.reduce((acc, li) => acc + li.totalPrice.centAmount, 0),
          currencyCode,
          fractionDigits,
        };
      }
      return null;
    },
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
      skip() {
        return !locale(this);
      },
    },
  },
};
