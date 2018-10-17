<template>
<div class="panel panel-default">
  <div class="panel-heading" role="tab" id="headingDelivery">
    <h4 class="panel-title product-accordion-title text-uppercase">
      <a id="pdp-delivery-returns-toggle"
         class="collapsed pdp-accord-toggle"
         data-toggle="collapse"
         data-parent="#accordion-product-info"
         href="#collapseDelivery"
         aria-expanded="false"
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
</template>

<script>
export default {

};
</script>


<!-- eslint-disable -->
<i18n>
{
  "en": {
    "delivery": {
      "title": "Delivery & Returns",
      "freeReturns": "Free return for all orders.",
      "moreDeliveryInfo": " "
    }
  },
  "de": {
    "delivery": {
      "title": "Versand & Retoure",
      "freeReturns": "Kostenlose Retoure",
      "moreDeliveryInfo": "Versandinformationen"
    }
  }
}
</i18n>
