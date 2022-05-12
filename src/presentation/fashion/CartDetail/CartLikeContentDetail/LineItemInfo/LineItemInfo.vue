<style src="./LineItemInfo.scss" lang="scss"></style>
<script src="./LineItemInfo.js"></script>
<i18n src="./LineItemInfo.txt" lang="yaml"></i18n>

<template>
  <tbody>
    <tr>
      <td v-if="editable" class="product-remove">
        <Remove :lineItemId="lineItem.lineId" />
      </td>
      <td v-if="selectable">
        <input
          v-model="selected"
          class="check"
          :value="lineItem.variant.sku"
          type="checkbox"
          data-test="line-item-checkbox"
        />
      </td>
      <td class="product-img">
        <router-link
          :to="productRoute(lineItem)"
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
          :to="productRoute(lineItem)"
          data-test="cart-line-item-link"
        >
          {{ lineItem.name }}
        </router-link>
        <b class="attributes">{{
          lineItemAttr(lineItem)
        }}</b>
        <span data-test="cart-line-item-sku">
          {{ lineItem.variant.sku }}
        </span>
      </td>
      <td
        v-if="!selectable && !returnedItem"
        class="product-price"
      >
        <span class="amount" data-test="item-price">
          <BasePrice :price="lineItem.price" />
          <span v-if="lineItem.price.discounted != null">
            <DiscountTag
              :name="
                lineItem?.price?.discounted?.discount?.name
              "
          /></span>
        </span>
      </td>
      <td class="cart-quality">
        <LineItemQuantityForm
          v-if="editable"
          :line-item-id="lineItem.lineId"
          :quantity="lineItem.quantity"
        />
        <div v-if="selectable">
          <div class="cart-plus-minus">
            <input
              v-model.number="quantity"
              class="cart-plus-minus-box"
              type="number"
            />
          </div>
        </div>
        <div
          class="quantity"
          v-if="!editable && !selectable"
        >
          <span>{{ lineItem.quantity }}</span>
        </div>
      </td>
      <td
        v-if="!selectable && !returnedItem"
        class="product-total"
        data-test="line-total"
      >
        <span>
          <BasePrice :price="total(lineItem)" />
        </span>
      </td>
      <td v-if="returnedItem">
        <span>{{ lineItem.paymentState }}</span>
      </td>
    </tr>
  </tbody>
</template>
