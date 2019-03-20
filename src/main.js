
import Vue from 'vue';
import {Button} from 'mint-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import Header from './components/Header/Header.vue';
import Star from './components/Star/Star.vue';


Vue.component('Header',Header);
Vue.component('Star',Star);
Vue.component(Button.name, Button);
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
