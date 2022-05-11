import useCustomerTools from 'hooks/useCustomerTools';

export default {
  props: {
    discountId: String,
  },

  setup(props) {
    const tools = useCustomerTools();
    console.log(props);
    const { loading, discount } = tools.useProductDiscount(
      props.discountId
    );
    return { loading, discount };
  },
};
