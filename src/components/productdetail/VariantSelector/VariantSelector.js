import AttributeSelect from '../AttributeSelect/AttributeSelect.vue';
import { getValue, locale } from '../../common/shared';
import config from '../../../../sunrise.config';
import { ref, watch } from 'vue-demi';
import useProductQuery from '../../../composition/useProductQuery';

export default {
  components: { AttributeSelect },
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
  computed: {
    attributes() {
      const attributes = this.variants
        .map(({ attributes }) => attributes.map(
          ({
            name,
            value,
          }) => ({
            id: name,
            label:name,
            value:
                getValue( value, locale(this)),
          }),
        ))
        .flat()
        .filter(({ id }) => config.variantSelector.includes(id));  
      const translations = attributes.reduce(
        (result, { id, label }) => result.set(id, label), new Map(),
      );
      return [...config.variantSelector.reduce(
        (result, key) => result.set(translations.get(key),
          [
            key,
            [...new Set(attributes
              .filter(({ id }) => id === key)
              .map(({ value }) => value)),
            ]]),
        new Map(),
      ).entries()]
        .filter(([, [, values]]) => values.length > 1)
        .map(([name, [id, values]]) => [name, id, values]);
    },
    selected() {
      return this.variantCombinations.find(
        (variant) => variant.sku === this.sku,
      );
    },
    variantCombinations() {
      return this.variants.map(
        ({ sku, attributes }) => ({
          sku,
          ...Object.fromEntries(
            attributes.map(
              ({
                name,
                value,
              }) => [
                name,
                getValue(value, locale(this)),
              ],
            ),
          ),
        }),
      );
    },
  },
};
