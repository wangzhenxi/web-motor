import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';

import App from './App';
import router from './router';
import store from './store';
import ctx from './ctx';
import { setThat } from './share/that';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.use(ctx);
Vue.use(ElementUI);
Vue.prototype.$ELEMENT = { size: 'small' };

// 关闭安全提示
if (process.env.NODE_ENV === 'development') {
  process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';
}

const ins = new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');

setThat(ins);
