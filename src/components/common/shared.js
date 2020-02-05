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
