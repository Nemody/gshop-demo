/**
 * 管理所有路由的模块
 */
import Msite from '../pages/Msite.vue';
import Search from '../pages/Search.vue';
import Order from '../pages/Order.vue';
import Profile from '../pages/Profile.vue';

export default [
  {
    path: '/msite',
    component: Msite
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/order',
    component: Order
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/',
    redirect: '/msite'
  }
]
