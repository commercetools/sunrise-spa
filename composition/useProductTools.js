import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useProducts from './useProducts';

function useProductTools(expand = false) {
  const route = useRoute();
  const router = useRouter();
  const sku = computed(() => route.params.sku);
  const { products, total, loading, error, categoryError } =
    useProducts({
      sku,
      expand: expand ? { variants: true } : {},
    });
  const product = computed(() => products.value?.[0]);
  const allVariants = computed(() =>
    product.value
      ? [product.value.masterVariant]
          .concat(product.value.variants || [])
          .map((p) => ({
            name: product.value.name,
            slug: product.value.slug,
            ...p,
          }))
      : null
  );
  const currentVariant = computed(() =>
    allVariants.value
      ? allVariants.value.find(
          ({ sku: c }) => sku.value === c
        )
      : null
  );

  const setPage = (page) =>
    router.push({
      ...route,
      params: {
        ...route.params,
        page,
      },
    });
  const page = computed(() =>
    Number(route.params.page || 1)
  );
  const formatProduct = (product) => ({
    ...product,
    ...product.masterVariant,
  });
  const allError = computed(
    () => error.value || categoryError.value
  );
  return {
    total,
    products,
    loading,
    error: allError,
    allVariants,
    sku,
    currentVariant,
    setPage,
    formatProduct,
    page,
  };
}
export default useProductTools;
