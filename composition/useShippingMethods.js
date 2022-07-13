import useLocale from './useLocale';
import useShippingMethods from './ct/useShippingMethods';

export default (cartId) => {
  const { locale } = useLocale();
  const { total, shippingMethods, loading, error } =
    useShippingMethods({
      locale,
      id: cartId,
    });
  return {
    total,
    shippingMethods,
    loading,
    error,
  };
};
