
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Header from './components/Header/Header.vue';

Vue.component('Header',Header);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
