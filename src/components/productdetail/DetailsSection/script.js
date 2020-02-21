import gql from 'graphql-tag';
import { locale } from '../../common/shared';

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
    productAttributes() {
      const { attributes } = this.product.masterData.current.variant;
      delete attributes.__typename;
      return Object.values(attributes).filter(attribute => attribute);
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
  },
  apollo: {
    product: {
      query: gql`
        query ProductDetailsSection($locale: Locale!, $sku: String!) {
          product(sku: $sku) {
            id
            masterData {
              current {
                variant(sku: $sku) {
                  attributes {
                    ...on mainProductType {
                      designer {
                        label
                        key
                        name
                      }
                      colorFreeDefinition {
                        value(locale: $locale)
                        name
                      }
                      size {
                        value
                        name
                      }
                      style {
                        key
                        label
                        name
                      }
                      gender {
                        key
                        label
                        name
                      }
                      articleNumberManufacturer {
                        name
                        value
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
          locale: locale(this),
          sku: this.sku,
        };
      },
    },
  },
};
