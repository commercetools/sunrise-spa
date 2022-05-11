import useLocale from './useLocale';
import useProductDiscountBasic from './ct/useProductDiscount';

function useProductDiscount(id) {
  const { locale } = useLocale();

  const { loading, error, discount } =
    useProductDiscountBasic({
      locale,
      id,
    });

  return { loading, error, discount };
}
export default useProductDiscount;
