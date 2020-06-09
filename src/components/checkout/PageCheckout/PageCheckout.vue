<style src="./PageCheckout.scss" lang="scss"></style>
<script src="./PageCheckout.js"></script>

<template>
  <div id="checkout">
    <div class="container">
      <CheckoutTitle/>
      <div class="row">
        <div class="col-sm-12">
          <div class="checkout-content">
            <router-view/>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
