<template>
   <div id="app">
     <router-view />
     <FooterGuide v-show="$route.meta.isShow" />
   </div>
</template>
<script>
  import {reqAddress} from './api'
  import FooterGuide from './components/FooterGuide/FooterGuide.vue';
  export default {
    components: {
      FooterGuide
    },
    async mounted () {
      const result = await reqAddress('116.36867', '40.10038');
      console.log(result);
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
