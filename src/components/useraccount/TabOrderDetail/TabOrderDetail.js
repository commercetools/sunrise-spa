import gql from "graphql-tag";
import BaseDate from "../../common/BaseDate/BaseDate.vue";
import BaseAddress from "../../common/BaseAddress/BaseAddress.vue";
import BaseMoney from "../../common/BaseMoney/BaseMoney.vue";
import LineItemInfo from "../../common/CartLike/LineItemInfo/LineItemInfo.vue";
import CartLikeContentDetail from "../../common/CartLike/CartLikeContentDetail/CartLikeContentDetail.vue";
import ORDER_FRAGMENT from "../../Order.gql";
import ADDRESS_FRAGMENT from "../../Address.gql";
import MONEY_FRAGMENT from "../../Money.gql";
import { locale } from "../../common/shared";

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
    returned() {
      if (this.me) {
        return this.me.order.returnInfo.reduce(
          (acc, { items }) =>
            items.reduce(
              (acc, { lineItemId, quantity }) => {
                acc[lineItemId] =
                  (acc[lineItemId] || 0) + quantity;
                return acc;
              },
              acc
            ),
          {}
        );
      }
      return [];
    },
    returnedItems() {
      let lineItems = [];
      // if (this.me) {
      // }
      return { ...this.me.order, lineItems };
    },
    lineItems() {
      let lineItems;
      if (this.me) {
        lineItems = this.me.order.lineItems.map(
          (lineItem) =>
            this.returned[lineItem.id]
              ? {
                  ...lineItem,
                  quantity:
                    lineItem.quantity -
                    this.returned[lineItem.id],
                }
              : lineItem
        );
      }
      return { ...this.me.order, lineItems };
    },
    showLineItems() {
      return Boolean(this.lineItems.lineItems.length);
    },
    showReturnedItems() {
      return Boolean(this.returnedItems.lineItems.length);
    },
    subtotal() {
      if (this.me) {
        const {
          currencyCode,
          fractionDigits,
        } = this.me.order.totalPrice;
        return {
          centAmount: this.me.order.lineItems.reduce(
            (acc, li) => acc + li.totalPrice.centAmount,
            0
          ),
          currencyCode,
          fractionDigits,
        };
      }
      return null;
    },
    paymentInfo() {
      return this.$t(
        this?.me?.order?.paymentInfo?.payments?.[0]
          ?.paymentStatus?.interfaceCode
      );
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
        ${ADDRESS_FRAGMENT}
      `,
      variables() {
        return {
          id: this.$route.params.id,
          locale: locale(this),
        };
      },
    },
  },
};
