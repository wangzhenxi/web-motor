import url from './url';

const ctx = {
  url,
};

export default {
  install(Vue) {
    Vue.prototype.$ctx = ctx;
  },
};
