import Vue from 'vue';
import Router from 'vue-router';
import gql from 'graphql-tag';
import store from '../store';
import apollo from '../apollo';
import routes from './routes';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes
});

router.beforeEach(async (to, from, next) => {
  const routeRequiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (routeRequiresAuth && !store.state.authenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});

router.beforeEach(async (to, from, next) => {
  const routeRequiresCart = to.matched.some((record) => record.meta.requiresCart);
  if (routeRequiresCart) {
    const hasCart = await apollo.defaultClient
      .query({ query: gql`{ me { activeCart { id } } }` })
      .then((result) => !!result.data.me.activeCart);
    if (!hasCart) next('/');
  }
  next();
});

export default router;
