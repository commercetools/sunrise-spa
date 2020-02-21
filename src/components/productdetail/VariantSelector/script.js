import gql from 'graphql-tag';
import flatMap from 'lodash.flatmap';
import AttributeSelect from '../AttributeSelect/index.vue';

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
    attributeTranslation: null,
  }),
  methods: {
    groupValuesByAttribute(acc, currentItem) {
      const key = this.attributeTranslation?.get(currentItem.name)
        || currentItem.name;
      if (!acc[key]) {
        acc[key] = {
          name: currentItem.name,
          values: [],
        };
      }
      acc[key].values.push(currentItem.value || currentItem.label);
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
    attributeName: {
      query: gql`
        query Translation($locale: Locale!, $type:String!) {
          productType(key:$type) {
            attributeDefinitions(limit:50) {
              results {
                name
                label(locale:$locale)
              }
            }
          }
        }`,
      manual: true,
      result({ data, loading }) {
        if (!loading) {
          this.attributeTranslation = data.productType.attributeDefinitions.results.reduce(
            (result, item) => result.set(item.name, item.label), new Map(),
          );
        }
      },
      variables() {
        return {
          locale: this.$i18n.locale,
          type: 'main',
        };
      },
    },
  },
};
