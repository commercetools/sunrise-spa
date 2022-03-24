import { ref } from 'vue';

const isOpen = ref(false);
const useMiniCart = () => {
  const open = () => {
    isOpen.value = true;
  };
  const close = () => {
    isOpen.value = false;
  };
  const toggle = () => {
    isOpen.value = !isOpen.value;
  };
  return { open, close, toggle, isOpen };
};
export default useMiniCart;
