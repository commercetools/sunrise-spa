<template>
  <BaseFooter>
    <div class="footer">
      <div id="footer" class="container">
        <div class="row text-uppercase">
          <FooterLinks/>
          <FooterMarketing/>
        </div>
      </div>
    </div>
  </BaseFooter>
</template>

<script>
import BaseFooter from './BaseFooter.vue';
import FooterLinks from './FooterLinks.vue';
import FooterMarketing from './FooterMarketing.vue';

export default {
  components: {
    BaseFooter,
    FooterLinks,
    FooterMarketing,
  },
};
</script>
