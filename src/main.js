import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import fastclick from 'fastclick';
import VueLazyload from 'vue-lazyload';

import 'assets/scss/index.scss';
import 'swiper/swiper-bundle.css';

fastclick.attach(document.body);

Vue.use(VueLazyload, {
  preload: 1,
  error: require('assets/img/error.png'),
  loading: require('assets/img/loading.png'),
  attempt: 1
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
