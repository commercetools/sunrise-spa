import Root from 'containers/views/Shop/Root/Root.vue';
import harmRoutes from './harm';
import felipeRoutes from './felipe';
import config from '../../sunrise.config';
export default [
  {
    path: `/:country(${Object.keys(config.countries).join(
      '|'
    )})?/:locale(${Object.keys(config.languages).join(
      '|'
    )})?`,
    name: 'root',
    component: Root,
    children: [...harmRoutes, ...felipeRoutes],
  },
];
