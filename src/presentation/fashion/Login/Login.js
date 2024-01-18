import LoginForm from './LoginForm/LoginForm.vue';
import SignUpForm from './SignUpForm/SignUpForm.vue';
// import SignUpForm from '../SignUpForm/SignUpForm.vue';
import { useI18n } from 'vue-i18n';
import localMessages from './Login.json';
export default {
  components: {
    LoginForm,
    SignUpForm,
  },
  setup() {
    const { t } = useI18n({messages: localMessages});

    return {
      t
    }
  }
};
