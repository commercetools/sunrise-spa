// eslint-disable-next-line no-console

import gql from 'graphql-tag';
import productMixin from '../../../mixins/productMixin';
import ProductGallery from '../ProductGallery/ProductGallery.vue';
import SocialMediaLinks from '../SocialMediaLinks/SocialMediaLinks.vue';
import DetailsSection from '../DetailsSection/DetailsSection.vue';
import AddToCartForm from '../AddToCartForm/AddToCartForm.vue';
import BasePrice from '../../common/BasePrice/BasePrice.vue';
import VariantSelector from '../VariantSelector/VariantSelector.vue';
import SubscriptionSelector from '../SubscriptionSelector/SubscriptionSelector.vue';
import { locale } from '../../common/shared';

const getAttribute = (product, name) => {
  const x = product.masterData.current.variant.attributesRaw.find(
    att => att.name === name,
  );
  return x && x.value;
};
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
    SubscriptionSelector,
  },
  mixins: [productMixin],
  data: () => ({
    product: null,
    subscribe: 0,
    frequency: 14,
  }),
  methods: {
    setSubscribe(value) {
      this.subscribe=value;
      // eslint-disable-next-line no-console
      console.log('subs',value);
    },
    setFrequency(value) {
      this.frequency=parseInt(value);
      // eslint-disable-next-line no-console
      console.log('freq',value);
    }
  },
  computed: {
    hasSubscription() {
      return getAttribute(this.product, 'subscription');
    },
    matchingVariant() {
      return this.currentProduct.variant || {};
    },
  },
  apollo: {
    product: {
      query: gql`
        query Product($locale: Locale!, $sku: String!, $currency: Currency!, $country: Country!,$channelId: String) {
          product(sku: $sku) {
            id
            masterData {
              current {
                name(locale: $locale)
                slug(locale: $locale)
                variant(sku: $sku) {
                  price(currency: $currency,country:$country,channelId:$channelId) {
                    value {
                      ...printPrice
                    }
                    discounted {
                      value {
                       ...printPrice
                      }
                    }
                  }
                  attributesRaw {
                      name
                      value
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
          sku: this.sku,
          country: this.$store.state.country,
          channelId: this.$store.state?.channel?.id,
        };
      },
    },
  },
};
