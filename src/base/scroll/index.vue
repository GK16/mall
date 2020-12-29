<template>
  <swiper :options="swiperOption" ref="swiper">
    <div class="mine-scroll-pull-down" v-if="pullDown">
      <me-loading
        :text="pullDownText"
        inline
        ref="pullDownLoading"
      >
      </me-loading>
    </div>
    <swiper-slide>
      <slot></slot>
    </swiper-slide>
    <div class="mine-scroll-pull-up" v-if="pullUp">
      <me-loading
        :text="pullUpText"
        inline
        ref="pullUpLoading"
      >
      </me-loading>
    </div>
    <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
  </swiper>
</template>

<script>
  import {Swiper, SwiperSlide} from 'vue-awesome-swiper';
  import MeLoading from 'base/loading';
  import { // 下拉上拉的提示文字
    PULL_DOWN_HEIGHT,
    PULL_DOWN_TEXT_INIT,
    PULL_DOWN_TEXT_START,
    PULL_DOWN_TEXT_ING,
    PULL_DOWN_TEXT_END,
    PULL_UP_HEIGHT,
    PULL_UP_TEXT_INIT,
    PULL_UP_TEXT_START,
    PULL_UP_TEXT_ING,
    PULL_UP_TEXT_END
  } from './config';

  export default {
    name: 'MeScroll',
    components: {
      Swiper,
      SwiperSlide,
      MeLoading
    },
    props: {
      scrollbar: {
        type: Boolean,
        default: true
      },
      data: {
        type: [Array, Object]
      },
      pullDown: {
        type: Boolean,
        default: false
      },
      pullUp: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      data() {
        this.update();
      }
    },
    created() {
      this.init();
    },
    methods: {
      update() {
        console.log(this.$refs.swiper);
        this.$refs.swiper && this.$refs.swiper.updateSwiper();
      },
      scrollToTop(speed, runCallBacks) {
        this.$refs.swiper && this.$refs.swiper.slideTo(0, speed, runCallBacks);
      },

      init() {
        this.pulling = false;
        this.pullDownText = PULL_DOWN_TEXT_INIT;
        this.pullUpText = PULL_UP_TEXT_INIT;
        this.swiperOption = {
          direction: 'vertical',
          slidePerView: 'auto',
          freeMode: true,
          setWrapperSize: true,
          scrollbar: {
            el: this.scrollbar ? '.swiper-scrollbar' : null,
            hide: true
          },
          on: {
            sliderMove: this.scroll,
            touchEnd: this.touchEnd,
            transitionEnd: this.scroolEnd
          }
        };
      },
      scroll() {
        const swiper = this.$refs.swiper.$swiper;

        this.$emit('scroll', swiper.translate, this.$refs.swiper.$swiper);

        if (this.pulling) return;

        if (swiper.translate > 0) {
          if (!this.pullDown) return;
          if (swiper.translate > PULL_DOWN_HEIGHT) {
            this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_START);
          } else {
            this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_INIT);
          }
        } else if (swiper.isEnd) {
          if (!this.pullUp) return;

          const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > parseInt(swiper.$wrapperEl.css('height'));
          if (isPullUp) {
            this.$refs.pullDownLoading.setText(PULL_UP_TEXT_START);
          } else {
            this.$refs.pullDownLoading.setText(PULL_UP_TEXT_INIT);
          }
        }
      },
      scroolEnd() {
        const swiper = this.$refs.swiper.$swiper;
        this.$emit('scrollEnd', swiper.translate, this.$refs.swiper.$swiper);
      },
      touchEnd() {
        if (this.pulling) return;

        const swiper = this.$refs.swiper.$swiper;
        if (swiper.translate > PULL_DOWN_HEIGHT) {
          if (!this.pullDown) return;

          this.pulling = true;
          swiper.allowTouchMove = false;
          swiper.setTransition(swiper.params.speed);
          swiper.setTranslate(PULL_DOWN_HEIGHT);
          swiper.params.virtualTranslate = true;
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_ING);
          this.$emit('pull-down', this.pullDownEnd);
        } else if (swiper.isEnd) { // 判断是否到了底部
          const totalHeight = parseInt(swiper.$wrapperEl.css('height'));
          const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > totalHeight;

          // 上拉
          if (isPullUp) {
            // 如果没有设置上拉,直接退出
            if (!this.pullUp) {
              return;
            }
            this.pulling = true; // 设置为正在拉
            swiper.allowTouchMove = false; // 禁止触摸
            swiper.setTransition(swiper.params.speed);
            swiper.setTranslate(-(totalHeight + PULL_UP_HEIGHT - swiper.height));
            swiper.params.virtualTranslate = true; // 定住不给回弹
            this.$refs.pullUpLoading.setText(PULL_UP_TEXT_ING);
            this.$emit('pull-up', this.pullUpEnd); // // 上拉加载完毕后触发父组件的一个事件,并传一个函数过去
          }
        }
      },
      pullDownEnd() {
        const swiper = this.$refs.swiper.$swiper;
        this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_END);
        swiper.params.virtualTranslate = false;
        swiper.allowTouchMove = true;
        swiper.setTransition(swiper.params.speed);
        swiper.setTranslate(0);
        this.pulling = false;

        setTimeout(() => {
          this.$emit('pull-down-transition-end');
        }, swiper.params.speed);
      },
      // 上拉加载完毕之后
      pullUpEnd() {
        const swiper = this.$refs.swiper.swiper;
        this.pulling = false;
        this.$refs.pullUpLoading.setText(PULL_UP_TEXT_END);
        swiper.params.virtualTranslate = false;
        swiper.allowTouchMove = true;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .swiper-container {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  .swiper-wrapper{
    height: auto;
  }

  .swiper-slide {
    height: auto;
  }

  .mine-scroll-pull-down {
    position: absolute;
    left: 0;
    bottom: 100%;
    width: 100%;
    height: 80px;
  }

  /*上拉加载*/
  .mine-scroll-pull-up {
      top: 100%;
      height: 30px;
    }
</style>
