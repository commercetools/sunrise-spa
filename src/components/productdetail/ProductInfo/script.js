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

export default {
  props: {
    sku: {
      type: String,
      required: true,
    },
  },
  methods: {
    showStoreFinder() {
      $('#store-finder-modal').modal('show');
    },
  },
  components: {
    DetailsSection,
    ProductGallery,
    SocialMediaLinks,
    AddToCartForm,
    BasePrice,
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
    storeInventory() {
      let inventoryStatus = 'Out of Stock';
      const atStore = this.inventory ? ` at ${this.$store.state.storeName}` : '';
      if (!this.inventory) {
        inventoryStatus = 'Find In Store';
      } else if (this.inventory.availableQuantity > 20) {
        inventoryStatus = 'In Stock';
      } else if (this.inventory.availableQuantity > 0) {
        inventoryStatus = 'Only a few left';
      }
      return ` ${inventoryStatus}${atStore}`;
    },
    storeInventoryIcon() {
      let inventoryIcon = 'times';
      if (!this.inventory) {
        inventoryIcon = 'map-marker-alt';
      } else if (this.inventory.availableQuantity > 20) {
        inventoryIcon = 'check';
      } else if (this.inventory.availableQuantity > 0) {
        inventoryIcon = 'exclamation-triangle';
      }
      return inventoryIcon;
    },
  },
  apollo: {
    product: {
      query: gql`
        query Product($locale: Locale!, $sku: String!, $currency: Currency!, $country: Country!, $where: String!) {
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
        const scs = this.$store.state.channel ? ` and supplyChannel(id="${this.$store.state.channel}")` : '';
        return {
          where: `sku="${this.sku}"${scs}`,
          locale: locale(this),
          currency: this.$store.state.currency,
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
