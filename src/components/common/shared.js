import config from '../../../sunrise.config';

export function getValue(type, value, language) {
  if (type === 'enum') {
    return value.label;
  }
  if (type === 'lenum') {
    return value.label[language];
  }
  if (type === 'ltext') {
    return value[language];
  }
  return value;
}
export function totalPrice(lineItem) {
  const { centAmount: unitCentAmount, ...unitPrice } = lineItem.price.value;
  const originalPrice = {
    ...unitPrice,
    centAmount: unitCentAmount * lineItem.quantity,
  };
  const price = { value: originalPrice };
  const discount = (lineItem.totalPrice.centAmount);
  if (originalPrice.centAmount !== discount) {
    price.discounted = { value: { ...lineItem.totalPrice, centAmount: discount } };
  }
  return price;
}
export function subTotal(cartLike) {
  const { currencyCode, fractionDigits } = cartLike.totalPrice;
  const priceCentAmount = cartLike.lineItems
    .reduce((acc, li) => acc + (li.quantity * li.price.value.centAmount), 0);
  const totalPriceCentAmount = cartLike.lineItems.reduce((acc, li) => acc + li.totalPrice.centAmount, 0);
  const discounted = priceCentAmount === totalPriceCentAmount
    ? {}
    : {
      discounted: {
        value: {
          centAmount: totalPriceCentAmount,
          currencyCode,
          fractionDigits,
        },
      },
    };
  return {
    value: {
      centAmount: priceCentAmount,
      currencyCode,
      fractionDigits,
    },
    ...discounted,
  };
}
export function variantAttributes(variant, language, variantNames = config.variantInProductName) {
  const attributes = (variant?.attributesRaw || []).map(
    ({ attributeDefinition: { name, label, type }, value }) => [
      name, label, getValue(type.name, value, language),
    ],
  );

  return variantNames.map(
    (attributeName) => attributes.find(([name]) => name === attributeName),
  ).filter((x) => x).map(
    ([, name, value]) => ({ name, value }),
  );
}
export const pageFromRoute = (route) => {
  const pageNum = Number(route.params.page);
  const page = Number.isNaN(pageNum) || pageNum <= 1
    ? 1 : pageNum;
  return {
    page,
  };
};
export const pushPage = (page, component, name) => {
  const { params, query } = component.$route;
  component.$router.push({
    name,
    params: { ...params, page },
    query,
  });
};
export const changeRoute = (route, component, push = true, keepScrollPosition = true) => {
  const pos = {
    top: window.scrollY,
    left: window.scrollX,
  };
  if (push) {
    component.$router.push(route);
  } else {
    component.$router.replace(route);
  }

  if (keepScrollPosition) {
    Promise.resolve().then(
      () => { window.scrollTo(pos); },
    );
  }
};
export const locale = (component) => component?.$route?.params?.locale;
export const isToughDevice = () => 'ontouchstart' in window;
export const modifyQuery = (key, value, query, add = true) => {
  const values = [value]
    .concat(query[key])
    .filter((v) => add || v !== value);
  let newValue = [...new Set(values)]
    .filter((v) => v !== undefined);
  newValue = (newValue.length > 1) ? newValue : newValue[0];
  return (newValue !== undefined)
    ? {
      ...query,
      [key]: newValue,
    }
    : Object.entries(query).reduce(
      // eslint-disable-next-line no-shadow
      (result, [k, value]) => {
        if (k !== key) {
        // eslint-disable-next-line no-param-reassign
          result[k] = value;
        }
        return result;
      }, {},
    );
};
export function debounce(fn, time = 500) {
  let timeout;
  return function debounced(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(
      () => fn(...args), time,
    );
  };
}
