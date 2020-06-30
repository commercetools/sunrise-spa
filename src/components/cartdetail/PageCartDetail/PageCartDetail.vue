<style src="./PageCartDetail.scss" lang="scss"></style>
<i18n src="./PageCartDetail.txt"></i18n>
<script src="./PageCartDetail.js"></script>

<template>
  <div>
    <div class="breadcrumb-area bg-gray mt-120">
      <div class="container-fluid">
        <div class="breadcrumb-content text-center">
          <div class="breadcrumb-title">
            <h2>{{$t('yourBag')}}</h2>
          </div>
          <ul>
            <li>
              <router-link to="/">Home</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <LoadingSpinner v-if="isLoading" />
    <div class="cart-main-area pt-50 pb-100" v-else-if="cartNotEmpty">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12 col-12">
            <form>
              <div class="row">
                <div class="col-lg-8">
                  <CartLikeContentDetail :cartLike="me.activeCart" :editable="true" />
                  <div class="cart-shiping-update-wrapper">
                    <AddDiscountCodeForm />
                  </div>
                </div>
                <div class="col-lg-4">
                  <CartLikePriceDetail
                    :cartLike="me.activeCart"
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
  </div>

  <!-- <LoadingSpinner v-if="isLoading"/>
    <div v-else-if="cartNotEmpty">
      <div class="row">
        <div class="col-sm-12">
          <div class="current-in-bag">
            <span>
              <img class="bag-icon-lg" src="../../../assets/img/hand-bag-2-black.png" alt="bag icon">
            </span>
            <span class="text-uppercase your-bag-txt">{{ $t('yourBag') }}: </span>
            <span class="items-total-txt"
                  data-test="cart-total-items">
              {{ $tc('itemsTotal', totalItems) }}
            </span>
          </div>
          <div class="cart-content">
            <CartLikeContentDetail :cartLike="me.activeCart"
                                   :editable="true"/>
            <AddDiscountCodeForm/>
            <CartLikePriceDetail :cartLike="me.activeCart"
                                 :editable="true"
                                 class="total-price-calc"/>
          </div>
        </div>
      </div>
      <div class="row bottom-cart-btns">
        <div class="col-sm-6">
          <router-link to="/"
                       class="text-uppercase continue-shopping-btn">
            {{ $t('continueShopping') }}
          </router-link>
        </div>
        <div class="col-sm-6">
          <div class="checkout-now checkout-now-bottom">
            <router-link :to="{ name: 'checkout'}"
                         class="pull-right text-uppercase checkout-now-btn"
                         data-test="checkout-button">
              {{ $t('startCheckout') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-else
         class="empty-results-container">
      <div class="empty-results">
        <span data-test="empty-cart">
          {{ $t('empty') }}
        </span>
      </div>
      <div class="empty-cart-continue-shopping-btn">
        <router-link to="/">
          {{ $t('shopNow') }}
        </router-link>
      </div>
    </div>
  -->
</template>
