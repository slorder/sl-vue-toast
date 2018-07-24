/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

//测试服务器地址
let baseUrl = 'http://172.16.1.55:8080/yc-shop/api';
let imgBaseUrl = 'http://172.16.1.55:8080/ycshop';
baseUrl = 'http://t.2858.com/yc-shop/api';
imgBaseUrl = 'http://t.2858.com/ycshop';

if (process.env.NODE_ENV == 'development') {


} else if (process.env.NODE_ENV == 'production') {
  baseUrl = 'http://t.2858.com/yc-shop/api';
  imgBaseUrl = 'http://t.2858.com/ycshop';
}

export {baseUrl, imgBaseUrl}
