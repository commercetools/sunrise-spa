import gql from 'graphql-tag';
import BaseDate from '../../common/BaseDate/BaseDate.vue';
import BaseAddress from '../../common/BaseAddress/BaseAddress.vue';
import BaseMoney from '../../common/BaseMoney/BaseMoney.vue';
import LineItemInfo from '../../common/cartlike/LineItemInfo/LineItemInfo.vue';
import CartLikeContentDetail from '../../common/cartlike/CartLikeContentDetail/CartLikeContentDetail.vue';
import ORDER_FRAGMENT from '../../Order.gql';
import ADDRESS_FRAGMENT from '../../Address.gql';
import MONEY_FRAGMENT from '../../Money.gql';
import { locale } from '../../common/shared';

export default {
  components: {
    CartLikeContentDetail,
    BaseDate,
    BaseMoney,
    BaseAddress,
    LineItemInfo,
  },
  data: () => ({
    me: null,
  }),
  computed: {
    subtotal() {
      if (this.me) {
        const { currencyCode, fractionDigits } = this.me.order.totalPrice;
        return {
          centAmount: this.me.order.lineItems.reduce((acc, li) => acc + li.totalPrice.centAmount, 0),
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
