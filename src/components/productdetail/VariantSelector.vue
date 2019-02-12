<template>
<form v-if="product">
  <!-- <form id="form-add-to-cart{{index}}" name="add-to-cart" method="post"
             action="{{@root.meta._links.addToCart.href}}"> -->
  <!-- <input type="hidden" name="csrfToken" value="{{@root.meta.csrfToken}}"/> -->
  <!-- <input type="hidden" name="productId" value="{{product.productId}}"> -->
  <!-- <input type="hidden" name="variantId" value="{{product.variantId}}"> -->
  <!-- <input type="hidden" name="productSku" value="{{product.variant.sku}}"> -->
  <!-- <input type="hidden" name="productSlug" value="{{product.slug}}"> -->

  <div v-if="productVariants"
       class="row select-row">
    <SelectorAttributes :productVariants="productVariants" />
  </div>
</form>
</template>

<script>
import gql from 'graphql-tag';
import SelectorAttributes from './SelectorAttributes.vue';

export default {
  components: {
    SelectorAttributes,
  },

  props: {
    sku: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    product: null,
  }),

  computed: {
    productVariants() {
      return this.product.masterData.current.variant.attributes;
    },
  },

  apollo: {
    product: {
      query: gql`
        query VariantSelector($locale: Locale!, $sku: String!) {
          product(sku: $sku) {
            id
            masterData {
              current {
                variant(sku: $sku) {
                  attributes {
                    ...on mainProductType {
                      color {
                        key
                        label(locale: $locale)
                        name
                      }
                      size {
                        value
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }`,
      variables() {
        return {
          locale: this.$i18n.locale,
          sku: this.sku,
        };
      },
    },
  },
};
</script>
