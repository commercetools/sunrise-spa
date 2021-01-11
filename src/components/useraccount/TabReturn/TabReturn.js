import gql from 'graphql-tag';
import BaseDate from '../../common/BaseDate/BaseDate.vue';
import BaseAddress from '../../common/BaseAddress/BaseAddress.vue';
import BaseMoney from '../../common/BaseMoney/BaseMoney.vue';
import LineItemInfo from '../../common/CartLike/LineItemInfo/LineItemInfo.vue';
import CartLikeContentDetail from '../../common/CartLike/CartLikeContentDetail/CartLikeContentDetail.vue';
import { changeRoute, locale } from '../../common/shared';

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
    closeModal() {
      this.$modal.hide('returnSuccess');
      changeRoute(
        { name: 'orders' }, this,
      );
    },
    submitReturn() {
      if (this.selectedItems.length === 0) {
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
        }).then(() => {
          // this.$router.push({ name: 'orders' })
          this.$modal.show('returnSuccess');
        })
      }
    },
  },
  apollo: {
    me: {
      query: gql`
        query orderById($id: String, $locale: Locale!) {
          me {
            order(id: $id) {
                id
                version
                lineItems {
                  id
                  name(locale: $locale)
                  productSlug(locale: $locale)
                  quantity
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
        }`,
      variables() {
        return {
          id: this.$route.params.id,
          locale: locale(this),
        };
      },
    },
  },
};
