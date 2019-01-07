<template>
  <div class="modal fade" id="quickview-modal" tabindex="-1" role="dialog" aria-labelledby="quickviewModal">
    <div class="modal-dialog modal-dialog-quickview" role="document">
      <div class="modal-content quickview-modal">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" :aria-label='$t("main.close")'>
          <span aria-hidden="true">
            <img src="../../assets/img/close.png" :alt='$t("main:close")' />
          </span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row product-info-row-pdp">
            <div class="col-sm-4">
              <div class="bzoom_wrap">
                <ul class="bzoom">
                  <!--{{#each thumbnail.product.gallery.list}}-->
                  <!--<li class="gallery-image">-->
                    <!--<img class="bzoom_thumb_image" src="{{thumbImage}}"/>-->
                    <!--<img class="bzoom_big_image" src="{{bigImage}}"/>-->
                  <!--</li>-->
                  <!--{{/each}}-->
                </ul>
              </div>
            </div>
            <div class="col-sm-6 col-sm-offset-2 product-description">
              <div class="row">
                <div class="col-sm-12">
                  <!--{{> catalog/product-name}}-->
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12">
                  <!--{{> catalog/product-rating}}-->
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12">
                  <!--{{> catalog/product-price}}-->
                </div>
              </div>
              <div class="row select-row">
                <!--{{> catalog/add-to-cart}}-->
              </div>
              <div class="quickview-wishlist-row">
                <ul class="list-inline">
                  <!--<li {{#if wishlist}}class="hidden"{{/if}}>-->
                  <!--{{> catalog/add-to-wishlist-btn}}-->
                  <!--</li>-->
                  <li>
                    <!--{{> catalog/product-availability availability=product.availability}}-->
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>

</style>
