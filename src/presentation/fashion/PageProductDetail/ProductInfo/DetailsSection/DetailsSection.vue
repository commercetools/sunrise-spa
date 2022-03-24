<style src="./DetailsSection.scss" lang="scss" scoped></style>
<i18n src="./DetailsSection.txt" lang="yaml"></i18n>
<script src="./DetailsSection.js"></script>

<template>
  <div
    class="description-review-wrapper"
    v-if="currentVariant"
  >
    <div class="panel-group" id="accordion1">
      <div class="panel pro-dec-accordion">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a
              href="#"
              @click.prevent="toggle(0)"
              :class="{ collapsed: !expanded[0] }"
              data-test="product-attributes-accordion"
            >
              {{ t('productDetails') }}
            </a>
          </h4>
        </div>
        <div
          data-parent="#accordion1"
          id="pro-dec-accordion1"
          class="
            product-description-wrapper
            panel-collapse
            collapse
          "
          :class="{ show: expanded[0] }"
        >
          <div class="panel-body">
            <ul class="product-features-list">
              <li
                v-for="attribute in attributes"
                data-test="product-attributes-list"
                :key="attribute.name"
              >
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
      <div class="panel pro-dec-accordion">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a
              href="#"
              @click.prevent="toggle(1)"
              :class="{ collapsed: !expanded[1] }"
            >
              {{ t('deliveryReturns') }}
            </a>
          </h4>
        </div>
        <div
          data-parent="#accordion1"
          id="pro-dec-accordion2"
          class="
            product-description-wrapper
            panel-collapse
            collapse
          "
          :class="{ show: expanded[1] }"
        >
          <div class="panel-body">
            <ul class="product-delivery-list">
              <li>{{ t('freeReturns') }}</li>
              <li>{{ t('moreDeliveryInfo') }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
