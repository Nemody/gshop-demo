/**
 * 管理所有路由的模块
 */
import Msite from '../pages/Msite/Msite.vue';
import Search from '../pages/Search/Search.vue';
import Order from '../pages/Order/Order.vue';
import Profile from '../pages/Profile/Profile.vue';
import Login from '../pages/Login/Login.vue';
import Shop from '../pages/Shop/Shop.vue';
import Goods from '../pages/Shop/Goods/Goods.vue';
import Ratings from '../pages/Shop/Ratings/Ratings.vue';
import Info from '../pages/Shop/Info/Info.vue';

export default [
  {
    path: '/msite',
    component: Msite,
    meta: {
     isShow: true
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      isShow: true
    }
  },
  {
    path: '/order',
    component: Order,
    meta: {
      isShow: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      isShow: true
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/shop',
    component: Shop,
    children: [
      {
        path: '/shop/goods',
        component: Goods
      },
      {
        path: '/shop/ratings',
        component: Ratings
      },
      {
        path: '/shop/info',
        component: Info
      },
      {
        path: '',
        redirect: '/shop/goods'
      }
    ]
  },
  {
    path: '/',
    redirect: '/msite'
  }
]
