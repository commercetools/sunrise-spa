import org, { createPayment } from './ct/useCartMutation';
import useCurrency from './useCurrency';
import useLocation from './useLocation';
import {
  addLineItem,
  changeCartLineItemQuantity,
  removeLineItem,
  addDiscountCode,
  removeDiscountCode,
  setShippingMethod,
  setBillingAddress,
  setShippingAddress,
  createMyOrderFromCart,
} from './ct/useCartMutation';
import useSelectedChannel from './useSelectedChannel';
import { getValue } from '../src/lib';
import { apolloClient, cache } from '../src/apollo';
export {
  addLineItem,
  changeCartLineItemQuantity,
  removeLineItem,
  addDiscountCode,
  removeDiscountCode,
  setShippingMethod,
  setBillingAddress,
  setShippingAddress,
  createMyOrderFromCart,
};
const useCartMutation = () => {
  const { location } = useLocation();
  const currency = useCurrency();
  return org({ location, currency });
};
export default useCartMutation;

export const useCartActions = () => {
  const { location } = useLocation();
  const { channel } = useSelectedChannel();
  const currency = useCurrency();
  const debounce = (fn, time = 200) => {
    const current = {};
    const check = { current };
    return (...args) => {
      const current = {};
      check.current = current;
      setTimeout(() => {
        if (check.current === current) {
          fn(...args);
        }
      }, time);
    };
  };
  const { error, mutateCart } = useCartMutation();
  const changeLine = debounce(
    (lineItemId, quantity = 1) => {
      if (!quantity || quantity < 0) {
        return;
      }
      mutateCart(
        changeCartLineItemQuantity(lineItemId, quantity)
      );
    }
  );
  const remove = (lineItemId) => {
    mutateCart(removeLineItem(lineItemId));
  };
  const addLine = (sku, quantity) =>
    mutateCart(
      addLineItem(sku, quantity, channel.value?.id)
    );
  const applyDiscount = (code) =>
    mutateCart(addDiscountCode(code));
  const removeDiscount = (codeId) =>
    mutateCart(removeDiscountCode(codeId));
  const setShip = (shippingMethodId) =>
    mutateCart(setShippingMethod(shippingMethodId));

  const setBilling = (address) =>
    mutateCart(setBillingAddress(address));

  const setShipping = (address) =>
    mutateCart(setShippingAddress(address));

  const createMyOrder = ({ method, cart }) => {
    return createPayment({
      currency: currency.value,
      centAmount: cart?.totalPrice?.centAmount,
      method,
    })
      .then(({ id }) =>
        mutateCart([
          {
            addPayment: {
              payment: {
                id,
              },
            },
          },
        ])
      )
      .then(({ data }) => {
        const { id, version } = data.updateMyCart;
        return apolloClient.mutate(
          createMyOrderFromCart(id, version)
        );
      })
      .then(() => {
        cache.evict({ id: 'activeCart' });
        cache.gc();
      });
  };

  const setAddressForCart = ({
    billingAddress,
    shippingAddress,
  }) => {
    return Promise.resolve().then(() => {
      const actions = [
        setBillingAddress({
          ...getValue(billingAddress),
          country: location.value,
        }),
        setShippingAddress({
          ...(getValue(shippingAddress) ||
            getValue(billingAddress)),
          country: location.value,
        }),
      ];
      return mutateCart(actions).then(() => {
        cache.evict({ id: 'activeCart' });
        cache.gc();
      });
    });
  };

  return {
    error,
    changeLine,
    removeLineItem: remove,
    applyDiscount,
    removeDiscount,
    addLine,
    setShippingMethod: setShip,
    setBillingAddress: setBilling,
    setShippingAddress: setShipping,
    createMyOrderFromCart: createMyOrder,
    setAddressForCart,
  };
};
