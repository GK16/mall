<template>
  <swiper :options="swiperOption">
    <swiper-slide>
      <slot></slot>
    </swiper-slide>
    <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
  </swiper>
</template>

<script>
  import {Swiper, SwiperSlide} from 'vue-awesome-swiper';
  export default {
    name: 'MeScroll',
    components: {
      Swiper,
      SwiperSlide
    },
    props: {
      scrollbar: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        swiperOption: {
          direction: 'vertical',
          slidePerView: 'auto',
          freeMode: true,
          setWrapperSize: true,
          scrollbar: {
            el: this.scrollbar ? '.swiper-scrollbar' : null,
            hide: true
          }
        }
      };
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixin";
  .swiper-container {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  .swiper-wripper{
    height:auto;
  }

  .swiper-slide {
    height: auto;
  }
</style>
