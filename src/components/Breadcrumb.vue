<template>
  <div>
    <ol v-if="active"
        class="breadcrumb">
      <li>
        <router-link to="/"
                     data-test="breadcrumb-home-link">
          {{ $t('home') }}
        </router-link>
      </li>
      <li v-for="ancestor in category.ancestors"
          :key="ancestor.id">
        <router-link :to="{ name: 'products', params: { categorySlug: ancestor.slug } }"
                     data-test="breadcrumb-ancestor-link">
          {{ ancestor.name }}
        </router-link>
      </li>

      <li class="active">
        <router-link :to="{ name: 'products', params: { categorySlug: category.slug } }"
                     data-test="breadcrumb-category-link"
                     class="active">
          {{ category.name }}
        </router-link>
      </li>
    </ol>
  </div>
</template>

<script>
import categoryMixin from '@/mixins/categoryMixin';

export default {
  props: ['categorySlug'],

  computed: {
    category() {
      return this.categoryBySlug(this.categorySlug);
    },

    active() {
      return this.category;
    },
  },

  mixins: [categoryMixin],
};
</script>

<!-- eslint-disable -->
<i18n>
{
  "en": {
    "home": "Home"
  },
  "de": {
    "home": "Home"
  }
}
</i18n>
