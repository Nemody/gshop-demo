<template>
  <section class="msite">
    <!--首页头部-->
    <Header :title="address.name || '正在定位中...'">
      <router-link class="header_search" slot="search" to="/search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link class="header_login" slot="login" to="/login">
        <span class="header_login_text">登录|注册</span>
      </router-link>
    </Header>
    <!--<header class="header">
      <span class="header_search">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_title">
        <span class="header_title_text ellipsis">昌平区北七家宏福科技园(337省道北)</span>
      </span>
      <span class="header_login">
        <span class="header_login_text">登录|注册</span>
      </span>
    </header>-->
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categories, index) in categoriesArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category, index) in categories" :key="index">
              <div class="food_container">
                <img :src="baseImageUrl + category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <ShopList />
  </section>
</template>
<script>
  import 'swiper/dist/css/swiper.min.css';
  import Swiper from 'swiper';
  import {mapState} from 'vuex';
  import ShopList from '../ShopList/ShopList.vue';
  export default {
    data () {
      return {
        baseImageUrl: 'https://fuss10.elemecdn.com'
      }
    },
    components: {
      ShopList
    },
    computed: {
      ...mapState(['address', 'categories']),
      categoriesArr () {
        let bigArr = [];
        let smallArr = [];
        const {categories} = this;
        categories.forEach(categories => {
          // 遍历商品分类，最终生成一个二维数组
          if (smallArr.length === 0) {
            bigArr.push(smallArr);
          }

          smallArr.push(categories);

          if (smallArr.length >= 8) {
            smallArr = [];
          }
        });
        return bigArr;
      }
    },
    mounted () {
      this.$store.dispatch('getShops');
      this.$store.dispatch('getCategories');
    },
    watch: {
      categories () {
        this.$nextTick(() => {
          /* eslint-disable no-new */
          new Swiper('.swiper-container', {
            direction: 'horizontal', // 垂直切换选项
            loop: true, // 循环模式选项
            /* autoplay: {
              delay: 1000 // 1秒切换一次
            },
            */
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination'
            }
          })
        })
      }
    }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixins.styl'
  .msite  //首页
    width 100%
    .header
      background-color #02a774
      position fixed
      z-index 100
      left 0
      top 0
      width 100%
      height 45px
      .header_search
        position absolute
        left 15px
        top 50%
        transform translateY(-50%)
        width 10%
        height 50%
        .icon-sousuo
          font-size 25px
          color #fff
      .header_title
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        width 50%
        color #fff
        text-align center
        .header_title_text
          font-size 20px
          color #fff
          display block
      .header_login
        font-size 14px
        color #fff
        position absolute
        right 15px
        top 50%
        transform translateY(-50%)
        .header_login_text
          color #fff
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
</style>
