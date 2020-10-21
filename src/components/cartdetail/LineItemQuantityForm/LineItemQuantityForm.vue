<style src="./LineItemQuantityForm.scss" lang="scss"></style>
<script src="./LineItemQuantityForm.js"></script>

<template>
  <div class="quickview-quality quality-height-dec2">
    <div class="cart-plus-minus">
      <div @click="decrement" class="dec qtybutton">-</div>
      <input
        class="cart-plus-minus-box"
        type="text"
        name="qtybutton"
        v-model.number="lineItem.quantity"
      />
      <div @click="increment" class="inc qtybutton">+</div>
    </div>
  </div>
</template>
