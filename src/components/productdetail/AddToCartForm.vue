<template>
  <form @submit.prevent="submit">
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
          <ValidationError :vuelidate="$v.quantity">
            <SelectBoxIt :options="quantities"
                         v-model.lazy.number="$v.quantity.$model"
                         class="bag-items"/>
          </ValidationError>
        </li>
        <li>
          <button data-test="add-to-cart-button"
                  class="add-to-bag-btn">
            <img class="bag-thumb"
                 src="../../assets/img/hand-bag-2-black.png"
                 alt="$t('addToCart')">
            <span v-if="loading">
              {{ $t('main.messages.pleaseWait') }}
            </span>
            <span v-else>
              {{ $t('addToCart') }}
            </span>
          </button>
        </li>
      </ul>
    </div>
  </form>
</template>

<script>
import gql from 'graphql-tag';
import { required, numeric, between } from 'vuelidate/lib/validators';
import UpdatableCartInfoFragment from '@/components/UpdatableCartInfo.graphql';
import priceMixin from '@/mixins/priceMixin';
import ServerError from '../common/ServerError.vue';
import ValidationError from '../common/ValidationError.vue';

export default {
  props: {
    sku: {
      type: String,
      required: true,
    },
  },

  components: {
    ValidationError,
    ServerError,
  },

  data: () => ({
    me: null,
    quantity: 1,
    loading: false,
    serverError: null,
  }),

  computed: {
    quantities() {
      return [...Array(10).keys()].map(i => ({ id: i + 1, name: i + 1 }));
    },
  },

  methods: {
    async submit() {
      this.$v.$touch();
      this.serverError = null;
      if (!this.$v.$invalid) {
        this.loading = true;
        await this.addLineItem()
          .catch((error) => {
            this.serverError = error;
            this.loading = false;
          });
        this.loading = false;
      }
    },

    addLineItem() {
      const lineItem = {
        sku: this.sku,
        quantity: this.quantity,
      };
      if (this.me && this.me.activeCart) {
        return this.updateCartWithLineItem(lineItem);
      }
      return this.createCartWithLineItem(lineItem);
    },

    createCartWithLineItem(lineItem) {
      return this.$apollo.mutate({
        mutation: gql`
          mutation createCartWithLineItem($draft: MyCartDraft!) {
            createMyCart(draft: $draft) {
              ...UpdatableCartInfo
            }
          }
          ${UpdatableCartInfoFragment}`,
        variables: {
          draft: {
            currency: this.currency,
            lineItems: [lineItem],
          },
        },
      });
    },

    updateCartWithLineItem(lineItem) {
      return this.$apollo.mutate({
        mutation: gql`
          mutation addLineItem(
            $actions: [MyCartUpdateAction!]!,
            $id: String!,
            $version: Long!) {
            updateMyCart(id: $id, version: $version, actions: $actions) {
              ...UpdatableCartInfo
            }
          }
          ${UpdatableCartInfoFragment}`,
        variables: {
          id: this.me.activeCart.id,
          version: this.me.activeCart.version,
          actions: [
            {
              addLineItem: lineItem,
            },
          ],
        },
      });
    },
  },

  mixins: [priceMixin],

  apollo: {
    me: {
      query: gql`
        query me {
          me {
            activeCart {
              id
              version
            }
          }
        }`,
    },
  },

  validations: {
    quantity: {
      required,
      numeric,
      between: between(1, 10),
    },
  },
};
</script>

<!-- eslint-disable -->
<i18n>
{
  "de": {
    "addToCart": "In den Warenkorb"
  },
  "en": {
    "addToCart": "Add to Bag"
  }
}
</i18n>