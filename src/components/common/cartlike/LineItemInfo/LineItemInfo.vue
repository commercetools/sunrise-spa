<style src="./LineItemInfo.scss" lang="scss"></style>
<script src="./LineItemInfo.js"></script>
<i18n src="./LineItemInfo.txt"></i18n>

<template>
  <tbody>
    <tr>
      <td class="product-remove">
        <LineItemDeleteForm :lineItemId="lineItem.id" />
      </td>
      <td class="product-img">
        <router-link :to="productRoute(lineItem.productSlug, lineItem.variant.sku)" class="img">
          <img :src="displayedImageUrl(lineItem.variant)" :alt="lineItem.name" />
        </router-link>
      </td>
      <td class="product-name">
        <router-link
          :to="productRoute(lineItem.productSlug, lineItem.variant.sku)"
          data-test="cart-line-item-link"
        >{{ lineItem.name }}</router-link>
      </td>
      <td class="product-price">
        <span class="amount">
          <BaseMoney :money="lineItem.price.value" />
        </span>
      </td>
      <td class="cart-quality">
        <LineItemQuantityForm :lineItemId="lineItem.id" :quantity="lineItem.quantity" />
      </td>
      <td class="product-total">
        <span>
          <BaseMoney :money="lineItem.totalPrice" />
        </span>
      </td>
    </tr>
  </tbody>
</template>
