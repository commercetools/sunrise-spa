import LineItemInfo from '../LineItemInfo/index.vue';
import BasePrice from '../../BasePrice/index.vue';
import BaseMoney from '../../BaseMoney/index.vue';
import LineItemQuantityForm from '../../../cartdetail/LineItemQuantityForm/index.vue';
import LineItemDeleteForm from '../../../cartdetail/LineItemDeleteForm/index.vue';
import { totalPrice } from '../../shared';

export default {
  components: {
    LineItemDeleteForm,
    LineItemQuantityForm,
    BasePrice,
    BaseMoney,
    LineItemInfo,
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
  methods: {
    totalPrice,
    groupedDiscounts(lineItem) {
      const discountHash = {};
      if (lineItem.discountedPricePerQuantity) {
        lineItem.discountedPricePerQuantity.forEach((element) => {
          const discount = element.discountedPrice;

          discount.includedDiscounts.forEach((d) => {
            let discountSummary = discountHash[d.discount.name];

            if (!discountSummary) { // so, first time through the loop
              discountSummary = {
                name: d.discount.name,
                discount: {
                  centAmount: 0,
                  currencyCode: d.discountedAmount.currencyCode,
                  fractionDigits: d.discountedAmount.fractionDigits,
                  __typename: d.discountedAmount.__typename,
                },
              };
            }

            discountSummary.discount.centAmount += d.discountedAmount.centAmount * element.quantity;
            discountHash[d.discount.name] = discountSummary;
          });
        });
      }
      return Object.values(discountHash);
    },
  },
};
