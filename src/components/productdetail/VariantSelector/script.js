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
      const { allVariants } = this.product.masterData.staged || this.product.masterData.current;
      return flatMap(allVariants, variant => Object.values(variant.attributes)
        .filter(attr => typeof attr === 'object'))
        .reduce(this.groupValuesByAttribute, {});
    },
    selected() {
      return this.variantCombinations
        .find(variant => variant.sku === this.sku);
    },
    variantCombinations() {
      const p = this.product.masterData.staged || this.product.masterData.current;
      return p.allVariants
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
        query VariantSelector($locale: Locale!, $sku: String!, $preview: Boolean!) {
          product(sku: $sku) {
            id
            masterData {
              current @skip(if: $preview) {
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
              
              staged @include(if: $preview) {
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
          preview: this.$route.query.preview === 'true' || false,
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
