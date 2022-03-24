import { useI18n } from 'vue-i18n';
import Banner from 'presentation/Banner/Banner.vue';
import BaseMoney from 'presentation/components/BaseMoney/BaseMoney.vue';

export default {
  name: 'Home',
  components: { Banner, BaseMoney },

  setup() {
    //cannot use i18n tag and working number format from setup in the same
    //  component (vue is great!!)
    const { t } = useI18n();
    return {
      t,
    };
  },
};
