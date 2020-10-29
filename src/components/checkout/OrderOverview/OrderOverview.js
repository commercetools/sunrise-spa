import gql from 'graphql-tag';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import ShippingMethod from '../ShippingMethod/ShippingMethod.vue';
import PaymentMethod from '../PaymentMethod/PaymentMethod.vue';
import BasePrice from '../../common/BasePrice/BasePrice.vue';
import productMixin from '../../../mixins/productMixin';
import cartMixin from '../../../mixins/cartMixin';
import CartLikePriceDetail from '../../common/CartLike/CartLikePriceDetail/CartLikePriceDetail.vue';
import LineItemInfo from '../../common/CartLike/LineItemInfo/LineItemInfo.vue';
import CART_FRAGMENT from '../../Cart.gql';
import MONEY_FRAGMENT from '../../Money.gql';
import ADDRESS_FRAGMENT from '../../Address.gql';
import {
  totalPrice, locale, subTotal, variantAttributes,
} from '../../common/shared';

export default {
  props: {
    showError: {
      type: Boolean,
      required: false,
    },
  },
  components: {
    LineItemInfo,
    ShippingMethod,
    PaymentMethod,
    CartLikePriceDetail,
    BasePrice,
    VuePerfectScrollbar,
  },
  mixins: [productMixin, cartMixin],
  data: () => ({
    me: null,
  }),
  methods: {
    totalPrice,
    updateShippingMethod(shippingId) {
      this.$emit('update-shipping', shippingId);
      this.$apollo.queries.me.refresh();
    },
    placeOrder() {
      this.$emit('complete-order');
    },
    nameFromLineItem(lineItem) {
      const attributes = variantAttributes(lineItem?.variant, locale(this));
      return `${lineItem.name} ${attributes.map(
        ({ name, value }) => `${name}: ${value}`,
      ).join(', ')}`;
    },
  },
  computed: {
    subtotal() {
      if (this.me) {
        return subTotal(this.me.activeCart);
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
