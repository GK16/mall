<template>
  <me-navbar class="header">
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
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixin";
  .header {
    &.mine-navbar{
      // background-color: transparent;
      background-color: $header-bgc-translucent;

    }

    .iconfont {
      color: $icon-color-default;
      font-size: $icon-font-size;
    }
  }
</style>
