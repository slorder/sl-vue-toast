<template>
  <!--我的-->
  <div id="me" class="left">
    <home-header :title="'我的'" :back="true" :hideHead="true"></home-header>
    <div class="userInfo">
      <div class="userImg">
        <img :src="imgList[0].img" alt="">
      </div>
      <p class="ners" @click="Login()">{{userName}}</p>
    </div>
    <div class="order">
      <div class="orderTop" @click="asOrder('全部订单')">
        <span>我的订单</span>
        <span>查看所有订单<i class="iconfont icon-arrow-right-copy"></i></span>
      </div>
      <ul class="orderType">
        <li @click="asOrder('待付款')">
          <i class="iconfont icon-daifukuan1"></i>
          <span>待付款</span>
          <b>{{forPaymentNum}}</b>
        </li>
        <li @click="asOrder('待发货')">
          <i class="iconfont icon-daifahuo"></i>
          <span>待发货</span>
          <b>{{toSendNum}}</b>
        </li>
        <li @click="asOrder('待收货')">
          <i class="iconfont icon-daishouhuo1"></i>
          <span>待收货</span>
          <b>{{harvestedNum}}</b>
        </li>
        <li @click="asOrder('退款/退货')">
          <i class="iconfont icon-tuikuan"></i>
          <span>退款/退货</span>
          <b>{{refundsNum}}</b>
        </li>
      </ul>
    </div>
    <ul class="personalList">
      <li @click="asLogin('addressList')"><span>管理收货地址</span><i class="iconfont icon-arrow-right"></i></li>
      <li @click="asLogin('myCoupons')"><span>我的优惠券</span><i class="iconfont icon-arrow-right"></i></li>
      <li @click="asLogin('resetPwd')"><span>修改密码</span><i class="iconfont icon-arrow-right"></i></li>
      <li @click="$router.push({path:'/problem'})"><span>常见问题</span><i class="iconfont icon-arrow-right"></i></li>
      <a href="tel:4000619719"><span>在线客服</span><i class="iconfont icon-arrow-right"></i></a>
    </ul>
    <div class="mine-logout" @click="logout()" v-if="logoutShow">
      退出当前账号
    </div>
    <div class="home-main-footer" :class="isWeixin?'noWei':''">
      <i class="iconfont"></i><span>货嚯商城</span>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import homeHeader from '../../components/header/header.vue'

  export default {
    data() {
      return {
        logoutShow: false,
        isWeixin:false,
        userName: '登录/注册',
        imgList: [{
          img: "/static/logo.jpg"
        }],
        forPaymentNum: 0,   //待付款订单数量
        toSendNum: 0,       //待发货订单数量
        harvestedNum: 0,    //待收获订单数量
        refundsNum: 0,      // 退货退款订单数量
      }
    },
    components: {
      homeHeader,
    },
    methods: {
      //验证是否登录
      isLogin() {
        let that = this;
        var openid = that.localData('get', 'openid');
        var headimgurl = that.localData('get', 'headimgurl')
        var nickname = that.localData('get', 'nickname');
        var memberId = that.localData('get', 'memberId');
        var username = that.localData('get', 'username');
        if (openid) {
          that.userName = nickname;
          that.imgList[0].img = headimgurl;
          that.logoutShow = false;
          that.isWeixin=true;
        } else {
          if (memberId) {
            that.userName = username;
            that.logoutShow = true;
            that.isWeixin=false;
          } else {
            that.userName = '登录/注册';
            that.logoutShow = false;
            that.isWeixin=true;
          }
        }
      },
      getStatusNum() {
        let that = this;
        var memberId = that.localData('get', 'memberId');
        if (memberId) {
          that.ajax({
            url: '/order/getStatusList?memberId=' + memberId,
            success: function (res) {
              if (res.status == 1000) {
                var info = res.data;
                for(var i in info){
                  if (info[i].status == 10) {
                    that.forPaymentNum = info[i].number
                  }
                  if (info[i].status == 30) {
                    that.toSendNum = info[i].number
                  }
                  if (info[i].status == 60) {
                    that.harvestedNum = info[i].number
                  }
                }
              }
            }
          })
        }
      },
      //未登录时点击登录跳转到登录页面。
      Login() {
        let that = this;
        var memberId = that.localData('get', 'memberId');
        var username = that.localData('get', 'username');
        if (!memberId) {
          that.$router.push({path: '/login'})
        }
      },
      asOrder(val) {
        let that = this;
        var memberId = that.localData('get', 'memberId');
        if (memberId) {
          this.$router.push({path: '/myOrder', query: {title: val}})
        } else {
          Toast('您还未登录，请先登录')
        }
      },
      asLogin(val) {
        let that = this;
        var memberId = that.localData('get', 'memberId');
        if (memberId) {
          that.$router.push({path: '/' + val})
        } else {
          Toast("您还未登录，请先登录")
        }
      },
      logout() {
        let that = this;
        that.localData('remove', 'username');
        that.localData('remove', 'memberId');
        that.logoutShow = false;
        that.userName = '登录/注册'
        that.imgList[0].img = "/static/logo.jpg";
        that.ajax({
          url: '/member/sign/out',
          success: function (res) {
            if (res.status == 1000) {
              that.forPaymentNum = 0;  //待付款订单数量
              that.toSendNum = 0;      //待发货订单数量
              that.harvestedNum = 0;   //待收获订单数量
              that.localData('remove', 'MemberId');
              that.localData('remove', 'tempMemberId');
              that.isWeixin=true;
            }
          }
        })
      },
      save() {
        let that = this;
        this.logoutShow = that.localData('get', 'hlxc_userInfo');
      },
    },
    created() {
      this.save();
      this.isLogin();
      this.getStatusNum();
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/minxin";

  #me {
    float: left;
    width: 100%;
    padding-bottom: 4rem;
    background:#fff;
  }

  .userInfo {
    background:url("../../assets/img/wodebg.jpg") no-repeat left 0 top 0;
    background-size: 100% 100% ;
    padding:5% 10% 15% 5%;
    text-align: center;
    .userImg {
      @include wh(6rem, 6rem);
      overflow: hidden;
      border-radius: 50%;
      position: relative;
      img {
        @include center;
        @include wh(6rem, 6rem);
      }
    }
    .ners {
      position: absolute;
      left:8.2rem;
      top:2.7rem;
      color: $f;
    }
  }

  .myList {
    background: $f;
    padding: 2% 2%;
    border-bottom: 1px solid #F4F4F4;
    display: flex;
    justify-content: space-between;
    display: -webkit-flex;
    margin-bottom: 1rem;
    li {
      text-align: center;
      width: 20%;
      display: flex;
      display: -webkit-flex;
      flex-direction: column;
      span {
        font-size: 0.9rem;
      }
    }
  }
  .order {
    width:90%;
    margin:-9% auto 0;
    background:#fff;
    overflow: hidden;
    border-radius:10px 10px 0px 0;
    .orderTop {
      background: $f;
      display: flex;
      color:#101010;
      display: -webkit-flex;
      padding: 3% 3%;
      justify-content: space-between;
      .iconfont {
        font-size: $med;
      }
    }
    .orderType {
      background: $f;
      display: flex;
      display: -webkit-flex;
      padding: 0.3rem 4% 0 0;
      justify-content: space-between;
      li {
        position: relative;
        width: 20%;
        display: flex;
        display: -webkit-flex;
        text-align: center;
        font-size: 0.9rem;
        flex-direction: column;
        padding: 3% 0;
        i.iconfont {
          font: 3rem/3rem "Microsoft YaHei";
          margin-bottom: 0.3rem;
        }
        b {
          position: absolute;
          background: $red;
          box-sizing: border-box;
          border-radius:50%;
          left: 50%;
          margin-left: .2rem;
          top: 0.4rem;
          color: $f;
          font-size: 1rem;
          min-width: 1.4rem;
          height: 1.4rem;
          line-height: 1.4rem;
        }
      }
    }
  }

  .personalList {
    background: $f;
    margin-bottom: 1rem;
    li {
      display: flex;
      padding: 0 6% 0 4%;
      font: 1rem/3rem "Microsoft YaHei";
      display: -webkit-flex;
      justify-content: space-between;
      border-bottom: 1px solid #F4F4F4;
      span {

      }
      i.iconfont {
        margin-top: 0.3rem;
        font: 2.5rem/2.5rem "Microsoft YaHei";
      }
    }
    a {
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      font: 1rem/3rem "Microsoft YaHei";
      color: $gray;
      padding: 0 6% 0 4%;
      i.iconfont {
        margin-top: 0.3rem;
        font: 2.5rem/2.5rem "Microsoft YaHei";
      }
    }
  }

  .mine-logout {
    width: 60%;
    text-align: center;
    background: $red;
    color: $f;
    margin: 0 auto 2.5rem;
    @include sh($med, 2.6em);
    border-radius: 3px;
  }
  .home-main-footer {
    margin: 0 auto 0.9rem;
    width: 80px;
    padding-left: 22px;
    position: relative;
    @include sc($min, $gre);
    line-height: 16px;
    .iconfont {
      display: block;
      position: absolute;
      left: 0;
      @include wh(16px, 16px);
      background: url("../../assets/img/logo.jpg") no-repeat;
      background-size: contain;
      border-radius: 100%;
    }
  }
  .noWei{
    margin: 5.8rem auto 1rem;
    width: 80px;
    padding-left: 22px;
    position: relative;
    @include sc($min, $gre);
    line-height: 16px;
    .iconfont {
      display: block;
      position: absolute;
      left: 0;
      @include wh(16px, 16px);
      background: url("../../assets/img/logo.jpg") no-repeat;
      background-size: contain;
      border-radius: 100%;
    }
  }
</style>
