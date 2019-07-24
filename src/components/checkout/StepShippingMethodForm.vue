<template>
  <div v-if="cartExists">
    <BaseForm :vuelidate="$v"
              :onSubmit="setShippingMethod"
              #default="{ error, state }">
      <div class="shipping-info">
        <span class="text-uppercase shipping-method-title">{{ $t('shippingMethod') }}</span>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <ServerError :error="error"/>
        </div>
      </div>
      <BaseLabel :label="''"
                 :vuelidate="$v.form.shippingMethodId">
        <BaseRadio v-for="shippingMethod in shippingMethodsByLocation"
                   v-model="form.shippingMethodId"
                   :value="shippingMethod.id"
                   :key="shippingMethod.id"
                   class="shipping-method-option">
          <span class="shipping-name">
            {{ shippingMethod.name }}
            <span class="shipping-description">
              {{ shippingMethod.description }}
            </span>
          </span>
          <BaseMoney :money="price(shippingMethod)"
                     class="shipping-price"/>
        </BaseRadio>
      </BaseLabel>
      <CheckoutNavigation :state="state"
                          @back="goToBilling"/>
    </BaseForm>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import { required } from 'vuelidate/lib/validators';
import DISPLAYABLE_MONEY_FRAGMENT from '../DisplayableMoney.gql';
import cartMixin from '../../mixins/cartMixin';
import BaseRadio from '../common/form/BaseRadio.vue';
import BaseMoney from '../common/BaseMoney.vue';
import BaseForm from '../common/form/BaseForm.vue';
import BaseLabel from '../common/form/BaseLabel.vue';
import ServerError from '../common/form/ServerError.vue';
import CheckoutNavigation from './CheckoutNavigation.vue';

export default {
  components: {
    BaseLabel,
    CheckoutNavigation,
    ServerError,
    BaseForm,
    BaseMoney,
    BaseRadio,
  },

  mixins: [cartMixin],

  data: () => ({
    form: {
      shippingMethodId: null,
    },
  }),

  methods: {
    price(shippingMethod) {
      return shippingMethod.zoneRates
        .map(zoneRate => zoneRate.shippingRates
          .find(shippingRate => shippingRate.isMatching))[0]?.price;
    },

    setShippingMethod() {
      return this.updateMyCart([
        {
          setShippingMethod: {
            shippingMethod: {
              typeId: 'shipping-method',
              id: this.form.shippingMethodId,
            },
          },
        },
      ]).then(() => this.$router.push({ name: 'cart' }));
    },

    goToBilling() {
      this.$router.push({ name: 'checkout-billing' });
    },
  },

  watch: {
    me(value) {
      this.form.shippingMethodId = value?.activeCart?.shippingInfo?.shippingMethodRef?.id;
    },

    shippingMethodsByLocation(value) {
      if (!this.form.shippingMethodId) {
        this.form.shippingMethodId = value.find(shippingMethod => shippingMethod.isDefault)?.id || value[0]?.id;
      }
    },
  },

  apollo: {
    me: {
      query: gql`
        query me {
          me {
            activeCart {
              id
              version
              shippingInfo {
                shippingMethodRef {
                  id
                }
              }
              shippingAddress {
                country
                state
              }
              totalPrice {
                currencyCode
              }
            }
          }
        }`,
    },
    shippingMethodsByLocation: {
      query: gql`
        query checkoutShippingMethods($currency: Currency!, $country: Country!, $state: String) {
          shippingMethodsByLocation(currency: $currency, country: $country, state: $state) {
            id
            name
            description
            isDefault
            zoneRates {
              shippingRates {
                isMatching
                price {
                  ...DisplayableMoney
                }
              }
            }
          }
        }
        ${DISPLAYABLE_MONEY_FRAGMENT}`,
      variables() {
        return {
          currency: this.me.activeCart.totalPrice.currencyCode,
          ...this.me.activeCart.shippingAddress,
        };
      },
      skip() {
        return !this.cartExists;
      },
    },
  },

  validations: {
    form: {
      shippingMethodId: { required },
    },
  },
};
</script>

<style scoped>
.shipping-method-option {
  padding: 1.5em;
  margin: 2px 0;
}

.shipping-name {
  text-transform: uppercase;
  font-weight: 400;
}

.shipping-description {
  text-transform: none;
  padding-left: 1em;
}

.shipping-price {
  text-align: right;
  float: right;
}
</style>

<i18n>
en:
  shippingMethod: Shipping method
de:
  shippingMethod: Versandart
</i18n>
