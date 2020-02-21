import gql from 'graphql-tag';
import BaseForm from '../../common/form/BaseForm/index.vue';
import cartMixin from '../../../mixins/cartMixin';
import ServerError from '../../common/form/ServerError/index.vue';
import LoadingButton from '../../common/form/LoadingButton/index.vue';
import CartLikeSummary from '../../common/cartlike/CartLikeSummary/index.vue';
import CART_FRAGMENT from '../../Cart.gql';
import ADDRESS_FRAGMENT from '../../Address.gql';
import MONEY_FRAGMENT from '../../Money.gql';
import { locale } from '../../common/shared';

export default {
  components: {
    CartLikeSummary,
    LoadingButton,
    ServerError,
    BaseForm,
  },
  mixins: [cartMixin],
  data() {
    return {
      order: null,
    };
  },
  methods: {
    createOrder() {
      return this.createMyOrder().then((result) => {
        this.order = result.data.createMyOrderFromCart;
        window.scrollTo(0, 0);
      });
    },
  },
  watch: {
    me(value) {
      if (value.activeCart) {
        if (!value.activeCart.shippingAddress) {
          this.$router.push({ name: 'checkout' });
        } else if (!value.activeCart.shippingInfo) {
          this.$router.push({ name: 'checkout-shipping-method' });
        }
      }
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
    },
  },
  validations: {
    form: {},
  },
};
