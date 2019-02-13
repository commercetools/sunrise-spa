<template>
  <div v-if="product"
       class="row select-row">
    <ul class="list-inline">
      <li v-for="variant in productVariants"
          :key="variant.name">
        <p class="text-uppercase">
          {{ variant.name }}
        </p>

        <div>
          <select class="select-product-detail">
            <option>
              {{ variant.value || variant.label }}
            </option>
          </select>
        </div>
        <!-- {{> common/required-error-message}} -->
      </li>

      <li class="size-guide-li">
        <!-- {{> catalog/size-guide}} -->
      </li>
    </ul>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
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
      return Object.values(this.product.masterData.current.variant.attributes)
        .filter(attr => typeof attr === 'object');
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
