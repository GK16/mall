<template>
  <transition name="mine-backtop">
    <!-- v-show 控制元素的显示隐藏 -->
    <a
      href="javascript:;"
      class="mine-backtop"
      v-show="visible"
      @click="backToTop" >
      <i class="iconfont icon-fanhuidingbu"></i>
    </a>
  </transition>
</template>

<script>
  export default {
    name: 'MeBacktop',
    props: {
      visible: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      backToTop() {
        this.$emit('backtop');
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixin";

  .mine-backtop {
    overflow: hidden;
    @include flex-center();
    width: 45px;
    height: 45px;
    background-color: rgba(0, 0, 0, 0.6);
    border: none;
    border-radius: 50%;

    .iconfont {
      color: #fff;
      font-size: 38px;
    }
  }

  .mine-backtop {
    &-enter-active,
    &-leave-active {
      transition: opacity 0.4s;
    }

    &-enter,
    &-leave-to {
      opacity: 0;
    }
  }
</style>
