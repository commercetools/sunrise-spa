<style src="./LineItemInfo.scss" lang="scss"></style>
<script src="./LineItemInfo.js"></script>
<i18n src="./LineItemInfo.txt"></i18n>

<template>
  <tbody>
    <tr>
      <td v-if="editable" class="product-remove">
        <LineItemDeleteForm :lineItemId="lineItem.id" />
      </td>
      <td v-if="selectable">
        <input class="check" :value="lineItem.variant.sku" type="checkbox" v-model="selected">
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
      <td v-if="!selectable" class="product-price">
        <span
          class="amount"
          data-test="item-price"
        >
          <BasePrice :price="lineItem.price" />
        </span>
      </td>
      <td class="cart-quality">
        <LineItemQuantityForm
          v-if="editable"
          :lineItemId="lineItem.id"
          :quantity="lineItem.quantity"
        />
        <div v-if="selectable">
          <div class="cart-plus-minus">
            <input
              class="cart-plus-minus-box"
              type="number"
              v-model.number="item.quantity"
            />
          </div>
        </div>
        <span v-else>{{ lineItem.quantity }}</span>
      </td>
      <td v-if="!selectable"
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
