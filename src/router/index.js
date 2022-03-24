import { createRouter, createWebHistory } from 'vue-router';
import { CUSTOMER } from '../constants';
import routes from './routes';
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach(async (to, from, next) => {
  const routeRequiresAuth = to.matched.some(
    (record) => record.meta.requiresAuth
  );
  if (
    routeRequiresAuth &&
    !localStorage.getItem(CUSTOMER)
  ) {
    next({ name: 'login' });
  } else {
    next();
  }
});
export default router;
