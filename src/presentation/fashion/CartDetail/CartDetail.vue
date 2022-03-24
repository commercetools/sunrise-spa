<style src="./CartDetail.scss" lang="scss"></style>
<i18n src="./CartDetail.txt" lang="yaml"></i18n>
<script src="./CartDetail.js"></script>

<template>
  <div>
    <div
      v-if="cartNotEmpty(cart)"
      class="breadcrumb-area bg-gray"
    >
      <div class="container-fluid">
        <div class="breadcrumb-content text-center">
          <div class="breadcrumb-title">
            <h2>{{ t('yourCart') }}</h2>
          </div>
          <ul>
            <li>
              <router-link to="/">Home</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Spinner v-if="loading" />
    <div
      class="cart-main-area pt-50 pb-100"
      v-else-if="cartNotEmpty(cart)"
    >
      <div class="container-fluid pl-50 pr-50">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12 col-12">
            <form>
              <div class="row">
                <div class="col-lg-8">
                  <CartLikeContentDetail
                    :cart="cart"
                    :editable="true"
                  />
                  <div class="cart-shiping-update-wrapper">
                    <AddDiscountCodeForm />
                  </div>
                </div>
                <div class="col-lg-4">
                  <CartLikePriceDetail
                    :cart="cart"
                    :editable="true"
                    class="total-price-calc"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="!cartNotEmpty(cart)"
      class="empty-area mt-50 border-top-2 pt-120 pb-120"
    >
      <div class="container">
        <div
          class="empty-content text-center"
          data-test="empty-cart"
        >
          <h2>{{ t('yourCart') }}</h2>
          <p>{{ t('empty') }}</p>
          <router-link to="/">{{
            t('continueShopping')
          }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
