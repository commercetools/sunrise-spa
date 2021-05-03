import { computed, onMounted, ref, watch } from '@vue/composition-api';
import products from '../api/products';
import { selectChannel, selectCurrency } from './selectors';
import useCountry from './useCountry';
import useLocale from './useLocale';
import useStore from './useStore';
export default (props,ctx,sku) => {
  //example of watching locale
  const product = ref(null);
  const variants = ref(null);
  const masterVariant = ref(null);
  const locale = useLocale();
  const country = useCountry();
  const currency = useStore(ctx, selectCurrency);
  const channel = useStore(ctx, selectChannel);
  const currentProduct = computed(()=>
    product.value || {}
  );
  const availability = computed(()=>
    // currentProduct
    //   .value
    //   ?.variant
    //   ?.availability
    //   ?.channels
    //   ?.results?.[0]
    //   ?.availability
    //@todo: to be implemented by Harm
    undefined
  );
  const availableQuantity = computed(()=>
    // availability.value?.availableQuantity
    //@todo: to be implemented by Harm
    undefined
  );
  const availableQ = computed(()=>
    // typeof availableQuantity.value !== "undefined"
    //@todo: to be implemented by Harm
    undefined
  );
  const isOnStock = computed(()=>{
    // const inStock = availability.value?.isOnStock;
    // return typeof inStock !== "boolean"
    //   ? true
    //   : inStock
    //@todo: to be implemented by Harm
    return true

  });
  const getProductProjection = () => {
    if(!sku.value){
      return
    }
    const query = {
      priceCurrency: currency.value,
      'filter.query': `variants.sku:"${sku.value}"`,
      priceCountry: country.value,
      channelId: channel.value?.id,
    };
    products.get(
      [query,{},locale.value,[]]
    ).then(
      (response)=>{
        const product = response.results[0];
        const allVariants = product.variants.concat(product.masterVariant);
        variants.value= allVariants;
      }
    )
  }
  watch(
    [currency,locale,country, sku,channel],
    ()=>{
      getProductProjection();
    }
  );
  onMounted(getProductProjection);
  return { 
    product,
    variants,
    masterVariant,
    currentProduct,
    availability,
    availableQ,
    availableQuantity,
    isOnStock
  }
};