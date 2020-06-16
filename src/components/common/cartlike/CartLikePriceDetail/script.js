import BaseMoney from '../../BaseMoney/index.vue';
import DiscountCodes from '../DiscountCodes/index.vue';

export default {
  components: {
    DiscountCodes,
    BaseMoney,
  },
  props: {
    cartLike: {
      type: Object,
      required: true,
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isDiscounted() {
      const priceCentAmount = this.cartLike.lineItems
        .reduce((acc, li) => acc + (li.quantity * li.price.value.centAmount), 0);
      const totalPriceCentAmount = this.cartLike.lineItems.reduce((acc, li) => acc + li.totalPrice.centAmount, 0);
      return priceCentAmount !== totalPriceCentAmount;
    },
    netSubtotal() {
      const { currencyCode, fractionDigits } = this.cartLike.totalPrice;
      return {
        centAmount: this.cartLike.lineItems.reduce((acc, li) => acc + (li.quantity * li.price.value.centAmount), 0),
        currencyCode,
        fractionDigits,
      };
    },
    subtotal() {
      const { currencyCode, fractionDigits } = this.cartLike.totalPrice;
      return {
        centAmount: this.cartLike.lineItems.reduce((acc, li) => acc + li.totalPrice.centAmount, 0),
        currencyCode,
        fractionDigits,
      };
    },
    taxes() {
      const { currencyCode, fractionDigits } = this.cartLike.totalPrice;
      const { taxedPrice } = this.cartLike;
      if (taxedPrice) {
        return {
          centAmount: taxedPrice.totalGross.centAmount - taxedPrice.totalNet.centAmount,
          currencyCode,
          fractionDigits,
        };
      }
      return null;
    },
    discountCodesExist() {
      return this.cartLike.discountCodes?.length;
    },
  },
};
