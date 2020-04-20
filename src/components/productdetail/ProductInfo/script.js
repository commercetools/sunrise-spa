import gql from 'graphql-tag';
import productMixin from '../../../mixins/productMixin';
import ProductGallery from '../ProductGallery/index.vue';
import SocialMediaLinks from '../SocialMediaLinks/index.vue';
import DetailsSection from '../DetailsSection/index.vue';
import AddToCartForm from '../AddToCartForm/index.vue';
import BasePrice from '../../common/BasePrice/index.vue';
import VariantSelector from '../VariantSelector/index.vue';
import StoreLocator from '../../stores/PageStoreLocator/index.vue';
import { locale } from '../../common/shared';
import InventoryAvailability from '../../common/InventoryAvailability/index.vue';

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
    InventoryAvailability,
    VariantSelector,
    StoreLocator,
  },
  mixins: [productMixin],
  data: () => ({
    product: null,
    inventory: null,
    inventoryEntries: [],
  }),
  computed: {
    matchingVariant() {
      return this.currentProduct.variant || {};
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
          $customerGroupId:String,
          $where: String!
        ) {
          inventoryEntries(where: $where) {
            results {
              id
              quantityOnStock
              availableQuantity
            }
          }
          
          product(sku: $sku) {
            id
            masterData {
              current {
                name(locale: $locale)
                slug(locale: $locale)
                variant(sku: $sku) {
                  price(currency: $currency,country:$country,customerGroupId:$customerGroupId) {
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
        const scs = this.$store.state.channel ? ` and supplyChannel(id="${this.$store.state.channel}")` : '';
        return {
          where: `sku="${this.sku}"${scs}`,
          locale: locale(this),
          currency: this.$store.state.currency,
          customerGroupId: this.$store.state.customerGroup,
          sku: this.sku,
          country: this.$store.state.country,
        };
      },
      result({ data }) {
        this.inventory = data.inventoryEntries && data.inventoryEntries.results && data.inventoryEntries.results[0];
      },
    },
  },
};
