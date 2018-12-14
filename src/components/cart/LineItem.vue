<template>
  <div class="row single-cart-item">
    <div class="col-sm-1 col-xs-4 product-img-col">
      <img :src="image"
           :alt="lineItem.name"
           class="img-responsive cart-item-img">
    </div>
    <div class="col-sm-3 col-xs-8 product-info-text">
      <p class="cart-item-name">
        <router-link :to="{ name: 'product',
          params: { productSlug: lineItem.productSlug, sku: lineItem.variant.sku }}">
          {{ lineItem.name }}
        </router-link>
      </p>
      <p class="grey-p">{{ lineItem.variant.sku }}</p>
      <!--<p class="cart-attributes">-->
        <!--{{#each attributes}}-->
        <!--{{name}}-->
        <!--<span class="black-p" data-model="cartItem.{{key}}">{{value}}</span>-->
        <!--{{#unless @last}}<br>{{/unless}}-->
        <!--{{/each}}-->
      <!--</p>-->
      <!--<p class="cart-item-availability grey-p">-->
        <!--<span class="glyphicon glyphicon-ok-sign"></span>{{ $t('catalog:availability.available') }}-->
      <!--</p>-->
    </div>

    <div v-if="editable">
      <div class="col-sm-2 col-xs-12 cart-edit-delete">
        <div class="edit-section-options">
          <div class="edit-delete-section">
            <button @click="deleteLineItem">
              <img src="../../assets/img/delete-1.png"
                   class="cart-action-icon"
                   alt="delete">
              {{ $t('main.form.delete') }}
            </button>
          </div>
        </div>
      </div>
      <div class="col-sm-2 col-xs-12 clearfix">
        <div class="sm-pull-right visible-xs">
          <button class="quantity-submit-btn">
            <span class="glyphicon glyphicon-refresh"></span>
          </button>
        </div>
        <div class="sm-pull-right quantity-spinner">
          <span @click="quantity -= 1"
                class="input-number-decrement">–</span>
          <input v-model.trim.lazy="$v.quantity.$model"
                 type="text"
                 class="input-number"/>
          <span @click="quantity += 1"
                class="input-number-increment">+</span>
        </div>
      </div>
    </div>
    <div v-else
         class="col-sm-2 col-sm-offset-2 col-xs-12 text-center quantity-counter">
      <span class="visible-xs">{{ $t('main.common.quantity') }}:</span>
      <span class="quantity-number">{{ lineItem.quantity }}</span>
    </div>

    <div :class="editable ? 'col-xs-12 sm-pull-right' : 'col-xs-7'"
         class="col-sm-2">
      <div class="text-right cart-item-price">
        <span class="visible-xs xs-price-title">{{ $t('main.common.price') }}</span>
        <span v-if="!hasDiscount"
              data-test="line-item-original-price">
            {{ formatPrice(originalPrice) }}
        </span>
        <span v-else>
          <span data-test="line-item-discounted-price"
                class="discounted-price">
            {{ formatPrice(originalPrice) }}
          </span>
          <span data-test="line-item-discount-price">
            {{ formatPrice(discountedPrice) }}
          </span>
        </span>
      </div>
    </div>
    <div :class="editable ? 'col-xs-12 sm-pull-right' : 'col-xs-5'"
         class="col-sm-2">
      <div class="text-right cart-item-price">
        <span class="visible-xs xs-price-title">{{ $t('checkout.total') }}</span>
        <span>{{ formatPrice(lineItem.totalPrice) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import gql from 'graphql-tag';
import priceMixin from '@/mixins/priceMixin';
import displayableMoneyFragment from '@/components/DisplayableMoney.graphql';
import { required, minValue, integer } from 'vuelidate/lib/validators';


const updateCartInfoFragment = gql`
  fragment UpdateCartInfo on Cart {
    id
    version
    totalPrice {
      ...DisplayableMoney
    }
    shippingInfo {
      price {
        ...DisplayableMoney
      }
    }
    taxedPrice {
      totalGross {
        ...DisplayableMoney
      }
      totalNet {
        ...DisplayableMoney
      }
    }
    lineItems {
      id
      name(locale: $locale)
      productSlug(locale: $locale)
      quantity
      price {
        value {
          ...DisplayableMoney
        }
        discounted {
          value {
            ...DisplayableMoney
          }
        }
      }
      totalPrice {
        ...DisplayableMoney
      }
      variant {
        sku
        images {
          url
        }
      }
    }
  }
  ${displayableMoneyFragment}`;

export default {
  props: {
    cartId: {
      type: String,
      required: true,
    },
    cartVersion: {
      type: Number,
      required: true,
    },
    lineItem: {
      type: Object,
      required: true,
    },
    editable: {
      type: Boolean,
      default: () => false,
    },
  },

  data: () => ({
    quantity: null,
  }),

  computed: {
    hasDiscount: vm => vm.lineItem.price.discounted,

    originalPrice: vm => vm.lineItem.price.value,

    discountedPrice: vm => vm.lineItem.price.discounted.value,

    image: vm => vm.lineItem.variant.images[0].url,
  },

  methods: {
    deleteLineItem() {
      return this.$apollo.mutate({
        mutation: gql`
          mutation deleteLineItem($locale: Locale!, $actions: [MyCartUpdateAction!]!, $id: String!, $version: Long!) {
            updateMyCart(id: $id, version: $version, actions: $actions) {
              ...UpdateCartInfo
            }
          }
          ${updateCartInfoFragment}`,
        variables: {
          locale: this.$i18n.locale,
          id: this.cartId,
          version: this.cartVersion,
          actions: [
            {
              removeLineItem: {
                lineItemId: this.lineItem.id,
              },
            },
          ],
        },
      });
    },

    editQuantity() {
      return this.$apollo.mutate({
        mutation: gql`
        mutation deleteLineItem($locale: Locale!, $actions: [MyCartUpdateAction!]!, $id: String!, $version: Long!) {
          updateMyCart(id: $id, version: $version, actions: $actions) {
            ...UpdateCartInfo
          }
        }
        ${updateCartInfoFragment}`,
        variables: {
          locale: this.$i18n.locale,
          id: this.cartId,
          version: this.cartVersion,
          actions: [
            {
              changeLineItemQuantity: {
                lineItemId: this.lineItem.id,
                quantity: this.quantity,
              },
            },
          ],
        },
      });
    },
  },

  created() {
    this.quantity = this.lineItem.quantity;
    this.debouncedEditQuantity = _.debounce(this.editQuantity, 500);
  },

  watch: {
    quantity(newQuantity) {
      this.$v.$touch();
      if (!this.$v.$invalid && this.lineItem.quantity !== newQuantity) {
        console.log('correct');
        this.debouncedEditQuantity();
      }
    },
  },

  mixins: [priceMixin],

  validations: {
    quantity: {
      required,
      minValue: minValue(1),
      integer,
    },
  },
};
</script>

<i18n>
{
  "en": {
  },
  "de": {
  }
}
</i18n>
