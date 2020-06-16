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
    attributeTranslation: null,
  }),
  computed: {
    productAttributes() {
      const selected = this.product.masterData.staged || this.product.masterData.current;
      const { attributes } = selected.variant;
      delete attributes.__typename;
      return Object.values(attributes).filter(attribute => attribute)
        .map(a => ({
          ...a,
          name: this.attributeTranslation?.get(a.name) || a.name,
        }));
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
        query ProductDetailsSection($locale: Locale!, $sku: String!, $preview: Boolean!) {
          product(sku: $sku) {
            id
            masterData {
              current @skip(if: $preview) {
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

              staged @include(if: $preview) {
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
