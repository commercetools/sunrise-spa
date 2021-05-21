import {
  onMounted,
  ref,
} from "@vue/composition-api";
import shoppingListApi from "../api/shoppingList";

export default () => {
  //step one to solve race condition
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
    //if no shoppingList exist then create it
    //https://docs.commercetools.com/api/projects/shoppingLists#add-lineitem
    //https://docs.commercetools.com/api/projects/shoppingLists#lineitemdraft
    //typeId is product
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
  onMounted(getShoppingList);
  return {
    shoppingList,
    getShoppingList,
    addToShoppingList,
  };
};
export const SHOPPING_LIST = 'SHOPPING_LIST';