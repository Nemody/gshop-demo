/**
 * 路由器管理模块，配置路由
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes
})
/*
Q1：
  项目打包之后再生产环境运行时，如果访问http://localhost:5000则正常显示页面
  如果访问其他路由如/login  /shop/goods 等，则会出现404的错误
原因：
  因为访问时会向服务器发送请求，服务器将其作为后台路由处理，没有匹配的路由中间件处理，所以返回404错误
  而访问5000时，返回页面为index.html，此时点击跳转至/login  /shop/goods 则当作前台路由解析，没有问题
解决方法：
  在服务器端路由中间件下面定义一个自定义的中间件，用于处理所有路由中间件不能匹配的路由，全部返回index.html页面
  执行过程为：若路由中间件没有解析当前访问的路由，则交由下方的自定义中间件处理，返回首页，路由也会被当作前台路由处理
注意：定义路由时前台路由与后台路由不要重名
* */
