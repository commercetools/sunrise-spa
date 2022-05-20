import gql from 'graphql-tag';
import { getValue } from '../../src/lib';
import useCategories from '../useCategories';
import { useEffect, useState } from 'react';
import useQuery from '../useQueryFacade';
//@todo: price for logged in user (do in React, mock in Vue)
//@todo: we will worry about importing the partials
//  when the cart route is done
const query = (expand) => gql`
  query products(
    $locale: Locale!
    $limit: Int!
    $offset: Int!
    $priceSelector: PriceSelectorInput!
    $sorts: [String!] = []
    $filters: [SearchFilterInput!] = [],
    $text: String = ""
  ) {
    productProjectionSearch(
      locale: $locale
      text: $text
      limit: $limit
      offset: $offset
      sorts: $sorts
      priceSelector: $priceSelector
      filters: $filters
    ) {
      total
      results {
        # better never select id or cache breaks
        # https://github.com/apollographql/apollo-client/issues/9429
        productId: id
        name(locale: $locale)
        slug(locale: $locale)
        ${
          expand.variants
            ? `variants {
          variantId: id
          sku
          images {
         	  url 
          }
          attributesRaw {
            name
            value
          }
          scopedPrice {
            value {
              currencyCode
              centAmount
              fractionDigits
            }
            discounted {
              discount {
                name(locale: $locale)
              }
              value {
                currencyCode
                centAmount
                fractionDigits
              }
            }
            country
          }
        }`
            : ''
        }
        masterVariant {
          # better never select id or cache breaks
          # https://github.com/apollographql/apollo-client/issues/9429
          variantId: id
          sku
          images {
         	  url 
          }
          attributesRaw {
            name
            value
          }
          scopedPrice {
            value {
              currencyCode
              centAmount
              fractionDigits
            }
            discounted {
              discount {
                name(locale: $locale)
              }
              value {
                currencyCode
                centAmount
                fractionDigits
              }
            }
            country
          }
        }
      }
    }
  }
`;

function useCategoryId({ categorySlug, setSkip, locale }) {
  const [skipCategory, setSkipCategory] = useState(
    !getValue(categorySlug) || !getValue(locale)
  );
  const [categoryId, setCategoryId] = useState(null);
  //@todo: Error handling needed
  const { categories, error } = useCategories({
    categorySlug,
    skip: skipCategory,
  });
  useEffect(() => {
    setSkipCategory(
      !getValue(categorySlug) || !getValue(locale)
    );
    setSkip(
      getValue(categorySlug) && !getValue(categoryId)
    );
  }, [categorySlug, categoryId, setSkip, locale]);
  useEffect(() => {
    setCategoryId(
      getValue(categorySlug) && getValue(categories)
        ? getValue(categories)?.[0]?.id
        : null
    );
  }, [categories, categorySlug]);
  return { categoryId, error };
}
const updateFilters = (
  filters,
  sku,
  categoryId,
  categorySlug
) =>
  filters
    .filter(
      (f) => !(f?.model?.value?.path === 'variants.sku')
    )
    .filter(
      (filter) =>
        !(filter?.model?.tree?.path === 'categories.id')
    )
    .concat(
      sku
        ? {
            model: {
              value: {
                path: 'variants.sku',
                values: [sku],
              },
            },
          }
        : undefined
    )
    .concat(
      categorySlug && categoryId
        ? {
            model: {
              tree: {
                path: 'categories.id',
                rootValues: [],
                subTreeValues: [categoryId],
              },
            },
          }
        : undefined
    )
    .filter((f) => f);
const createPriceSelector = (
  currency,
  country,
  channel,
  customerGroup
) => ({
  currency: getValue(currency),
  country: getValue(country),
  channel: getValue(channel)
    ? {
        typeId: 'priceChannel',
        id: getValue(channel).id,
      }
    : null,
  customerGroup: getValue(customerGroup)
    ? {
        id: getValue(customerGroup),
        typeId: 'customer-group',
      }
    : null,
});
//this is the React api useQuery(query,options)
// https://www.apollographql.com/docs/react/api/react/hooks/#function-signature
const useProducts = ({
  search,
  locale,
  limit,
  offset,
  currency,
  country,
  sorts,
  categorySlug,
  expand = {},
  sku,
  customerGroup,
  channel,
}) => {
  const [products, setProducts] = useState();
  const [priceSelector, setPriceSelector] = useState(
    createPriceSelector(
      currency,
      country,
      channel,
      customerGroup
    )
  );
  const [skip, setSkip] = useState(true);
  const [total, setTotal] = useState();
  const { categoryId, error: categoryError } =
    useCategoryId({
      categorySlug,
      setSkip,
      locale,
    });
  const [filters, setFilters] = useState(() =>
    updateFilters(
      [
        {
          model: {
            range: {
              path: 'variants.scopedPrice.value.centAmount',
              ranges: [
                {
                  from: '0',
                  to: '1000000000000',
                },
              ],
            },
          },
        },
      ],
      getValue(sku),
      getValue(categoryId),
      getValue(categorySlug)
    )
  );
  useEffect(() => {
    setPriceSelector(
      createPriceSelector(
        currency,
        country,
        channel,
        customerGroup
      )
    );
  }, [currency, country, channel, customerGroup]);
  useEffect(
    () =>
      setFilters((filters) =>
        updateFilters(
          filters,
          getValue(sku),
          getValue(categoryId),
          getValue(categorySlug)
        )
      ),
    [categoryId, categorySlug, sku]
  );
  const { loading, error } = useQuery(query(expand), {
    variables: {
      text: search,
      locale,
      limit,
      offset,
      sorts,
      priceSelector,
      filters,
    },
    onCompleted: (data) => {
      if (!data) {
        return;
      }
      //missing data will break sunrise
      setProducts(
        data.productProjectionSearch.results.map(
          (item) => ({
            ...item,
            name: item.name || 'Product name missing',
            slug: item.slug || 'product slug missing',
          })
        )
      );
      setTotal(data.productProjectionSearch.total);
    },
    skip,
  });
  return { total, products, loading, error, categoryError };
};
export default useProducts;
