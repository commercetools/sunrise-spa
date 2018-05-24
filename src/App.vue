<template>
  <div id="app">
    <Header/>
    <Home/>
    <Footer/>
  </div>
</template>

<script>
import Header from '@/components/PageHeader.vue';
import Home from '@/views/Home.vue';
import Footer from '@/components/PageFooter.vue';

export default {
  name: 'app',
  components: {
    Header,
    Home,
    Footer,
  },
};
</script>
