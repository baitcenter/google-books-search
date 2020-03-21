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
      path: '/about',
      name: 'about',
      // component: () =>
      //     import(/* webpackChunkName: "about" */ '@/views/About.vue'),
      component: About,

      beforeEnter: (to, from, next) => {
        next()
      },
    }
  ]
});
export default router

router.beforeEach( (to, from, next) => {
  // google.books.load({"language": "fr"})
  next()
})
