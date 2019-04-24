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
                       class="apply-button"
                       data-test="apply-discount-code-button">
          {{ $t('apply') }}
        </LoadingButton>
        <div v-if="cartLike.discountCodes.length > 0"
             class="row"
             style="margin-top: 15px">
          <div class="col-sm-12">
            <div class="text-right order-discount col-sm-offset-5">
              <span class="col-sm-3"
                    style="font-weight: bold">
                Applied discounts:
              </span>
            </div>
            <div v-for="discountInfo in cartLike.discountCodes"
                :key='discountInfo.discountCode.id'
                class="text-right order-discount col-sm-offset-7">
              <div class="col-sm-3"
                   data-test="discount-code-name">
                {{ discountInfo.discountCode.code }}
              </div>
              <div class="col-sm-3">{{ discountInfo.discountCode.name }}</div>
              <div class="col-sm-5">
                ({{ discountInfo.discountCode.description }})
              </div>
              <div>
                <div style="cursor: pointer"
                    @click="removeDisountCode(discountInfo.discountCode.id)">
                  <img src="../../assets/img/delete-1.png"
                      class="cart-action-icon">
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import LoadingButton from './LoadingButton.vue';
import ServerError from './ServerError.vue';

export default {
  components: { LoadingButton, ServerError },

  props: ['buttonState', 'serverError', 'cartLike'],

  data: () => ({
    code: null,
  }),

  methods: {
    submit() {
      this.$emit('apply-code', this.code);
      this.code = null;
    },

    removeDisountCode(id) {
      this.$emit('remove-code', id);
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
  .apply-button {
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
