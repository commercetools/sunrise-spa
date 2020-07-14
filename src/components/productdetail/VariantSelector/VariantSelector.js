import gql from 'graphql-tag';
import AttributeSelect from '../AttributeSelect/AttributeSelect.vue';
import { getValue, locale } from '../../common/shared';

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
      const key = currentItem.name;
      if (!acc[key]) {
        acc[key] = {
          name: currentItem.name,
          values: [],
        };
      }
      acc[key].values.push(
        currentItem.value,
      );
      return acc;
    },
  },
  computed: {
    attributes() {
      const { allVariants } = this.product.masterData.staged
        || this.product.masterData.current;
      return allVariants
        .map(({ attributesRaw }) => attributesRaw.map(
          ({
            attributeDefinition: { label, type },
            value,
          }) => ({
            name: label,
            value:
                getValue(type.name, value, locale(this)),
          }),
        ))
        .flat()
        .reduce(this.groupValuesByAttribute, {});
    },
    selected() {
      return this.variantCombinations.find(
        variant => variant.sku === this.sku,
      );
    },
    variantCombinations() {
      const p = this.product.masterData.staged
        || this.product.masterData.current;
      return p.allVariants.map(
        ({ sku, attributesRaw }) => ({
          sku,
          ...Object.fromEntries(
            attributesRaw.map(
              ({
                attributeDefinition: { name },
                value,
              }) => [
                name,
                typeof value === 'object'
                  ? value.label
                  : value,
              ],
            ),
          ),
        }),
      );
    },
  },
  apollo: {
    product: {
      query: gql`
        query VariantSelector(
          $sku: String!
          $preview: Boolean!
          $locale: Locale!
        ) {
          product(sku: $sku) {
            id
            masterData {
              current @skip(if: $preview) {
                allVariants {
                  sku
                  attributesRaw {
                    attributeDefinition {
                      name
                      label(locale: $locale)
                      type {
                        name
                      }
                    }
                    value
                  }
                }
              }

              staged @include(if: $preview) {
                allVariants {
                  sku
                  attributesRaw {
                    attributeDefinition {
                      name
                      label(locale: $locale)
                      type {
                        name
                      }
                    }
                    value
                  }
                }
              }
            }
          }
        }
      `,
      variables() {
        return {
          locale: locale(this),
          sku: this.sku,
          preview:
            this.$route.query.preview === 'true' || false,
        };
      },
    },
  },
};
