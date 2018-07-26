<template>
  <div>
    <ol class="breadcrumb">
      <li>
        <router-link to="/">
          {{ $t('main.home') }}
        </router-link>
      </li>

      <li v-for="ancestor in category.ancestors" :key="ancestor.id">
        <router-link :to="{ name: 'products', params: { categorySlug: ancestor.slug } }">
          {{ ancestor.name }}
        </router-link>
      </li>

      <li class="active">
        <router-link :to="{ name: 'products', params: { categorySlug: category.slug } }"
                    class="active">
          {{ category.name }}
        </router-link>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category: {
        name: 'Jacken',
        slug: 'jacket',
        ancestors: [
          {
            name: 'Women',
            slug: 'women',
          },
          {
            name: 'Clothing',
            slug: 'clothing',
          },
        ],
      },
    };
  },
};
</script>
