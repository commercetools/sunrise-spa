/* eslint-disable import/prefer-default-export */
export function totalPrice(lineItem) {
  const { centAmount: unitCentAmount, ...unitPrice } = lineItem.price.discounted?.value || lineItem.price.value;
  const originalPrice = {
    ...unitPrice,
    centAmount: unitCentAmount * lineItem.quantity,
  };
  const price = { value: { ...originalPrice } };
  if (originalPrice.centAmount !== lineItem.totalPrice.centAmount) {
    price.discounted = { value: { ...lineItem.totalPrice } };
  }
  return price;
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
export const locale = component => component?.$route?.params?.locale;
export const isToughDevice = () => 'ontouchstart' in window;
export const modifyQuery = (key, value, query, add = true) => {
  const values = [value]
    .concat(query[key])
    .filter(v => add || v !== value);
  let newValue = [...new Set(values)]
    .filter(v => v !== undefined);
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
