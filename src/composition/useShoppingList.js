import {
  onMounted,
  ref,
  watch,
} from "@vue/composition-api";
import shoppingListApi from "../api/shoppingList";
import { selectAuth } from "./selectors";
import useStore from "./useStore";

export default (props,ctx) => {
  const auth = useStore(ctx,selectAuth)
  const requested = { current: null };
  const shoppingLists = ref(undefined);
  const getShoppingList = (query) => {
    const current = {};
    requested.current = current;
    return shoppingListApi.get(query).then((response) => {
      if (requested.current === current && !query) {
        shoppingLists.value = response.results;
      }
    });
  };
  const addToShoppingList = (sku,quantity,name) => {
    return shoppingListApi.get({name}).then(
      result=>{
        if(result.total===0){
          return shoppingListApi.create({name})
        }
        return result.results[0]
      }
    ).then(
      result=>{
        return shoppingListApi.addItem([
          sku, Number(quantity), result.id, result.version
        ])
      }
    ).then(
      ()=>{
        shoppingListApi.resetCache()
        return getShoppingList()
      }
    ).finally(()=>shoppingListApi.resetCache())
  };
  const removeLineItem = (lineItemId) => {
    let promise = getShoppingList()
    if (!shoppingLists.value) {
      promise = Promise.reject('Cannot remove item from non existing list')
    }
    return promise.then(() =>
      shoppingListApi.removeItem([
        lineItemId,
        shoppingLists.value.id,
        shoppingLists.value.version,
      ])
    ).then(
      response=>{
        shoppingLists.value=response
      }
    ).finally(()=>shoppingListApi.resetCache())
  };
  const removeList = (list) => {
    shoppingListApi.remove(list).finally(
      ()=>{
        shoppingListApi.resetCache();
        getShoppingList();
      }
    )
  }
  onMounted(getShoppingList);
  watch(auth,()=>{
    shoppingListApi.resetCache();
    getShoppingList();
  })
  return {
    shoppingLists,
    getShoppingList,
    addToShoppingList,
    removeLineItem,
    removeList
  };
};
export const SHOPPING_LIST = 'SHOPPING_LIST';