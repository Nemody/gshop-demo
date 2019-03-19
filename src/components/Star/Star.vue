<template>
  <div class="star" :class="`star-${size}`">
    <span class="star-item on" v-for="(className, index) in starClasses" :key="index" :class="className"></span>
  </div>
</template>
<script>
  export default {
      props: {
        rating: Number,
        size: Number
      },
    computed: {
        starClasses () {
          /* 返回的数据为包含由评分得出的类名的数组 初始为空
            类名：on---->全星
                 half--->半星
                 off---->灰色的星
           */
          let classesArr = [];
          const {rating} = this;
          const onStarCount = Math.floor(rating);
          for (let i = 0; i < onStarCount; i++) {
            classesArr.push('on')
          }
          if (rating * 10 - onStarCount * 10 > 5) {
            classesArr.push('half')
          }
          while (classesArr.length < 5) {
            classesArr.push('off')
          }
          return classesArr;
        }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

  @import '../../common/stylus/mixins.styl'
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/stars/star48_on')
        &.half
          bg-image('./images/stars/star48_half')
        &.off
          bg-image('./images/stars/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star36_on')
        &.half
          bg-image('./images/stars/star36_half')
        &.off
          bg-image('./images/stars/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star24_on')
        &.half
          bg-image('./images/stars/star24_half')
        &.off
          bg-image('./images/stars/star24_off')
</style>
