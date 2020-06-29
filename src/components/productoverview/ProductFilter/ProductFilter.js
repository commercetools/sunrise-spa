import { modifyQuery, changeRoute } from '../../common/shared';
import SlideDown from '../../common/SlideDown/SlideDown.vue';
import TermFilter from './Filters/index.vue';
import PriceFilter from './Filters/Price/index.vue';
import ChannelFilter from './Filters/Channel/index.vue';

/* eslint-disable no-prototype-builtins */
export default {
  props: ['facets', 'facetFilter', 'allChannels', 'show'],
  // data: compoment => ({
  // }),
  components: {
    SlideDown,
    TermFilter,
    PriceFilter,
    ChannelFilter,
  },
  computed: {
    min() {
      return this.$route.query.min;
    },
    max() {
      return this.$route.query.max;
    },
  },
  methods: {
    showFacetFilter(facet) {
      return facet?.terms?.length > 32
        || this.facetFilter[facet.name];
    },
    channelChanged(value) {
      this.$emit('channelChange', value);
    },
    priceFilterChanged({ min, max }) {
      // eslint-disable-next-line no-param-reassign
      min = min === null ? undefined : min;
      // eslint-disable-next-line no-param-reassign
      max = max === null ? undefined : max;
      this.pushRouter({ ...this.$route.query, min, max });
    },
    facetFilterValue(facetName) {
      return this.facetFilter[facetName] || '';
    },
    changeFacetFilter(e, facetName) {
      this.$emit(
        'filterChange',
        { name: facetName, value: e.target.value },
      );
    },
    getTerms(facet) {
      if (this.facetFilter[facet.name]) {
        const filter = this.facetFilter[facet.name].toLowerCase();
        return facet.terms.filter(
          ({ term }) => term && term.toLowerCase().includes(filter),
        );
      }
      return facet.terms;
    },
    pushRouter(query) {
      changeRoute(
        {
          ...this.$route,
          query,
          params: { ...this.$route.params, page: 1 },
        }, this,
      );
    },
    filterChange({ name, value, checked }) {
      const query = modifyQuery(
        name,
        value,
        this.$route.query,
        checked,
      );
      this.pushRouter(query);
    },
    clearFacet(name) {
      this.pushRouter([]
        .concat(this.$route.query[name])
        .filter(v => v !== undefined)
        .reduce(
          (result, val) => modifyQuery(
            name,
            val,
            result,
            false,
          ), this.$route.query,
        ));
    },
    isChecked(name, value) {
      return Array.isArray(this.$route.query[name])
        ? this.$route.query[name].includes(value)
        : this.$route.query[name] === value;
    },
  },
};
