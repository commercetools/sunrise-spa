import gql from 'graphql-tag';
import useQueryFacade from '../useQueryFacade';
import { useState } from 'react';
const query = gql`
  query shippingMethods(
    $currency: Currency!
    $country: Country!
    $state: String
    $locale: Locale!
  ) {
    shippingMethodsByLocation(
      currency: $currency
      country: $country
      state: $state
    ) {
      methodId: id
      name
      localizedDescription(locale: $locale)
      isDefault
      zoneRates {
        shippingRates {
          isMatching
          freeAbove {
            centAmount
          }
          price {
            centAmount
            currencyCode
            fractionDigits
          }
        }
      }
    }
  }
`;

//this is the React api useQuery(query,options)
// https://www.apollographql.com/docs/react/api/react/hooks/#function-signature
const useShippingMethods = ({
  locale,
  currency,
  country,
}) => {
  const [shippingMethods, setShippingMethods] = useState();

  const { loading, error } = useQueryFacade(query, {
    variables: {
      currency,
      country,
      // state,
      locale,
    },
    onCompleted: (data) => {
      if (!data) {
        return;
      }
      setShippingMethods(data.shippingMethodsByLocation);
    },
  });
  return { shippingMethods, loading, error };
};
export default useShippingMethods;
