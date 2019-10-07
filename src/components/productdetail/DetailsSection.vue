<template>
  <div v-if="product"
       class="row">
    <div class="col-sm-12">
      <div data-test="panel-group-pdp"
           class="panel-group panel-group-pdp"
           id="accordion-product-info"
           role="tablist"
           aria-multiselectable="true">
        <div class="panel panel-default">
          <div class="panel-heading"
               role="tab"
               id="headingProductDetails">
            <h4 class="panel-title product-accordion-title text-uppercase">
              <a data-test="product-attributes-accordion"
                 id="pdp-product-details-toggle"
                 class="collapsed pdp-accord-toggle"
                 data-toggle="collapse"
                 data-parent="#accordion-product-info"
                 href="#collapseProductDetails"
                 aria-expanded="false"
                 aria-controls="collapseProductDetails"
                 @click="openAccordion">
                {{ $t('productDetails') }}
                <img class="accordion-plus"
                     src="../../assets/img/plus79.png"
                     alt="accordion content">
              </a>
            </h4>
          </div>
          <div id="collapseProductDetails"
               class="panel-collapse collapse"
               role="tabpanel"
               aria-labelledby="headingProductDetails">
            <div class="panel-body panel-body-pdp">
              <ul class="product-features-list">
                <li v-for="attribute in productAttributes"
                    data-test="product-attributes-list"
                    :key="attribute.name">
                  <span class="attribute-name">
                    {{ attribute.name }}:
                  </span>
                  <span>
                    {{ attribute.label || attribute.value }}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="panel panel-default">
          <div class="panel-heading"
               role="tab"
               id="headingDelivery">
            <h4 class="panel-title product-accordion-title text-uppercase">
              <a id="pdp-delivery-returns-toggle"
                 class="collapsed pdp-accord-toggle"
                 data-toggle="collapse"
                 data-parent="#accordion-product-info"
                 href="#collapseDelivery"
                 aria-expanded="false true"
                 aria-controls="collapseDelivery"
                 @click="openAccordion">
                {{ $t('deliveryReturns') }}
                <img class="accordion-plus"
                     src="../../assets/img/plus79.png"
                     alt="accordion content" />
              </a>
            </h4>
          </div>
          <div id="collapseDelivery"
               class="panel-collapse collapse"
               role="tabpanel"
               aria-labelledby="headingDelivery">
            <div class="panel-body panel-body-pdp">
              <ul class="product-delivery-list">

                <!-- {{#each deliveryRates.list}}
                <li>
                  <span>{{name}}:</span> {{price}}{{#if freeAbove}} (FREE for orders above {{freeAbove}}){{/if}}
                  {{#if description}}. {{description}}.{{/if}}
                </li>
                {{/each}} -->

                <li>{{ $t('freeReturns') }}</li>
                <li>{{ $t('moreDeliveryInfo') }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
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
          locale: this.$store.state.locale,
          sku: this.sku,
        };
      },
    },
  },
};
</script>

<i18n>
de:
  productDetails: "Produktdetails"
  deliveryReturns: "Versand & Retoure"
  freeReturns: "Kostenlose Retoure."
  moreDeliveryInfo: "Versandinformationen"
en:
  productDetails: "Product Details"
  deliveryReturns: "Delivery & Returns"
  freeReturns: "Free return for all orders."
  moreDeliveryInfo: "Delivery information"
</i18n>
