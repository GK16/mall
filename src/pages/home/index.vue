<template>
  <div class="home">
    <header class="g-header-container">
      <home-header
        :class="{'header-transition': isHeaderTransition}"
        ref="header"
      ></home-header>
    </header>
    <me-scroll
      :data="recommends"
      pullDown
      pullUp
      @pull-down="pullToRefresh"
      @pull-up="pullToLoadMore"
      @scroll-end="scrollEnd"
      @scroll="scroll"
      @pull-down-transition-end="pullDownTransitionEnd"
      ref="scroll"
    >
      <home-slider ref="slider"></home-slider>
      <home-nav></home-nav>
      <home-recommend @loaded='getRecommends' ref="recommend"></home-recommend>
    </me-scroll>
    <div class="g-backtop-container">
      <me-back-top :visible="isBacktopVisibel" @backtop="backToTop"></me-back-top>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import HomeHeader from './header';
  import HomeSlider from './slider';
  import MeScroll from 'base/scroll';
  import MeBackTop from 'base/backtop';
  import HomeNav from './nav';
  import HomeRecommend from './recommend';
  import {HEADER_TRANSITION_HEIGHT} from './config';
  export default {
    name: 'Home',
    components: {
      HomeHeader,
      HomeSlider,
      MeScroll,
      HomeNav,
      HomeRecommend,
      MeBackTop
    },
    data() {
      return {
        recommends: [],
        isBacktopVisibel: false,
        isHeaderTransition: false
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
      },
      scrollEnd(translate, scroll, pulling) {
        if (!pulling) {
          this.changeHeaderStatus(translate);
        }
        this.isBacktopVisibel = translate < 0 && -translate > scroll.height;
      },
      scroll(translate) {
        this.changeHeaderStatus(translate);
      },
      pullDownTransitionEnd() {
        // this.$refs.header.show();
      },
      backToTop() {
        this.$refs.scroll && this.$refs.scroll.scrollTop();
      },
      changeHeaderStatus(translate) {
        if (translate > 0) {
          this.$refs.header.hide();
          return;
        }
        this.$refs.header.show();
        this.isHeaderTransition = -translate > HEADER_TRANSITION_HEIGHT;
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
  .g-backtop-container {
    right: 30px;
    bottom: 70px;
  }
</style>
