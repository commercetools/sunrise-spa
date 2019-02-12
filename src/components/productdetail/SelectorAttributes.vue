<template>
<ul class="list-inline">
  <li v-for="variant in productVariants"
      :key="variant.name">
    <p v-if="variant.name"
       class="text-uppercase">
      {{ variant.name }}
    </p>

    <div>
      <select class="select-product-detail">
        <option>
          {{ variant.value || variant.label }}
        </option>
      </select>
    </div>
    <!-- {{> common/required-error-message}} -->
  </li>

  <li class="size-guide-li">
    <!-- {{> catalog/size-guide}} -->
  </li>
</ul>
</template>

<script>
export default {
  props: {
    productVariants: {
      type: Object,
      required: true,
    },
  },
};
</script>
