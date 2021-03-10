import Vue from 'vue';
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

const ins = new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');

setThat(ins);
