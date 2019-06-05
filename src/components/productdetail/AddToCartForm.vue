<template>
  <form @submit.prevent="submit(addLineItem)">
    <ServerError :error="serverError"/>
    <div class="row select-row">
      <ul class="list-inline">
        <!--{{#each product.attributes}}-->
        <!--{{> catalog/product-attribute attribute=this
                variants=../product.variants identifiers=../product.variantIdentifiers}}-->
        <!--{{/each}}-->
        <!--<li class="size-guide-li">-->
          <!--{{> catalog/size-guide}}-->
        <!--</li>-->
      </ul>
    </div>
    <div class="row">
      <ul class="product-actions-list list-inline">
        <li class="bag-items-li">
          <BaseSelect v-model.number="form.quantity"
                      :vuelidate="$v.form.quantity"
                      :options="quantities"
                      data-test="add-to-cart-form-quantity-dropdown"
                      class="bag-items"/>
        </li>
        <li>
          <LoadingButton :buttonState="buttonState"
                         data-test="add-to-cart-form-button"
                         class="add-to-bag-btn">
            <img class="bag-thumb"
                 src="../../assets/img/hand-bag-2-black.png"
                 alt="$t('addToCart')">
            {{ $t('addToCart') }}
          </LoadingButton>
        </li>
      </ul>
    </div>
  </form>
</template>

<script>
import { required, numeric, between } from 'vuelidate/lib/validators';
import cartMixin from '../../mixins/cartMixin';
import priceMixin from '../../mixins/priceMixin';
import formMixin from '../../mixins/formMixin';
import ServerError from '../common/ServerError.vue';
import LoadingButton from '../common/LoadingButton.vue';
import BaseSelect from '../common/BaseSelect.vue';

const MAX_QUANTITY = 10;

export default {
  props: {
    sku: {
      type: String,
      required: true,
    },
  },

  components: {
    BaseSelect,
    LoadingButton,
    ServerError,
  },

  mixins: [cartMixin, priceMixin, formMixin],

  data: () => ({
    form: {
      quantity: 1,
    },
  }),

  computed: {
    quantities() {
      return [...Array(MAX_QUANTITY).keys()].map(i => ({ id: i + 1, name: i + 1 }));
    },
  },

  methods: {
    async addLineItem() {
      if (!this.me.activeCart) {
        await this.createMyCart({
          draft: {
            currency: this.currency,
          },
        });
      }
      return this.updateMyCart({
        addLineItem: {
          sku: this.sku,
          quantity: this.form.quantity,
        },
      }).then(() => this.$store.dispatch('openMiniCart'));
    },
  },

  validations() {
    return {
      form: {
        quantity: { required, numeric, between: between(1, MAX_QUANTITY) },
      },
    };
  },
};
</script>

<i18n>
de:
  addToCart: "In den Warenkorb"
en:
  addToCart: "Add to Bag"
</i18n>
