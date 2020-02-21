import { locale } from '../../common/shared';

export default {
  props: ['file'],
  computed: {
    src() {
      try {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        return require(`@/assets/img/banners/${locale(this)}/${this.file}`);
      } catch (e) {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        return require(`@/assets/img/banners/${this.file}`);
      }
    },
  },
};
