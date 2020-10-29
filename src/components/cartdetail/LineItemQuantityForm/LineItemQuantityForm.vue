<style src="./LineItemQuantityForm.scss" lang="scss"></style>
<script src="./LineItemQuantityForm.js"></script>

<template>
  <div class="quickview-quality quality-height-dec2">
    <div class="cart-plus-minus">
      <div @click="decrement" class="dec qtybutton">-</div>
      <input
        class="cart-plus-minus-box"
        type="number"
        name="qtybutton"
        v-model.number="form.quantity"
        data-test="cart-line-item-quantity"
      />
      <div @click="increment" class="inc qtybutton">+</div>
    </div>
  </div>
</template>
