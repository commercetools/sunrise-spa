import { ref, watch } from 'vue';
import { DEFAULT_PAGE_SIZE } from '../src/constants';
import { getValue } from '../src/lib';

//this should work in react
const usePage = (
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE
) => {
  const limit = Number(pageSize);
  return { limit, offset: (page - 1) * limit };
};
//vue specific implementation
export default (page, pageSize = DEFAULT_PAGE_SIZE) => {
  const info = usePage(getValue(page), pageSize);
  const limit = ref(info.limit);
  const offset = ref(info.offset);
  watch(page, (page) => {
    const { limit: l, offset: o } = usePage(page, pageSize);
    limit.value = l;
    offset.value = o;
  });
  return { limit, offset };
};
