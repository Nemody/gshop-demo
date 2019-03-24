
import Vue from 'vue';
import {Button} from 'mint-ui';
import VueLazyload from 'vue-lazyload'
import App from './App.vue';
import router from './router';
import store from './store';
import Header from './components/Header/Header.vue';
import Star from './components/Star/Star.vue';
import CartControl from './components/CartControl/CartControl.vue';
import Split from './components/Split/Split.vue';
import loading from './common/images/loading.gif'
import './mock/mockServer';

Vue.component('Header',Header);
Vue.component('Star',Star);
Vue.component('CartControl',CartControl);
Vue.component('Split',Split);
Vue.component(Button.name, Button);
Vue.use(VueLazyload, {
  loading
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
