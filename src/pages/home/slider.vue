<template>
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
</template>

<script>
  import MeSlider from 'base/slider';
  import {swiperSlide} from 'vue-awesome-swiper';
  export default {
    name: 'HomeSlider',
    components: {
      MeSlider,
      swiperSlide
    },
    data() {
      return {
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
</style>
