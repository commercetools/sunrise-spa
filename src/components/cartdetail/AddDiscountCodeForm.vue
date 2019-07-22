<template>
  <BaseForm :vuelidate="$v"
            :onSubmit="addDiscountCode"
            #default="{ error, state }">
    <div class="text-right add-discount-code-form">
      <ServerError :error="error"
                   v-slot="{ graphQLError }"
                   class="server-error">
        {{ getErrorMessage(graphQLError) }}
      </ServerError>
      <BaseInput v-model="form.code"
                 :vuelidate="$v.form.code"
                 :label="$t('code')"
                 type="text"
                 id="promo-code"
                 data-test="discount-code-input"/>
      <LoadingButton :state="state"
                     class="submit-button"
                     data-test="apply-discount-code-button">
        {{ $t('apply') }}
      </LoadingButton>
    </div>
  </BaseForm>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import LoadingButton from '../common/form/LoadingButton.vue';
import ServerError from '../common/form/ServerError.vue';
import BaseForm from '../common/form/BaseForm.vue';
import BaseInput from '../common/form/BaseInput.vue';
import cartMixin from '@/mixins/cartMixin';

export default {
  components: {
    BaseForm,
    BaseInput,
    LoadingButton,
    ServerError,
  },

  data: () => ({
    form: {
      code: null,
    },
  }),

  methods: {
    addDiscountCode() {
      return this.updateMyCart({
        addDiscountCode: {
          code: this.form.code,
        },
      }).then(() => {
        this.form.code = null;
      });
    },

    getErrorMessage({ code }) {
      if (code === 'DiscountCodeNonApplicable') {
        return this.$t('nonApplicable');
      }
      return this.$t('unknownError');
    },
  },

  mixins: [cartMixin],

  validations: {
    form: {
      code: { required },
    },
  },
};
</script>

<style lang="scss">
.add-discount-code-form {
  border-top: 1px solid #D6D6D6;
  padding: 1em;

  .form-field {
    display: inline;
  }

  label {
    display: inline;

    .text {
      color: #858585;
      letter-spacing: 0.1em;
      margin-right: 1em;
    }
  }

  .form-error-message {
    display: none;
  }

  .field-required {
    display: none;
  }

  .submit-button {
    background: none;
    font-weight: normal;
    font-size: 14px;
    border: 2px solid #D6D6D6;
    color: #ADADAD;
    padding: 0.5em 1em;

    &:hover {
      background: none;
      color: #858585;
      border: 2px solid #858585;
    }
  }

  .server-error {
    margin: 0.5em 1em;
  }
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
