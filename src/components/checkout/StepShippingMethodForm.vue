<template>
  <div v-if="cartExists">
    <BaseForm :vuelidate="$v"
              :onSubmit="setShippingMethod"
              #default="{ error, state }">
      <div class="checkout-step-title">
        <span>{{ $t('shippingMethod') }}</span>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <ServerError :error="error"/>
        </div>
      </div>
      <BaseLabel :vuelidate="$v.form.shippingMethod">
        <BaseRadio v-for="shippingMethod in shippingMethodsByLocation"
                   v-model="form.shippingMethod"
                   :value="shippingMethod.id"
                   :key="shippingMethod.id"
                   class="checkout-form-option">
          <span class="option-name">
            {{ shippingMethod.name }}
            <span class="option-description">
              {{ shippingMethod.description }}
            </span>
          </span>
          <BaseMoney :money="price(shippingMethod)"
                     class="option-price"/>
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
import cartMixin from '../../mixins/cartMixin';
import BaseRadio from '../common/form/BaseRadio.vue';
import BaseMoney from '../common/BaseMoney.vue';
import BaseForm from '../common/form/BaseForm.vue';
import BaseLabel from '../common/form/BaseLabel.vue';
import ServerError from '../common/form/ServerError.vue';
import CheckoutNavigation from './CheckoutNavigation.vue';
import MONEY_FRAGMENT from '../Money.gql';

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
      shippingMethod: null,
    },
  }),

  methods: {
    price(shippingMethod) {
      const shippingRate = this.matchingShippingRate(shippingMethod);
      return this.isFree(shippingRate) ? null : shippingRate.price;
    },

    matchingShippingRate(shippingMethod) {
      return shippingMethod.zoneRates
        .map(zoneRate => zoneRate.shippingRates
          .find(shippingRate => shippingRate.isMatching))[0];
    },

    isFree(shippingRate) {
      const totalPrice = this.me.activeCart.totalPrice.centAmount;
      return totalPrice > shippingRate.freeAbove?.centAmount;
    },

    setShippingMethod() {
      return this.updateMyCart([
        {
          setShippingMethod: {
            shippingMethod: {
              typeId: 'shipping-method',
              id: this.form.shippingMethod,
            },
          },
        },
      ]).then(() => this.$router.push({ name: 'checkout-payment-method' }));
    },

    goToBilling() {
      this.$router.push({ name: 'checkout-billing-address' });
    },
  },

  watch: {
    me(value) {
      this.form.shippingMethod = value?.activeCart?.shippingInfo?.shippingMethod?.id;
    },

    shippingMethodsByLocation(value) {
      if (!this.form.shippingMethod) {
        this.form.shippingMethod = value.find(shippingMethod => shippingMethod.isDefault)?.id || value[0]?.id;
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
                shippingMethod {
                  id
                }
              }
              shippingAddress {
                country
                state
              }
              totalPrice {
                centAmount
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
                freeAbove {
                  centAmount
                }
                price {
                  ...MoneyFields
                }
              }
            }
          }
        }
        ${MONEY_FRAGMENT}`,
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
      shippingMethod: { required },
    },
  },
};
</script>

<i18n>
en:
  shippingMethod: Shipping method
de:
  shippingMethod: Versandart
</i18n>
