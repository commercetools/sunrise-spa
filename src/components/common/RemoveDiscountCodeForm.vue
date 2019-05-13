<template>
  <div id="deleteButton"
       class="col-sm-1"
       @click="removeDiscountCode"
       data-test="remove-discount-button">
    <img src="../../assets/img/delete-1.png"
         class="cart-action-icon">
  </div>
</template>

<script>
import gql from 'graphql-tag';
import cartMixin from '@/mixins/cartMixin';

export default {

  data: () => ({
    me: null,
  }),

  props: {
    codeId: {
      type: String,
    },
  },

  methods: {
    removeDiscountCode() {
      return this.updateMyCart([{
        removeDiscountCode: {
          discountCode: {
            typeId: 'discount-code',
            id: this.codeId,
          },
        },
      }]);
    },
  },

  mixins: [cartMixin],

  apollo: {
    me: {
      query: gql`
        query me($locale: Locale!){
          me {
            activeCart {
              id
              version
            }
          }
        }`,
      variables() {
        return {
          locale: this.$i18n.locale,
        };
      },
    },
  },
};
</script>
