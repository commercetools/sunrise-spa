import { onBeforeMount, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { LOCALE, LOCATION } from '../src/constants';
import { move } from '../src/lib';
import config from '../sunrise.config';

const caseCorrected = (value = '', key = 'countries') => {
  //get case insensitive locale from sunrise config
  const loc = value.toUpperCase();
  const [, fromConfig] =
    Object.keys(config[key])
      //all locale keys from config in [UPPERCASE,org]
      .map((key) => [key.toUpperCase(), key])
      .find(([key]) => key === loc) || []; //find the one from url
  return fromConfig; //return value from config (in correct case)
};
const checkParams =
  (route, router, locale, location) => () => {
    const {
      localeFromLocalStorage,
      localeFromUrl,
      locationFromLocalStorage,
      locationFromUrl,
    } = getParams(route);
    const params = route.params;
    let newParams = params;
    if (!locationFromUrl) {
      const country =
        locationFromLocalStorage ||
        Object.keys(config.countries)[0];
      newParams = {
        ...newParams,
        country,
      };
    }
    if (!localeFromUrl) {
      const locale =
        localeFromLocalStorage ||
        Object.keys(config.languages)[0];
      newParams = {
        ...newParams,
        locale,
      };
    }
    return Promise.resolve()
      .then(() => {
        if (params !== newParams) {
          return move(router, route, newParams, 'replace');
        }
      })
      .then(() => {
        const { localeFromUrl, locationFromUrl } =
          getParams(route);
        locale.value = localeFromUrl;
        location.value = locationFromUrl;
        localStorage.setItem(LOCATION, locationFromUrl);
        localStorage.setItem(LOCALE, localeFromUrl);
      });
  };
const getParams = (route) => {
  const localeFromLocalStorage = caseCorrected(
    localStorage.getItem(LOCALE) || undefined,
    'languages'
  );
  const locationFromLocalStorage = caseCorrected(
    localStorage.getItem(LOCATION) || undefined
  );
  const localeFromUrl = caseCorrected(
    route.params.locale,
    'languages'
  );
  const locationFromUrl = caseCorrected(
    route.params.country
  );
  return {
    localeFromLocalStorage,
    localeFromUrl,
    locationFromLocalStorage,
    locationFromUrl,
  };
};
const useDefaultRouteParams = () => {
  const locale = ref();
  const location = ref();
  const route = useRoute();
  const router = useRouter();
  watch(
    () => [route.params.country, route.params.locale],
    checkParams(route, router, locale, location)
  );
  onBeforeMount(
    checkParams(route, router, locale, location)
  );
  const setLocale = (locale) =>
    move(
      router,
      route,
      {
        ...route.params,
        locale: caseCorrected(locale, 'languages'),
      },
      'push'
    );
  const setLocation = (location) =>
    move(
      router,
      route,
      {
        ...route.params,
        country: caseCorrected(location),
      },
      'push'
    );
  return {
    locale,
    location,
    setLocale,
    setLocation,
  };
};
export default useDefaultRouteParams;
