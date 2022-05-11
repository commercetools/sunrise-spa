import gql from 'graphql-tag';
import { useState } from 'react';
import useQueryFacade from '../useQueryFacade';
const query = gql`
  query ProductDiscountById($id: String, $locale: Locale) {
    productDiscount(id: $id) {
      id
      name(locale: $locale)
    }
  }
`;

function useProductDiscount({ locale, id }) {
  const [discount, setDiscount] = useState(null);
  //TODO: change the id here, no hardcode
  id = 'f458ffd5-3529-4559-ad4b-ec74226969ac';
  const { loading, error } = useQueryFacade(query, {
    variables: { id, locale },
    onCompleted: (data) => {
      if (!data) {
        return;
      }
      setDiscount(data.productDiscount);
    },
  });

  return { loading, error, discount };
}
export default useProductDiscount;
