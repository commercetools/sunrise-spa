import useLocale from './useLocale';
import useCart from './ct/useCart';
//Vue/app specific code
export default () => {
  const { locale } = useLocale();
  return useCart({
    locale,
  });
};
