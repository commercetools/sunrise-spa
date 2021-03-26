import { inject } from '@vue/composition-api';

export default () => {
  const countryFromRoute = inject('country');
  return countryFromRoute;
};
