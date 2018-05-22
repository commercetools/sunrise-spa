<template>
  <div class="home">
    <img src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <ApolloExample/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import ApolloExample from '@/components/ApolloExample.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
    ApolloExample,
  },
};
</script>
