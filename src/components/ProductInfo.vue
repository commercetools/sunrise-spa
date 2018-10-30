<template>
  <div>
    <div class="col-md-4 col-md-offset-1 col-sm-6 product-gallery">
      <ProductGallery :productImages="images" />
    </div>
    <div class="col-sm-6 product-description">
      <div class="row">
        <div class="col-sm-12">
            <h1 class="text-uppercase pdp-product-title">
              {{currentProduct.name}}
            </h1>
            <span class="grey-p quickview-sku">
              {{matchingVariant.sku}}
            </span>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <!-- {{> catalog/product-rating }} -->
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <p class="pdp-product-description view-details more"
             data-text-show="$t('description.show')"
             data-text-hide="$t('description.hide')">
          </p>
        </div>
      </div>

      <div class="row">
        <div v-if="hasPrice" class="col-sm-12">
          <p class="product-price">
            <span v-if="hasDiscount">
              <span class="discounted-price">
                {{ formatPrice(originalPrice) }}
              </span>
              <span>
                {{ formatPrice(discountedPrice) }}
              </span>
            </span>

            <span v-else>
              {{ formatPrice(originalPrice) }}
            </span>
          </p>

        </div>
      </div>
      <!-- {{> catalog/add-to-cart}}
      {{> catalog/add-to-wishlist-btn}}
      {{> catalog/reserve-in-store-btn}} -->
      <button id="" class="add-to-bag-btn">
        <img class="bag-thumb"
             src="../assets/img/hand-bag-2-black.png"
             alt="$t('catalog.cart.add')">
        {{ $t('catalog.cart.add') }}
      </button>
      <div class="row">
        <div class="col-sm-12">
          <!-- {{> catalog/product-availability availability=product.availability}} -->
        </div>
      </div>

      <!-- toggles -->
      <div class="row">
        <div class="col-sm-12">
          <div class="panel-group panel-group-pdp"
               id="accordion-product-info"
               role="tablist"
               aria-multiselectable="true">
            <div class="panel panel-default"
                 @click="openAccordion">
              <div class="panel-heading"
                   role="tab"
                   id="headingProductDetails">
                  <h4 class="panel-title product-accordion-title text-uppercase">
                    <a id="pdp-product-details-toggle"
                       class="collapsed pdp-accord-toggle"
                       data-toggle="collapse"
                       data-parent="#accordion-product-info"
                       href="#collapseProductDetails"
                       aria-expanded="false"
                       aria-controls="collapseProductDetails">
                      {{ $t('details.title') }}
                      <img class="accordion-plus"
                           src="../assets/img/plus79.png"
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
                        :key="attribute.name">
                      <span v-if="attribute.name">
                        {{attribute.name}}:
                      </span>
                      {{attribute.label || attribute.value}}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="panel panel-default">
              <div class="panel-heading" role="tab" id="headingDelivery">
                <h4 class="panel-title product-accordion-title text-uppercase">
                  <a id="pdp-delivery-returns-toggle"
                     class="collapsed pdp-accord-toggle"
                     data-toggle="collapse"
                     data-parent="#accordion-product-info"
                     href="#collapseDelivery"
                     aria-expanded="false true"
                     aria-controls="collapseDelivery">
                  {{ $t('delivery.title') }}
                    <img class="accordion-plus"
                         src="../assets/img/plus79.png"
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

                    <li>{{ $t('delivery.freeReturns') }}</li>
                    <li>{{ $t('delivery.moreDeliveryInfo') }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Social media icons-->
      <div class="row">
        <div class="col-sm-12">
          <div class="social-share">
            <ul class="social-icons pdp-social-icons">
              <a href="">
                <li>
                  <img class="social-icon"
                       src="../assets/img/Facebook.png"
                       alt="facebook">
                </li>
              </a>
              <a href="">
                <li>
                  <img class="social-icon"
                       src="../assets/img/Pinterest.png"
                       alt="pinterest">
                </li>
              </a>
              <a href="">
                <li>
                  <img class="social-icon"
                       src="../assets/img/Google.png"
                       alt="google plus">
                </li>
              </a>
            </ul>
            <ul class="social-icons">
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import priceMixin from '@/mixins/priceMixin';
import ProductGallery from '@/components/ProductGallery.vue';

export default {
  components: {
    ProductGallery,
  },

  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  methods: {
    openAccordion(e) {
      console.log(e);
      const pdpAccordion = $('.pdp-accord-toggle');
      const contextPanelGroup = pdpAccordion.parents('.panel-group-pdp');
      const context = $(this);
      const contextPanel = context.parents('.panel-default');
      const contextButton = $('.accordion-plus', contextPanel);

      contextButton.toggleClass('accordion-minus');

      // Remove minus class on all other buttons
      contextPanelGroup.find('.accordion-plus').not(contextButton).removeClass('accordion-minus');
    },
  },

  computed: {
    currentProduct() {
      return this.product.masterData.current;
    },

    matchingVariant() {
      return this.currentProduct.variant;
    },

    hasPrice() {
      return this.matchingVariant.price;
    },

    originalPrice() {
      return this.matchingVariant.price.value;
    },

    hasDiscount() {
      return this.matchingVariant.price.discounted;
    },

    discountedPrice() {
      return this.matchingVariant.price.discounted.value;
    },

    images() {
      return this.matchingVariant.images;
    },
    productAttributes() {
      return this.product.masterData.current.variant.attributes;
    },
  },
  mixins: [priceMixin],
};
</script>

<!-- eslint-disable -->
<i18n>
{
  "de": {
    "description": {
      "show": "Mehr",
      "hide": "Weniger"
    },
    "details": {
      "title": "Produktdetails"
    },
    "delivery": {
      "title": "Versand & Retoure",
      "freeReturns": "Kostenlose Retoure",
      "moreDeliveryInfo": "Versandinformationen"
    }
  },
  "en": {
    "description": {
      "show": "Show more",
      "hide": "Show less"
    },
    "details": {
      "title": "Product Details"
    },
    "delivery": {
      "title": "Delivery & Returns",
      "freeReturns": "Free return for all orders.",
      "moreDeliveryInfo": " "
    }
  }
}
</i18n>
