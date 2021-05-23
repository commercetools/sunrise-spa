import {
  onMounted,
  ref,
  watch,
} from "@vue/composition-api";
import shoppingListApi from "../api/shoppingList";
import useStore from "./useStore";

export default (props,ctx) => {
  const auth = useStore(ctx,state=>state.authenticated)
  const requested = { current: null };
  //example of watching locale
  const shoppingList = ref(undefined);
  const getShoppingList = () => {
    const current = {};
    requested.current = current;
    return shoppingListApi.get().then((list) => {
      if (requested.current === current) {
        shoppingList.value = list;
      }
    });
  };
  const createShoppingList = () => {
    const current = {};
    requested.current = current;
    return shoppingListApi.create().then((list) => {
      shoppingList.value = list;
    });
  };
  const addToShoppingList = (productId) => {
    let promise = getShoppingList()
    if (!shoppingList.value) {
      promise = createShoppingList();
    }
    return promise.then(() =>
      shoppingListApi.addItem([
        productId,
        shoppingList.value.id,
        shoppingList.value.version,
      ])
    ).then(
      response=>{
        shoppingList.value=response
      }
    )
  };
  const removeLineItem = (lineItemId) => {
    let promise = getShoppingList()
    if (!shoppingList.value) {
      promise = Promise.reject('Cannot remove item from non existing list')
    }
    return promise.then(() =>
      shoppingListApi.removeItem([
        lineItemId,
        shoppingList.value.id,
        shoppingList.value.version,
      ])
    ).then(
      response=>{
        shoppingList.value=response
      }
    )
  };
  onMounted(getShoppingList);
  watch(auth,()=>{
    getShoppingList()
  })
  return {
    shoppingList,
    getShoppingList,
    addToShoppingList,
    removeLineItem
  };
};
export const SHOPPING_LIST = 'SHOPPING_LIST';