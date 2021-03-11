import gql from 'graphql-tag';
import productMixin from '../../../mixins/productMixin';
import ProductGallery from '../ProductGallery/ProductGallery.vue';
import SocialMediaLinks from '../SocialMediaLinks/SocialMediaLinks.vue';
import DetailsSection from '../DetailsSection/DetailsSection.vue';
import AddToCartForm from '../AddToCartForm/AddToCartForm.vue';
import BasePrice from '../../common/BasePrice/BasePrice.vue';
import VariantSelector from '../VariantSelector/VariantSelector.vue';
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
    availability() {
      return this.currentProduct
        ?.variant
        ?.availability
        ?.channels
        ?.results?.[0]
        ?.availability;
    },
    isOnStock() {
      const inStock = this.availability?.isOnStock;
      return typeof inStock !== "boolean"
        ? true
        : inStock
    },
    availableQuantity() {
      return this.availability?.availableQuantity;
    },
    availableQ() {
      return typeof this.availableQuantity !== "undefined"
    },

  },
  apollo: {
    product: {
      query: gql`
        query Product(
          $locale: Locale!,
          $sku: String!,
          $currency: Currency!,
          $country: Country!,
          $channelId: String,
          $cId: String!,# need to add channelId as mandatory string as well
          $withAvailability: Boolean!
        ) {
          product(sku: $sku) {
            id
            masterData {
              current {
                name(locale: $locale)
                slug(locale: $locale)
                variant(sku: $sku) {
                  availability
                    @include(if: $withAvailability) {
                    channels(
                      includeChannelIds: [$cId]
                    ) {
                      total
                      results {
                        availability {
                          availableQuantity
                          isOnStock
                        }
                      }
                    }
                  }
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
          cId: this.$store.state?.channel?.id||'',
          withAvailability: Boolean(
            this.$store.state?.channel?.id
          )
        };
      },
    },
  },
};
