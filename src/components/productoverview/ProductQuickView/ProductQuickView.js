import gql from 'graphql-tag';
import productMixin from '../../../mixins/productMixin';
import BasePrice from '../../common/BasePrice/BasePrice.vue';
import ProductGallery from '../../productdetail/ProductGallery/ProductGallery.vue';
import { locale, getValue, productAttributes, addLine } from '../../common/shared';
import cartMixin from '../../../mixins/cartMixin';
import useLocale from '../../../composition/useLocale';
import { watch } from '@vue/composition-api';

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
  setup(){
    //example of watching locale
    const locale = useLocale();
    watch(
      locale,
      // eslint-disable-next-line no-console
      (arg)=>console.log('changed locale:',arg)
    );
    return {locale}
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
      this.$emit('close-modal');
      this.quantity = 1;
    },
    async addToCart() {
      return addLine(this)
        .then(() => { 
          this.closeModal(); this.$store.dispatch('openMiniCart'); 
        });

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
      return productAttributes(attributes);
    },
    sku() {//needed for addLine to work
      return this.productSku;
    }
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
