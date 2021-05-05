import { ref, watch } from 'vue-demi';
import useProductQuery from '../../../composition/useProductQuery';
import { locale, getValue, productAttributes } from '../../common/shared';

export default {
  props: {
    sku: {
      type: String,
      required: true,
    },
  },
  setup(props,ctx){
    const sku = ref(props.sku);
    watch(props,newProps=>sku.value=newProps.sku)
    return useProductQuery(props,ctx,sku);
  },
  data: () => ({
    expanded: [true, false],
  }),
  computed: {
    productAttributes() {
      const attributes = this.product.attributes.map(
        ({ name, value }) => [
          name, getValue( value, locale(this)),
        ],
      );
      return productAttributes(attributes, locale(this));
    },
  },
  methods: {
    openAccordion(e) {
      const contextPanelGroup = $('.pdp-accord-toggle').parents('.panel-group-pdp');
      const contextPanel = $(e.target).parents('.panel-default');
      const contextButton = $('.accordion-plus', contextPanel);
      contextButton.toggleClass('accordion-minus');
      // Remove minus class on all other buttons
      contextPanelGroup.find('.accordion-plus').not(contextButton).removeClass('accordion-minus');
    },
    toggle(index) {
      const copy = [...this.expanded];
      copy[index] = !copy[index];
      this.expanded = copy;
    },
  },
};
