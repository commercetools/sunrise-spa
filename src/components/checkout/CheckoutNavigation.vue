<template>
  <div class="row checkout-navigation-buttons">
    <div class="col-sm-6 col-xs-6">
      <div>
        <button @click="goBack"
                type="button"
                class="btn-grey text-uppercase back-button">
          {{ $t('back') }}
        </button>
      </div>
    </div>
    <div class="col-sm-6 col-xs-6">
      <div>
        <LoadingButton :state="state"
                       id="shipping-continue-checkout-btn-xs"
                       class="btn text-uppercase next-button">
          {{ $t('continue') }}
        </LoadingButton>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingButton from '../common/form/LoadingButton.vue';

export default {
  components: { LoadingButton },

  props: ['state'],

  methods: {
    goBack() {
      this.$emit('back');
    },
  },
};
</script>

<style lang="scss" scoped>
.checkout-navigation-buttons {
  margin-top: 2em;
  margin-bottom: 1em;

  .next-button, .back-button {
    border: 2px solid;
    width: 100%;
    padding: 10px 20px;
    font-size: 1.2em;
  }

  .next-button {
    background: url('../../assets/img/arrow-66.png') no-repeat 95% 13px #FFBA27;
    background-size: 15px;
    border-color: #FFBA27;
    /*padding: 0.5em 0;*/
    &:hover {
      background: url('../../assets/img/arrow-66.png') no-repeat 95% 13px lighten(#FFBA27, 5%);
      background-size: 15px;
    }
  }

  .back-button {
    color: #222;
    border-color: #DDD;
    background: url('../../assets/img/arrow-67-black.png') no-repeat 10% 50%;
    background-size: 15px;
    &:hover {
      opacity: 0.6;
      color: inherit;
      border-color: #666;
    }
  }
}
</style>
