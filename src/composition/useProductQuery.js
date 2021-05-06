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
  const staged = computed(()=>Boolean(ctx?.root?.$route?.query?.staged))
  const availability = computed(()=>
    currentProduct.value?.availability?.channels?.[channel.value?.id]
  );
  const availableQuantity = computed(()=>
    availability.value?.availableQuantity
  );
  const availableQ = computed(()=>
    availableQuantity.value !== "undefined"
  );
  const isOnStock = computed(()=>{
    const inStock = availability.value?.isOnStock;
    return typeof inStock !== "boolean"
      ? true
      : inStock
  });
  const getProductProjection = () => {
    if(!sku.value){
      return
    }
    const query = {
      priceCurrency: currency.value,
      'filter.query': `variants.sku:"${sku.value}"`,
      priceCountry: country.value,
      priceChannel: channel.value?.id,
    };
    if(staged.value){
      query.staged=true
    }
    //@todo: implement unpublished product fetching only when
    //  env value is set (used in preview unpublished products)
    products.get(
      [query,{},locale.value,[]]
    ).then(
      (response)=>{
        const p = response.results[0];
        const name = p?.name[locale.value]
        const allVariants = p.variants.concat(p.masterVariant).map(
          p=>({...p,name})
        )
        variants.value = allVariants;
        product.value = allVariants.find(v=>v.sku===sku.value);
        masterVariant.value = {...p.masterVariant,name};
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