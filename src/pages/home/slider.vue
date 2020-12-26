<template>
  <div class="slide-wrapper">
    <me-slider
      :direction="direction"
      :loop="loop"
      :interval="interval"
      :pagination="pagination"
    >
    <swiper-slide
      v-for="(item, index) in sliders"
      :key="index"
    >
      <a :href="item.linkUrl" class="slider-link">
        <img :src="item.picUrl" alt="" class="slider-img">
      </a>
    </swiper-slide>
  </me-slider>
  </div>
</template>

<script>
  import MeSlider from 'base/slider';
  import {SwiperSlide} from 'vue-awesome-swiper';
  import {sliderOptions} from './config';
  export default {
    name: 'HomeSlider',
    components: {
      MeSlider,
      SwiperSlide
    },
    data() {
      return {
        direction: sliderOptions.direction,
        loop: sliderOptions.loop,
        interval: sliderOptions.interval,
        pagination: sliderOptions.pagination,
        sliders: [
          {
            'linkUrl': 'www.baidu.com',
            'picUrl': require('./1.jpg')
          },
          {
            'linkUrl': 'www.baidu.com',
            'picUrl': require('./2.jpg')
          },
          {
            'linkUrl': 'www.baidu.com',
            'picUrl': require('./3.jpg')
          },
          {
            'linkUrl': 'www.baidu.com',
            'picUrl': require('./4.jpg')
          }
        ]
      };
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixin";
  .slide-wrapper {
    height: 183px;
  }
  .slider-link{
    display: block;
  }

  .slider-link,
  .slider-img{
    width: 100%;
    height: 100%;
  }
</style>
