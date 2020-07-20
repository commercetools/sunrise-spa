import gql from 'graphql-tag';
import cartMixin from '../../../mixins/cartMixin';
import CheckoutTopSection from '../CheckoutTopSection/CheckoutTopSection.vue';
import OrderOverview from '../OrderOverview/OrderOverview.vue';
import BillingDetails from '../BillingDetails/BillingDetails.vue';
import CART_FRAGMENT from '../../Cart.gql';
import MONEY_FRAGMENT from '../../Money.gql';
import ADDRESS_FRAGMENT from '../../Address.gql';
import { locale } from '../../common/shared';

export default {
  components: {
    CheckoutTopSection,
    OrderOverview,
    BillingDetails,
  },
  mixins: [cartMixin],
  data: () => ({
    me: null,
    shippingMethod: null,
    billingAddress: null,
    shippingAddress: null,
    orderComplete: false,
    validForm: false,
    showError: false,
  }),
  methods: {
    setValidForm(valid) {
      this.validForm = valid;
    },
    updateBilling(billingDetails) {
      this.billingAddress = billingDetails;
    },
    updateShipping(shippingDetails) {
      this.shippingAddress = shippingDetails;
    },
    updateShippingMethod(shippingId) {
      this.shippingMethod = shippingId;
    },
    placeOrder() {
      if (this.validForm) {
        this.updateMyCart([
          { setBillingAddress: { address: this.billingAddress } },
        ])
          .then((result) => {
            this.me.activeCart = result.data.updateMyCart;
            if (!this.shippingAddress) {
              return this.updateMyCart([
                { setShippingAddress: { address: this.billingAddress } },
              ]);
            }
            return this.updateMyCart([
              { setShippingAddress: { address: this.shippingAddress } },
            ]);
          })
          .then((result) => {
            this.me.activeCart = result.data.updateMyCart;
            return this.createMyOrder();
          })
          .then(() => {
            this.orderComplete = true;
          });
      } else {
        this.showError = true;
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
      skip() {
        return !locale(this);
      },
    },
  },
};
