// 路由器对象模块
import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

// 声明并使用
Vue.use(VueRouter)

export default new VueRouter({
  // 去掉 #
  mode: 'history',
  routes
})
