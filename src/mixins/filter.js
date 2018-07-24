import {imgBaseUrl} from '../config/env'

//时间显示格式
const filterTime = function (val) {
  if (val == null) {
    return '';
  }
  val = Number(val);
  // return (new Date(val)).Format('yyyy-MM-dd hh:mm:ss')
  return (new Date(val)).Format('yyyy年MM月dd日')
}


Date.prototype.Format = function (fmt) {
  let o = {
    "M+": this.getMonth() + 1,         // 月份
    "d+": this.getDate(),          // 日
    "h+": this.getHours(),          // 小时
    "m+": this.getMinutes(),         // 分
    "s+": this.getSeconds(),         // 秒
    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
    "S": this.getMilliseconds()       // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
};

const filterParse = function (val) {
  try {
    let str = '';
    let obj = JSON.parse(val);
    for (var i = 0, l = obj.length; i < l; i++) {
      for (var key in obj[i]) {
        if (obj[i][key].trim() != '') {
          str += key + ':';
          str += obj[i][key] + ' ';
          str += obj[i][key] + ' ';
        }
      }
    }
    return str;
  } catch (err) {
    return val;
  }

};

const filterFixed = function (val) {
  return Number(val).toFixed(2);
};

const filterMainImg = function (val) {
  if(val && val.length){
    for (var i = 0, l = val.length; i < l; i++) {
      if (val[i]) {
        return imgBaseUrl + val[i];
      }
    }
  }
  return '无图片';
}

const filterStatus = function (val) {
  var val = Number(val);
  switch (val) {
    case 0:
      return '取消';
    case 10:
      return '待付款';
    case 30:
      return '待发货';
    case 40:
      return '支付失败';
    case 60:
      return '待收货';
    case 70:
      return '已完成';
    case 80:
      return '交易关闭';
    case 90:
      return '已过期';
    case 100:
      return '退款中';
    default:
      return '无该状态值';
  }

}

export {filterTime, filterParse, filterFixed, filterMainImg, filterStatus}
