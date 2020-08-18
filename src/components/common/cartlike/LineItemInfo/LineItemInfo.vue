<style src="./LineItemInfo.scss" lang="scss"></style>
<script src="./LineItemInfo.js"></script>
<i18n src="./LineItemInfo.txt"></i18n>

<template>
  <tbody>
    <tr>
      <td v-if="editable" class="product-remove">
        <LineItemDeleteForm :lineItemId="lineItem.id" />
      </td>
      <td class="product-img">
        <router-link
          :to="productRoute(lineItem.productSlug, lineItem.variant.sku)"
          class="img"
        >
          <img
            :src="displayedImageUrl(lineItem.variant)"
            :alt="lineItem.name"
          />
        </router-link>
      </td>
      <td class="product-name">
        <router-link
          :to="productRoute(lineItem.productSlug, lineItem.variant.sku)"
          data-test="cart-line-item-link"
          >{{ nameFromLineItem }}</router-link
        >
        <span
          data-test="cart-line-item-sku"
        >
          {{ lineItem.variant.sku }}
        </span>
      </td>
      <td class="product-price">
        <span
          class="amount"
          data-test="item-price"
        >
          <BasePrice :price="lineItem.price" />
        </span>
      </td>
      <td class="text-center cart-quality">
        <LineItemQuantityForm
          v-if="editable"
          :lineItemId="lineItem.id"
          :quantity="lineItem.quantity"
        />
        <span v-else>{{ lineItem.quantity }}</span>
      </td>
      <td
        class="product-total"
        data-test="line-total"
      >
        <span>
          <BasePrice :price="total" />
        </span>
      </td>
    </tr>
  </tbody>
</template>
