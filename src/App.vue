<template>
   <div id="app">
     <router-view />
     <FooterGuide v-show="$route.meta.isShow" />
   </div>
</template>
<script>
  import FooterGuide from './components/FooterGuide/FooterGuide.vue';
  export default {
    components: {
      FooterGuide
    },
    mounted () {
      // 获取当前地址数据
     this.$store.dispatch('getAddress');
     // 获取当前用户信息，实现自动登陆
      this.$store.dispatch('getUserInfo');
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
