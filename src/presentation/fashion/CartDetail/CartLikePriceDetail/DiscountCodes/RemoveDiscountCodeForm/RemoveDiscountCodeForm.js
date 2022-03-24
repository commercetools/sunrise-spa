import useCartTools from 'hooks/useCartTools';

//removeDiscountCode
export default {
  props: {
    codeId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { removeDiscount: rd } = useCartTools();
    const removeDiscount = () => rd(props.codeId);
    return { removeDiscount };
  },
};
