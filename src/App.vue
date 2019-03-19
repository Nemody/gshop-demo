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
     this.$store.dispatch('getAddress');
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
