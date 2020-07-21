import gql from 'graphql-tag';
import AttributeSelect from '../AttributeSelect/AttributeSelect.vue';
import { getValue, locale } from '../../common/shared';
import config from '../../../../sunrise.config';

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
  computed: {
    attributes() {
      const { allVariants } = this.product.masterData.staged
        || this.product.masterData.current;
      const attributes = allVariants
        .map(({ attributesRaw }) => attributesRaw.map(
          ({
            attributeDefinition: { name, label, type },
            value,
          }) => ({
            id: name,
            label,
            value:
                getValue(type.name, value, locale(this)),
          }),
        ))
        .flat()
        .filter(({ id }) => config.variantSelector.includes(id));
      const translations = attributes.reduce(
        (result, { id, label }) => result.set(id, label), new Map(),
      );
      return [...config.variantSelector.reduce(
        (result, key) => result.set(translations.get(key),
          [
            key,
            [...new Set(attributes
              .filter(({ id }) => id === key)
              .map(({ value }) => value)),
            ]]),
        new Map(),
      ).entries()]
        .filter(([, [, values]]) => values.length > 1)
        .map(([name, [id, values]]) => [name, id, values]);
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
