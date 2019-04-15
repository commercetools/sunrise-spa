<template>
  <div class="row">
    <div class="col-sm-offset-9 col-sm-3">
      <ServerError :error="serverError">
        <template slot-scope="{ graphQLError }">
          {{ getErrorMessage(graphQLError) }}
        </template>
      </ServerError>
    </div>
    <div class="col-sm-12">
      <form @submit.prevent="submit" class="text-right promotion-info">
        <span class="text-uppercase promo-info-text">
          {{ $t('promoInfo') }}
          <img src="../../assets/img/information.png"
               class="info-icon"
               alt="information icon">
        </span>
        <input id="promo-code" type="text" name="code" v-model="code"
               data-test="discount-code-input">
        <LoadingButton :buttonState="buttonState"
                       data-test="apply-discount-code-button">
          {{ $t('apply') }}
        </LoadingButton>
      </form>
    </div>
  </div>
</template>

<script>
import LoadingButton from './LoadingButton.vue';
import ServerError from './ServerError.vue';

export default {
  components: { LoadingButton, ServerError },

  props: ['buttonState', 'serverError'],

  data: () => ({
    code: null,
  }),

  methods: {
    submit() {
      this.$emit('apply-code', this.code);
    },

    getErrorMessage({ code }) {
      if (code === 'DiscountCodeNonApplicable') {
        return this.$t('nonApplicable');
      }
      return this.$t('unknownError');
    },
  },
};
</script>

<style lang="scss" scoped>
  button {
  background: none;
  font-weight: 400;
  font-size: 14px;
  text-transform: uppercase;
  border: 2px solid #D6D6D6;
  color: #ADADAD;
  margin-right: 0.5em;
  padding: 0.5em 1em;
  position: relative;
  &:hover {
    background: none;
    color: #858585;
    border: 2px solid #858585;
  }
}
</style>

<i18n>
en:
  promoInfo: "Promotional Discount Info"
  apply: "Apply"
  nonApplicable: "This discount code is non applicable"
de:
  promoInfo: "Werbe-Rabatt-Info"
  apply: "Anwenden"
  nonApplicable: "Dieser Rabattcode ist nicht anwendbar"
</i18n>
