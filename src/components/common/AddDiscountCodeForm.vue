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
      <form @submit.prevent="submitDiscountCode"
            class="text-right promotion-info">
        <span class="text-uppercase promo-info-text">
          {{ $t('code') }}
          <img src="../../assets/img/information.png"
               class="info-icon"
               alt="information icon">
        </span>
        <ValidationError :vuelidate="$v.code"
                         class="vuelidate">
          <input v-model.trim.lazy="$v.code.$model"
                 id="promo-code"
                 type="text"
                 data-test="discount-code-input"/>
        </ValidationError>
        <LoadingButton :buttonState="buttonState"
                       class="apply-button"
                       data-test="apply-discount-code-button">
          {{ $t('apply') }}
        </LoadingButton>
      </form>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import { required } from 'vuelidate/lib/validators';
import LoadingButton from './LoadingButton.vue';
import ServerError from './ServerError.vue';
import cartMixin from '@/mixins/cartMixin';
import ValidationError from './ValidationError.vue';

export default {
  components: { LoadingButton, ServerError, ValidationError },

  data: () => ({
    me: null,
    code: null,
    buttonState: null,
    serverError: null,
  }),

  methods: {
    addDiscountCode() {
      return this.updateMyCart({
        addDiscountCode: {
          code: this.code,
        },
      });
    },

    submitDiscountCode() {
      this.serverError = null;
      if (!this.$v.$invalid) {
        this.buttonState = 'loading';
        this.addDiscountCode()
          .then(() => {
            this.buttonState = 'success';
          })
          .catch((error) => {
            this.serverError = error;
            this.buttonState = null;
          });
      }
    },

    getErrorMessage({ code }) {
      if (code === 'DiscountCodeNonApplicable') {
        return this.$t('nonApplicable');
      }
      return this.$t('unknownError');
    },
  },

  mixins: [cartMixin],

  apollo: {
    me: {
      query: gql`
        query me {
          me {
            activeCart {
              id
              version
            }
          }
        }`,
    },
  },

  validations: {
    code: {
      required,
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

.vuelidate {
  display: inline-block
}
</style>

<i18n>
en:
  code: "Discount code"
  apply: "Apply"
  nonApplicable: "This discount code is non applicable"
de:
  code: "Rabattcode"
  apply: "Anwenden"
  nonApplicable: "Dieser Rabattcode ist nicht anwendbar"
</i18n>
