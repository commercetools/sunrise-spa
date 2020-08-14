<script src="./ProductQuickView.js"></script>

<template>
  <div>
    <modal
      name="quickView"
      width="90%"
      height="70%"
      @closed="openModal = false"
    >
      <div class="modal-body">
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span class="dl-icon-close"></span>
        </button>
        <div class="row no-gutters">
          <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <div class="quickview-slider-active owl-carousel">
              <img src="assets/images/product/quickview-1.jpg" alt="" />
              <img src="assets/images/product/quickview-2.jpg" alt="" />
            </div>
            <!-- Thumbnail Large Image End -->
          </div>
          <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <div class="product-details-content">
              <h2>Detachable belt dress</h2>
              <h3>$29.00</h3>
              <div class="product-dec-peragraph">
                <p>
                  Linen and cotton mix. Straight design. Classic collar.
                  Sleeveless. Removable belt at the waist. Two patch pockets on
                  the front. Button fastening on the front section.
                </p>
              </div>
              <div class="product-dec-action-wrap">
                <div class="quality-cart-wrap">
                  <div class="quality-wrap">
                    <input
                      class="input-text qty"
                      type="text"
                      name="qty"
                      maxlength="12"
                      value="1"
                      title="Qty"
                    />
                  </div>
                  <div class="pro-cart-wrap">
                    <a href="#">Add to cart</a>
                  </div>
                </div>
                <div class="pro-dec-wishlist-compare">
                  <a title="Add to wishlist" href="#"
                    ><i class="dl-icon-heart2"></i
                  ></a>
                  <a title="Add to compare" href="#"
                    ><i class="dl-icon-compare2"></i
                  ></a>
                </div>
              </div>
              <div class="store-delivery-wrap">
                <a href="#"
                  ><i class="fa fa-map-marker"></i>Find store near you</a
                >
                <a href="#"
                  ><i class="fa fa-exchange"></i>Delivery and return</a
                >
              </div>
              <div class="product-dec-meta">
                <span>Categories: <a href="#">Women</a></span>
                <span
                  >Tags: <a href="#">Fashion</a>, <a href="#">Lookbook</a></span
                >
              </div>
              <div class="product-social">
                <span>Share with</span>
                <ul>
                  <li>
                    <a class="facebook" href="#"
                      ><i class="fa fa-facebook"></i
                    ></a>
                  </li>
                  <li>
                    <a class="twitter" href="#"
                      ><i class="fa fa-twitter"></i
                    ></a>
                  </li>
                  <li>
                    <a class="youtube" href="#"
                      ><i class="fa fa-pinterest-p"></i
                    ></a>
                  </li>
                  <li>
                    <a class="dribbble" href="#"
                      ><i class="fa fa-google-plus"></i
                    ></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
