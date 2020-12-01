<style src="./LineItemInfo.scss" lang="scss"></style>
<script src="./LineItemInfo.js"></script>
<i18n src="./LineItemInfo.txt"></i18n>

<template>
  <tbody>
    <tr>
      <td
        v-if="editable"
        class="product-remove"
      >
        <LineItemDeleteForm :line-item-id="lineItem.id" />
      </td>
      <td v-if="selectable">
        <input
          v-model="selected"
          class="check"
          :value="lineItem.variant.sku"
          type="checkbox"
        >
      </td>
      <td class="product-img">
        <router-link
          :to="productRoute(lineItem.productSlug, lineItem.variant.sku)"
          class="img"
        >
          <img
            :src="displayedImageUrl(lineItem.variant)"
            :alt="lineItem.name"
          >
        </router-link>
      </td>
      <td class="product-name">
        <router-link
          :to="productRoute(lineItem.productSlug, lineItem.variant.sku)"
          data-test="cart-line-item-link"
        >
          {{ lineItem.name }}
        </router-link>
        <b class="attributes">{{ lineItemAttr }}</b>
        <span
          data-test="cart-line-item-sku"
        >
          {{ lineItem.variant.sku }}

        </span>
        <p v-if="subscription">
        Subscription -- Every {{ frequency }} Weeks </p>
      
      </td>
      <td
        v-if="!selectable"
        class="product-price"
      >
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
          :line-item-id="lineItem.id"
          :quantity="lineItem.quantity"
        />
        <div v-if="selectable">
          <div class="cart-plus-minus">
            <input
              v-model.number="item.quantity"
              class="cart-plus-minus-box"
              type="number"
            >
          </div>
        </div>
        <div class="quantity" v-if="!editable && !selectable">
          <span>{{ lineItem.quantity }}</span>
        </div>
        
      </td>
      <td
        v-if="!selectable"
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
