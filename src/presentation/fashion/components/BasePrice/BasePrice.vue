<style src="./style.css" scoped></style>
<script src="./BasePrice.js"></script>

<template>
  <span>
    <span v-if="!hasDiscount">
      <BaseMoney :money="originalPrice" />
    </span>
    <span v-else>
      <span data-test="price-old-value" class="old-price">
        <BaseMoney :money="originalPrice" />
      </span>
      <span data-test="price-new-value" class="new-price">
        <BaseMoney :money="discountedPrice" />
      </span>
    </span>
  </span>
</template>
