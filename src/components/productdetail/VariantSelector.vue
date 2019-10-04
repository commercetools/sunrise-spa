<template>
  <div v-if="product"
       class="row select-row">
    <ul class="list-inline"
        data-test="variant-selector-list">
      <li v-for="(values, name) in attributes"
          :key="name">
        <p class="text-uppercase"
           data-test="attribute-name">
          {{name}}
        </p>
        <AttributeSelect :product="product"
                         :values="values"
                         :sku="sku"
                         :name="name"
                         :selected="selected"
                         :variantCombinations="variantCombinations" />
      </li>
    </ul>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import flatMap from 'lodash.flatmap';
import AttributeSelect from './AttributeSelect.vue';

export default {
  components: { AttributeSelect },

  props: {
    sku: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    product: null,
  }),

  methods: {
    groupValuesByAttribute(acc, currentItem) {
      if (!acc[currentItem.name]) {
        acc[currentItem.name] = [];
      }
      acc[currentItem.name].push(currentItem.value || currentItem.label);
      return acc;
    },
  },

  computed: {
    attributes() {
      const { allVariants } = this.product.masterData.current;
      return flatMap(allVariants, variant => Object.values(variant.attributes)
        .filter(attr => typeof attr === 'object'))
        .reduce(this.groupValuesByAttribute, {});
    },

    selected() {
      return this.variantCombinations
        .find(variant => variant.sku === this.sku);
    },

    variantCombinations() {
      return this.product.masterData.current.allVariants
        .map((variant) => {
          const attrs = variant.attributes;
          const combi = { sku: variant.sku };
          delete attrs.__typename;
          Object.keys(attrs).forEach((key) => {
            combi[key] = variant.attributes[key].label || variant.attributes[key].value;
          });
          return combi;
        });
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
                allVariants {
                  sku
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
