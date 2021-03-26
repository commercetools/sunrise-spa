import { DefaultApolloClient, provideApolloClient, useQuery } from '@vue/apollo-composable';
import { computed, inject, onMounted, ref, watch } from '@vue/composition-api';
import gql from 'graphql-tag';
import { selectChannel, selectCurrency } from './selectors';
import useCountry from './useCountry';
import useLocale from './useLocale';
import useStore from './useStore';

export default (props,ctx,selectSku=(props)=>props.productSku) => {
  //example of watching locale
  const product = ref(null);
  const locale = useLocale();
  const country = useCountry();
  const currency = useStore(ctx, selectCurrency);
  const channel = useStore(ctx, selectChannel);
  const sku = computed(()=>selectSku(props));
  const apolloClient = inject(DefaultApolloClient);
  const currentProduct = computed(()=> 
    product
      .value
      ?.masterData
      ?.current || {}
  );
  const getProduct = () => {
    if(sku.value){
      const result = provideApolloClient(apolloClient)(() => useQuery(
        gql`
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
          }
        `,
        {
          locale: locale.value,
          currency: currency.value,
          sku: sku.value,
          country: country.value,
          channelId: channel.value?.id,
          cId: channel.value?.id||'',
          withAvailability: Boolean(channel.value?.id)
        }
      )).result;
      watch(result,(result)=>product.value=result.product);
    }
  };
  watch(
    [currency,locale,country, sku,channel],
    ()=>{
      getProduct();
    }
  );
  onMounted(getProduct);
  return { currentProduct, product }
};