import gql from 'graphql-tag';
import productMixin from '../../../mixins/productMixin';
import BasePrice from '../../common/BasePrice/BasePrice.vue';
import ProductGallery from '../../productdetail/ProductGallery/ProductGallery.vue';
import { locale, getValue } from '../../common/shared';
import config from '../../../../sunrise.config';
import cartMixin from '../../../mixins/cartMixin';

export default {
  mixins: [productMixin, cartMixin],
  data: () => ({
    product: null,
    quantity: 1,
  }),
  components: {
    BasePrice,
    ProductGallery,
  },
  props: {
    showModal: Boolean,
    productSku: String,
  },
  watch: {
    showModal() {
      if (this.showModal === true) {
        this.$modal.show('quickView');
      }
    },
  },
  methods: {
    closeModal() {
      this.$modal.hide('quickView');
      this.$emit('closeModal');
      this.quantity = 1;
    },
    async addToCart() {
      if (!this.cartExists) {
        await this.createMyCart({
          currency: this.$store.state.currency,
          country: this.$store.state.country,
          shippingAddress: { country: this.$store.state.country },
        });
      }
      return this.updateMyCart({
        addLineItem: {
          sku: this.productSku,
          quantity: Number(this.quantity),
        },
      }).then(() => { this.closeModal(); this.$store.dispatch('openMiniCart'); });
    },
  },
  computed: {
    matchingVariant() {
      return this.currentProduct.variant || {};
    },
    productAttributes() {
      const selected = this.product.masterData.current;
      const { attributesRaw } = (selected?.allVariants?.[0] || []);
      const attributes = attributesRaw.map(
        ({ attributeDefinition: { name, label, type }, value }) => [
          name, label, getValue(type.name, value, locale(this)),
        ],
      );
      return config.detailAttributes.map(
        (attributeName) => attributes.find(([name]) => name === attributeName),
      ).filter((x) => x).map(
        ([, name, value]) => ({ name, value }),
      );
    },
  },
  apollo: {
    product: {
      query: gql`
        query Product($locale: Locale!, $sku: String!, $currency: Currency!, $country: Country!) {
          product(sku: $sku) {
            id
            masterData {
              current {
                allVariants(skus:[$sku]) {
                  sku
                  attributesRaw {
                    attributeDefinition {
                      name
                      label(locale:$locale)
                      type {
                        name
                      }
                    }
                    value
                  }
                }
                name(locale: $locale)
                slug(locale: $locale)
                variant(sku: $sku) {
                  price(currency: $currency,country:$country) {
                    value {
                      ...printPrice
                    }
                    discounted {
                      value {
                       ...printPrice
                      }
                    }
                  }
                }
              }
            }
          }
        }
        fragment printPrice on BaseMoney {
          centAmount
          fractionDigits
          currencyCode
        }`,
      variables() {
        return {
          locale: locale(this),
          currency: this.$store.state.currency,
          sku: this.productSku,
          country: this.$store.state.country,
        };
      },
      skip() {
        return !this.productSku;
      },
    },
  },
};
