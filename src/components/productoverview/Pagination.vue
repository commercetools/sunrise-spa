<template>
  <div>
    <paginate name="products"
              :list="products.results">
    </paginate>
    <paginate-links for="products"
                    :hide-single-page="true"
                    @change="pageChanged"
                    :simple="{ next: 'Next »', prev: '« Back'}">
    </paginate-links>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Object,
      required: true,
    },
    offset: {
      type: Number,
      required: true,
    },
  },

  data: () => ({
    paginate: ['products'],
  }),

  methods: {
    pageChanged(pageNumber) {
      this.$emit('page-changed', pageNumber);
    },
  },
};
</script>

<style>

</style>
