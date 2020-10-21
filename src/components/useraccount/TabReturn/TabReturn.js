import gql from 'graphql-tag';
import BaseDate from '../../common/BaseDate/BaseDate.vue';
import BaseAddress from '../../common/BaseAddress/BaseAddress.vue';
import BaseMoney from '../../common/BaseMoney/BaseMoney.vue';
import LineItemInfo from '../../common/CartLike/LineItemInfo/LineItemInfo.vue';
import CartLikeContentDetail from '../../common/CartLike/CartLikeContentDetail/CartLikeContentDetail.vue';
import MONEY_FRAGMENT from '../../Money.gql';
import { locale } from '../../common/shared';

export default {
  components: {
    CartLikeContentDetail,
    BaseDate,
    BaseMoney,
    BaseAddress,
    LineItemInfo,
  },
  data: () => ({
    me: null,
    selectedItems: [],
  }),
  methods: {
    updateSelectedItems(items) {
      this.selectedItems = items;
    },
    submitReturn() {
      if (this.selectedItems.length === 0) {
        // eslint-disable-next-line no-alert
        alert(this.$t('alert'));
      } else {
        this.$apollo.mutate({
          mutation: gql`
            mutation returnItems($id: String, $version: Long!, $items: [ReturnItemDraftType!]!){
              updateOrder(version: $version, id: $id, actions:{
                addReturnInfo: {
                  items: $items
                }
              }){
                orderNumber
              }
            }`,
          variables: {
            id: this.$route.params.id,
            version: this.me.order.version,
            items: this.selectedItems,
          },
        });
      }
    },
  },
  apollo: {
    me: {
      query: gql`
        query orderById($id: String, $locale: Locale!) {
          me {
            order(id: $id) {
                version
                lineItems {
                  id
                  name(locale: $locale)
                  productSlug(locale: $locale)
                  quantity
                  price {
                    value {
                      ...MoneyFields
                    }
                    discounted {
                      value {
                        ...MoneyFields
                      }
                    }
                  }
                  totalPrice {
                    ...MoneyFields
                  }
                  variant {
                    sku
                    images {
                      url
                    }
                    attributesRaw {
                      name
                      value
                      attributeDefinition {
                        type {
                          name
                        }
                        name
                        label(locale:$locale)
                      }
                    }
                  }
                }
            }
          }
        }
         ${MONEY_FRAGMENT}`,
      variables() {
        return {
          id: this.$route.params.id,
          locale: locale(this),
        };
      },
    },
  },
};
