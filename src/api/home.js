import axios from 'axios';
import jsonp from 'assets/js/jsonp';
import {SUCC_CODE, TIMEOUT, HOME_RECOMMEND_PAGE_SIZE, jsonpOptions} from './config';

export const getHomeSlider = () => {
  return axios.get('http://www.imooc.com/api/home/slider', {
    timeout: TIMEOUT
  })
    .then(res => {
      if (res.data.code === SUCC_CODE) {
        return res.data.slider;
      }

      throw new Error('没有成功获取数据');
    }).catch(err => {
      if (err) {
        console.log(err);
      }

      return [
        {
          linkUrl: 'http://www.baidu.com',
          picUrl: require('assets/img/404.png')
        }
      ];
    }).then(data => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(data);
        }, 1000);
      });
  });
};

// 获取热门推荐数据--jsonp
export const getHomeRecommend = (page = 1, psize = HOME_RECOMMEND_PAGE_SIZE) => {
  const url = 'https://ju.taobao.com/json/tg/ajaxGetItemsV2.json';
  const params = {
    page,
    psize,
    type: 0,
    frontCatId: ''
  };

  return jsonp(url, params, jsonpOptions) // 调用src/accets/js/jsonp.js 暴露出来的方法,返回的是个promise对象;jsonpOptions是api/config.js下配置的参数
    .then(res => {
      if (res.code === '200') {
        return res;
      }
      throw new Error('没有成功获取到数据'); // 抛出异常
    })
    .catch(err => {
      if (err) {
        console.log(err);
      }
    }).then(data => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(data);
        }, 1000);
      });
  });
};
