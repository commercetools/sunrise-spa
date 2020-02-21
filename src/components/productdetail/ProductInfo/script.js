import gql from 'graphql-tag';
import productMixin from '../../../mixins/productMixin';
import ProductGallery from '../ProductGallery/index.vue';
import SocialMediaLinks from '../SocialMediaLinks/index.vue';
import DetailsSection from '../DetailsSection/index.vue';
import AddToCartForm from '../AddToCartForm/index.vue';
import BasePrice from '../../common/BasePrice/index.vue';
import VariantSelector from '../VariantSelector/index.vue';
import { locale } from '../../common/shared';

export default {
  props: {
    sku: {
      type: String,
      required: true,
    },
  },
  components: {
    DetailsSection,
    ProductGallery,
    SocialMediaLinks,
    AddToCartForm,
    BasePrice,
    VariantSelector,
  },
  mixins: [productMixin],
  data: () => ({
    product: null,
  }),
  computed: {
    matchingVariant() {
      return this.currentProduct.variant || {};
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
        }`,
      variables() {
        return {
          locale: locale(this),
          currency: this.$store.state.currency,
          sku: this.sku,
          country: this.$store.state.country,
        };
      },
    },
  },
};
