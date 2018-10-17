<template>
<div class="panel panel-default">
  <div class="panel-heading" role="tab" id="headingProductDetails">
    <h4 class="panel-title product-accordion-title text-uppercase">
      <a id="pdp-product-details-toggle" class="collapsed pdp-accord-toggle"
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
        <!-- {{#each product.details.features}}
        <li><span>{{name}}:</span> {{value}}</li>
        {{/each}} -->
      </ul>
      <ul class="product-details-list">
        <!-- {{#each product.details.list}}
        <li>{{text}}</li>
        {{/each}} -->
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
    "details": {
      "title": "Product Details"
    }
  },
  "de": {
    "details": {
      "title": "Produktdetails"
    }
  }
}
</i18n>
