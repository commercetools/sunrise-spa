<template>
  <div class="apollo-example">
    <!-- Cute tiny form -->
    <div class="form">
      <input
              v-model="sku"
              placeholder="Type a SKU"
              class="input"
      >
    </div>

    <!-- Apollo watched Graphql query -->
    <ApolloQuery
      :query="require('../graphql/HelloWorld.gql')"
      :variables="{ sku }"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occured</div>

        <!-- Result -->
        <div v-else-if="data.product" class="result apollo">
          {{ data.product.masterData.current.name }}
        </div>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sku: 'A0E20000000279V',
    };
  },
};
</script>

<style scoped>
.apollo {
  padding: 12px;
}

.error {
  color: red;
}
</style>
