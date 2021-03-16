import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { name: 'home' },
      name: 'root',
      component: () => import(/* webpackChunkName: root */ '../page/index.vue'),
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import(/* webpackChunkName: home */'../page/home'),
        },
        {
          path: 'image-minify',
          name: 'image-minify',
          component: () => import(/* webpackChunkName: image-minify */'../page/image-minify'),
        },
        {
          path: 'todo',
          name: 'todo',
          component: () => import(/* webpackChunkName: todo */'../page/todo'),
        },
      ],
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
