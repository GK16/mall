<template>
  <me-navbar class="header" title="title" v-show="visible">
    <i class="iconfont icon-richscan_icon" slot="left"></i>
    <div slot="center">搜索框</div>
    <i class="iconfont icon-xiaoxi" slot="right"></i>
  </me-navbar>
</template>

<script>
  import MeNavbar from 'base/navbar';
  export default {
    name: 'HomeHeader',
    components: {
      MeNavbar
    },
    data() {
      return {
        visible: true
      };
    },
    methods: {
      show() {
        this.visible = true;
      },
      hide() {
        this.visible = false;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixin";
  .header {
    &.mine-navbar{
      background-color: transparent;
      transition: background-color 0.5s;
    }

    .iconfont {
      color: $icon-color-default;
      font-size: $icon-font-size;
    }

    &.header-transition {
      background-color: $header-bgc-translucent;
    }
  }
</style>
