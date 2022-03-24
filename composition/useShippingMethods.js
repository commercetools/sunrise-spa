import useLocale from './useLocale';
import useLocation from './useLocation';
import useCurrency from './useCurrency';
import useShippingMethods from './ct/useShippingMethods';

export default () => {
  const { locale } = useLocale();
  const { location } = useLocation();
  const currency = useCurrency();
  const { total, shippingMethods, loading, error } =
    useShippingMethods({
      locale,
      currency,
      country: location,
    });
  return {
    total,
    shippingMethods,
    loading,
    error,
  };
};
