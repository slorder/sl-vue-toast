// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import axios from 'axios'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './style/mymint.scss';
import Qs from 'qs'
import FastClick from 'fastclick'
import {filterFixed} from './mixins/filter'
import {baseUrl, imgBaseUrl} from './config/env'
import {Toast, Indicator} from 'mint-ui'//引入mint-ui弹窗以及加载时转圈

// import VueLazyload from 'vue-lazyload'  //引入这个懒加载插件


if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}


Vue.config.productionTip = false;
axios.defaults.withCredentials = true;
// axios.defaults.timeout =  6000;


Vue.use(MintUI);
// Vue.use(VueLazyload)
// 或者添加VueLazyload 选项
// Vue.use(VueLazyload, {
//   preLoad: 1,
//   error: '../static/img/m1.jpg',
//   loading: '../static/img/imgloading.gif',
//   attempt: 1
// })

Vue.prototype.imgHost = imgBaseUrl;


//路由方向控制
Vue.prototype.transitionName = 'slide-left';

Vue.prototype.hrefName = function (name) {
  this.$store.commit('setActive', name);
  this.$router.push({name: name});
}

Vue.prototype.bindPathName = function (name) {
  if (this.$route.query.goback) {
    this.$router.push({name: name, query: {goback: this.$route.query.goback, goto: this.$route.query.goto}})
  } else {
    this.$router.push({name: name})
  }
}

//localStorage统一方法
Vue.prototype.localData = function (method, name, str) {
  switch (method) {
    case 'get':
      var getStr = '';
      try {
        getStr = localStorage.getItem(name);
      } catch (err) {
        return null;
      }
      return getStr;
    case 'set':
      localStorage.setItem(name, str);
      break;
    case 'remove':
      localStorage.removeItem(name);
      break;
    default:
      return '请填写正确的参数';
  }
}

//微信支付提醒
Vue.prototype.isWebCat = function () {
  var isOpenId = localStorage.getItem('openid')
  if (!isOpenId) {
    alert('请在微信公众号打开完成支付');
    setTimeout(function () {
      location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx96eaa45a5a703b6a&redirect_uri=http://t.2858.com/ceshi/kong&response_type=code&scope=snsapi_userinfo#wechat_redirect';
    },300)
    return true;
  }
  return false;
}


//综合请求
Vue.prototype.ajax = function (options) {
  let that = this;
  Indicator.open();
  // if (!navigator.onLine) {
  //   Toast('网络已断开');
  //   return;
  // }
  axios({
    url: baseUrl + options.url,
    method: options.method || 'GET',
    headers: options.headers || null,
    data: options.data ? Qs.stringify(options.data) : null,
  }).then(function (res) {
      console.log(res)
      Indicator.close();
      if (res.status == 200) {
        options.success(res.data)
        try{
          if(res.data.data.status == 1008){
            localStorage.removeItem('memberId');
            localStorage.removeItem('tempMemberId');
            localStorage.removeItem('username');
            Toast('请重新登陆');
            that.$router.push({path: '/index'});
          }
        }catch (err){

        }
        // switch (res.data.status) {
        //   case 1001:
        //     Toast('用户不存在');
        //     return;
        //   case 1002:
        //     Toast('用户不存在');
        //     return;
        //   case 1003:
        //     Toast('用户已注册');
        //     return;
        //   case 1004:
        //     Toast('用户未注册');
        //     return;
        //   case 1005:
        //     Toast('用户不存在');
        //     return;
        //   case 1006:
        //     Toast('用户名或密码错误');
        //     return;
        //   case 1007:
        //     Toast('openId不存在,请绑定手机!');
        //     return;
        //   case 1008:
        //     Toast('NEED_LOGIN');
        //     return;
        //   case 1009:
        //     Toast('ILLEGAL_ARGUMENT');
        //     return;
        //   case 1010:
        //     Toast('LOGIN_AGAIN');
        //     return;
        //   case 1011:
        //     Toast('临时用户session失效!');
        //     return;
        //   default:
        //     return;
        // }
      }
    }
  ).catch(function (error) {
    Indicator.close();
    // alert(error);
  });
}

Vue.filter('filterFixed', filterFixed);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
