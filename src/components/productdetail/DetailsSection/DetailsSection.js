import gql from 'graphql-tag';
import { locale, getValue } from '../../common/shared';

export default {
  props: {
    sku: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    product: null,
    expanded: [true, false],
  }),
  computed: {
    productAttributes() {
      const selected = this.product.masterData.staged || this.product.masterData.current;
      const { attributesRaw } = (selected?.allVariants?.[0] || []);
      return attributesRaw.map(
        ({ attributeDefinition: { label, type }, value }) => ({
          name: label,
          value: getValue(type.name, value, locale(this)),
        }),
      );
    },
  },
  methods: {
    openAccordion(e) {
      const contextPanelGroup = $('.pdp-accord-toggle').parents('.panel-group-pdp');
      const contextPanel = $(e.target).parents('.panel-default');
      const contextButton = $('.accordion-plus', contextPanel);
      contextButton.toggleClass('accordion-minus');
      // Remove minus class on all other buttons
      contextPanelGroup.find('.accordion-plus').not(contextButton).removeClass('accordion-minus');
    },
    toggle(index) {
      const copy = [...this.expanded];
      copy[index] = !copy[index];
      this.expanded = copy;
    },
  },
  apollo: {
    product: {
      query: gql`
        query ProductDetailsSection($locale: Locale!, $sku: String!, $preview: Boolean!) {
          product(sku: $sku) {
            id
            masterData {
              current @skip(if: $preview) {
                allVariants(skus:[$sku]) {
                  sku
                  attributesRaw {
                    attributeDefinition {
                      name
                      label(locale:$locale)
                      type {
                        name
                      }
                    }
                    value
                  }
                }
              }
              staged @include(if: $preview) {
                allVariants(skus:[$sku]) {
                  sku
                    attributesRaw {
                      attributeDefinition {
                        name
                        label(locale:$locale)
                      }
                      value
                    }
                  }
              }
            }
          }
        }`,
      variables() {
        return {
          locale: locale(this),
          sku: this.sku,
          preview: this.$route.query.preview === 'true' || false,
        };
      },
    },
  },
};
