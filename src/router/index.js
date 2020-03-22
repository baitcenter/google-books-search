import Vue from 'vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

import { IonicVueRouter } from '@ionic/vue';

Vue.use(IonicVueRouter);

let router = new IonicVueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/:bookId',
      props: true,
      name: 'book',
      component: () =>
          import(/* webpackChunkName: "about" */ '@/views/Book.vue'),
      // component: About,
    },
    {
      path: '/about',
      name: 'about',
      component: () =>
          import(/* webpackChunkName: "about" */ '@/views/About.vue'),
      // component: About,
    }
  ]
});
export default router

router.beforeEach( (to, from, next) => {
  next()
})
