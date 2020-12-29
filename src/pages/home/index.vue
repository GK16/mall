<template>
  <div class="home">
    <header class="g-header-container">
      <home-header></home-header>
    </header>
    <me-scroll
      :data="recommends"
      pullDown
      pullUp
      @pull-down="pullToRefresh"
      @pull-up="pullToLoadMore"
    >
      <home-slider ref="slider"></home-slider>
      <home-nav></home-nav>
      <home-recommend @loaded='getRecommends' ref="recommend"></home-recommend>
    </me-scroll>
    <div class="g-backtop-container"></div>
    <router-view></router-view>
  </div>
</template>

<script>
  import HomeHeader from './header';
  import HomeSlider from './slider';
  import MeScroll from 'base/scroll';
  import HomeNav from './nav';
  import HomeRecommend from './recommend';
  export default {
    name: 'Home',
    components: {
      HomeHeader,
      HomeSlider,
      MeScroll,
      HomeNav,
      HomeRecommend
    },
    data() {
      return {
        recommends: []
      };
    },
    methods: {
      getRecommends(recommends) {
        this.recommends = recommends;
      },
      pullToRefresh(pullDownEnd) {
        this.$refs.slider.update().then(pullDownEnd);
        // setTimeout(() => {
        //   console.log('freshed');
        //   pullDownEnd();
        // }, 1000);
      },
      pullToLoadMore(pullUpEnd) {
        // setTimeout(() => {
        //   console.log('freshed');
        //   pullUpEnd();
        // }, 1000);
        this.$refs.recommend.update().then(pullUpEnd).catch(err => {
          if (err) {
            console.log(err);
          }
          pullUpEnd();
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixin";
  .home {
    overflow: hidden;
    width: 100%;
    height: 100%;
    background-color: $bgc-theme;
  }
</style>
