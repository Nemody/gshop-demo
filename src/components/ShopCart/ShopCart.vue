<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight: totalCount}">
              <i class="iconfont icon-shopping_cart" :class="{highlight: totalCount}"></i>
            </div>
            <div class="num" v-show="totalCount">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight: totalCount}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥4元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">
            {{payText}}
          </div>
        </div>
      </div>
      <transition name="move">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clearCartFoods">清空</span>
          </div>
          <div class="list-content">
            <ul>
              <li class="food" v-for="(food, index) in cartFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price"><span>￥{{food.price}}</span></div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food"/>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="toggleShow"></div>
    </transition>
  </div>
</template>
<script>
  import {mapState, mapGetters} from 'vuex';
  import BScroll from 'better-scroll';
  export default {
    data () {
      return {
        isShowCart: false
      }
    },
    methods: {
      toggleShow () {
        // 只有当总数量不为0时，才进行切换显示
        if (this.totalCount > 0) {
          this.isShowCart = !this.isShowCart;
        }
      },
      clearCartFoods () {
        this.$store.dispatch('clearCartFoods');
      }
    },
    computed: {
      ...mapState({
          cartFoods: state => state.shop.cartFoods,
          info: state => state.shop.info
      }),
      ...mapGetters(['totalCount', 'totalPrice']),
      payText () {
        const {totalPrice} = this;
        const {minPrice} = this.info;
        if (totalPrice === 0) {
          return `￥${minPrice}元起送`;
        } else if (totalPrice < minPrice) {
          return `还差￥${minPrice - totalPrice}元起送`;
        } else {
          return '去结算';
        }
      },
      payClass () {
        const {totalPrice} = this;
        const {minPrice} = this.info;
        return totalPrice < minPrice ? 'not-enough' : 'enough';
       },
      listShow () {
        // 如果总数量为0 ，直接为false不显示购物车列表
        // 解决购物车中没有食品时仍旧显示列表的问题
        if (this.totalCount === 0) {
          // 解决点击添加食品后，购物车自动打开的问题
          this.isShowCart = false;
          return false;
        }
        // 解决购物车列表不能滑动的问题
        if (this.isShowCart) {
          // 倘若列表是显示状态，创建scroll对象，实现列表滑动效果
         /*
          实现滑动效果后会导致一个问题，每一次添加food.count，都要重新计算totalCount
          listShow为一计算属性，则totalCount的更新必然导致listShow的重新计算，相当于每一次都重新创建一个scroll对象
          在BScroll中，对于事件的响应通过scroll对象来管理，所以每一个scroll都会对事件触发做出响应，就产生了这个问题
          解决的思路为：保证scroll对象为一单例对象，即同一个区域只能存在一个scroll对象
          实现： 创建前，判断不存在；创建后，保存对象，为下一次判断做准备
          */
          /* eslint-disable no-new */
         this.$nextTick(() => {
           // 如果没有scroll对象，则创建一个新的；反之不再创建
           if (!this.scroll) {
             this.scroll = new BScroll('.list-content', {
               click: true
             })
           } else {
             /*
             Q1:
             当列表内容高度没有超出列表可视高度时，点击显示购物车，然后隐藏购物车，加入多项食品后，列表不能滑动了
              原因： scroll对象只在列表初次显示时创建一次，当再次打开时，scroll对象未收到列表更新的通知，所以不能
                      按照最新的列表高度添加滑动高度
             解决办法： 调用scroll对象的refresh方法，更新列表
             Q2:
              当列表用v-if来控制显示与隐藏时，上述问题仍然存在
              原因： 滑动效果依靠ul上添加的style样式的transform(translateY)实现
                      v-if时通过删除DOM元素的方式实现元素的显示/隐藏，当初次创建完成scroll对象后，隐藏列表即将ul删除
                      再次显示时创建一个新的ul，但scroll对象因为已存在，故不会创建新的，所以更新后ul上没有style样式
                      自然无法实现滑动效果
              解决方法： 用v-show代替v-if实现购物车列表的显示/隐藏效果
              总结：v-show与v-if的区别在于：前者控制display实现显示/隐藏，后者通过创建/删除元素实现显示/隐藏
                    频繁操作DOM的话，v-show更好一点。但某些特殊场景下，用v-if更好一点，比如本案例中在shopHeader组件中
                    当使用3层表达式a.b.c来读取某个属性值，而在初始化阶段a为空对象，a.b为undefined，此时再往下读取c就会报错
                    此时要想解决初始显示异常的问题，就用v-if控制当a.b有值时才编译解析当前模板
                    若用v-show，则在初始显示时模板依然会被解析，只是不显示而已，依然报错
             */
             this.scroll.refresh();
           }
         });
        }
        return this.isShowCart;
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: $green
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #ffffff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform translateY(-100%)
      &.move-enter-active, &.move-leave-active
        transition all .3s
      &.move-enter, &.move-leave-to
        transform translateY(0)
        opacity 0
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)

      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px

  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.3s
    &.fade-enter, &.fade-leave-to
      opacity: 0
</style>
