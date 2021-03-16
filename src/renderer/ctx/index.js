import url from './url';
import * as fs from './fs';
import * as path from './path';

const ctx = {
  url,
  fs,
  path,
};

export default {
  install(Vue) {
    Vue.prototype.$ctx = ctx;
  },
};
