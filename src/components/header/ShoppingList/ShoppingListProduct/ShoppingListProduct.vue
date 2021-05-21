<script src="./ShoppingListProduct.js"></script>

<template>
  <div v-if="masterVariant">
    <div class="cart-img">
      <router-link
        :to="
          productRoute(masterVariant.slug, masterVariant.sku)
        "
      >
        <img
          :src="displayedImageUrl(masterVariant)"
          :alt="masterVariant.name"
        />
      </router-link>
    </div>
    <div class="cart-title">
      <h4>
        <router-link
          :to="
            productRoute(masterVariant.slug, masterVariant.sku)
          "
          data-test="shopping-list-item-link"
        >
          {{ masterVariant.name }}
        </router-link>
      </h4>
      <span
        data-test="shopping-list-item-quantity"
      >
        {{ quantity }} ×
      </span>
    </div>
  </div>
</template>
