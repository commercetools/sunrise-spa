<i18n src="./ShoppingList.txt"></i18n>
<script src="./ShoppingList.js"></script>

<template>
  <span>
    <div
      class="sidebar-cart-active"
      :class="{ inside: show }"
      data-test="shopping-list-content"
    >
      <div class="sidebar-cart-all">
        <a
          class="cart-close"
          href="javascript:;"
          @click="close"
          data-test="shopping-list-close-button"
        >
          <i class="dl-icon-close"></i>
        </a>
        <div class="cart-content">
          <h3>{{ $t('shoppingList') }} </h3>
          <span v-if="listNotEmpty">
            <ul>
              <li
                v-for="lineItem in lineItems"
                :key="lineItem.id"
                data-test="shopping-list-line-item"
                class="single-product-cart"
              >
                <ShoppingListProduct 
                  :id="lineItem.productId" 
                  :quantity="lineItem.quantity"
                />
                <div class="cart-delete">
                  <a
                    href="javascript:;"
                    @click="()=>removeItem(lineItem.id)"
                    data-test="shopping-list-item-delete"
                    class="edit-delete-section"
                  >
                    <i class="fa fa-trash-o"></i>
                  </a>
                </div>
              </li>
            </ul>
            <!-- <div class="cart-checkout-btn">
              <router-link
                :to="{ name: 'checkout' }"
                data-test="checkout-button"
                @click="close"
                >{{ $t('checkout') }}</router-link
              >
            </div> -->
          </span>
          <span v-if="!listNotEmpty">
            <h5>{{ $t('emptyList') }}</h5>
          </span>
        </div>
      </div>
    </div>
  </span>
</template>
