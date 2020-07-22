import gql from 'graphql-tag';
import BaseDate from '../../common/BaseDate/BaseDate.vue';
import BaseAddress from '../../common/BaseAddress/BaseAddress.vue';
import LineItemInfo from '../../common/cartlike/LineItemInfo/LineItemInfo.vue';
import CartLikeContentDetail from '../../common/cartlike/CartLikeContentDetail/CartLikeContentDetail.vue';
import ORDER_FRAGMENT from '../../Order.gql';
import ADDRESS_FRAGMENT from '../../Address.gql';
import MONEY_FRAGMENT from '../../Money.gql';
import { locale } from '../../common/shared';

export default {
  components: {
    CartLikeContentDetail,
    BaseDate,
    BaseAddress,
    LineItemInfo,
  },
  data: () => ({
    me: null,
  }),
  apollo: {
    me: {
      query: gql`
        query orderById($id: String, $locale: Locale!) {
          me {
            order(id: $id) {
              ...OrderFields
            }
          }
        }
        ${ORDER_FRAGMENT}
        ${MONEY_FRAGMENT}
        ${ADDRESS_FRAGMENT}`,
      variables() {
        return {
          id: this.$route.params.id,
          locale: locale(this),
        };
      },
    },
  },
};
