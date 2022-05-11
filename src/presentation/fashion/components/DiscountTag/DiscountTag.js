import useCustomerTools from 'hooks/useCustomerTools';

export default {
  props: {
    discountId: String,
  },
  setup() {
    const tools = useCustomerTools();
    const { loading, discount } =
      tools.useProductDiscount();
    return { loading, discount };
  },
};
