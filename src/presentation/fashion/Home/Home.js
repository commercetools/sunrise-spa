import { useI18n } from 'vue-i18n';
import Banner from 'presentation/Banner/Banner.vue';
import BaseMoney from 'presentation/components/BaseMoney/BaseMoney.vue';

import Pagination from 'presentation/components/Pagination/Pagination.vue';
import Spinner from 'presentation/components/Spinner/Spinner.vue';
import ProductThumbnail from '../ProductList/ProductThumbnail/ProductThumbnail.vue';
import useTestProductTools from 'hooks/useTestProductTools';
import useCartTools from 'hooks/useCartTools';

export default {
  name: 'Home',
  components: { Banner, BaseMoney, Spinner, Pagination, ProductThumbnail },

  setup() {
    //cannot use i18n tag and working number format from setup in the same
    //  component (vue is great!!)
    const { t } = useI18n();

    const { addLine } = useCartTools();
    const {
      formatProduct,
      products,
      total,
      loading,
      page,
      error,
      setPage,
    } = useTestProductTools();
    const addToCart = (sku, quantity = 1) =>
      addLine(sku, quantity);

    console.log('Home: ', products, total)
    // console.log('Home - products.length: ', products)

    return {
      t,

      formatProduct,
      products,
      total,
      loading,
      page,
      setPage,
      error,
      addToCart,
    };
  },
};
