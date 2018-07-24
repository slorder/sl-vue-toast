<template>
  <!--待付款-->
  <div class="pay left">
    <!--<home-header :title="'待付款'" :back="true"></home-header>-->
    <div class="head-title">
      <div class="statusLeft">
        <span class="iconfont icon-fanhui goback" @click="goback"></span>{{info.status | filterStatus}}
      </div>
      <div class="statusRight">
        联系卖家<span class="iconfont icon-xiaoxi" @click="goback"></span>
      </div>
    </div>
    <div class="pay-main" v-if="info">
      <div class="orderTime">
        <p>订单号：{{info.orderNo}}</p>
        <p>创建时间：{{info.createTime |filterTime}}</p>
      </div>
      <!--<address-sel :addressInfo="info.shippingDto" :gotoed="'1'"></address-sel>-->
      <address-sel :addressInfo="info.shippingDto" :gotoed="'3'" :statusNum="'3'"></address-sel>
      <!--<div class="pay-item pay-main-pay" v-if="false">-->
        <!--<span>支付方式</span>-->
        <!--<span>微信支付</span>-->
      <!--</div>-->
      <!--<div class="pay-item pay-main-message">订单附言</div>-->
      <!--<p class="ReceiveWrite">{{info.remark}}</p>-->
      <div class="pay-item pay-main-product">
        <!--<div class="pay-product-title">-->
          <!--商品列表-->
        <!--</div>-->
        <div class="pay-product-item">
          <div v-for="(item,index) in info.ordersDetailList" :key="index">
            <product-order :item="item"></product-order>
          </div>
        </div>
        <product-total-price :info="info"></product-total-price>
      </div>
      <div class="pay-main-btn">
        <span class="payfor" @click="selectPayfor">立即支付</span>
        <span>取消订单</span>
      </div>
    </div>
    <mt-popup v-model="selectPay" position="bottom" class="pay-mt-popup">
      <div class="pay-popup">
        <div class="pay-title">
          <div class="pay-title-cancel" @click="selectPay = false">
            取消
          </div>
          选择支付方式
        </div>
        <p class="buybao" style="font-size:1.56rem;line-height:3.4rem;color:#000;padding-left:1.2rem;"
           @click="submitOrder">
          <img src="../../assets/img/yeepay1.png"
               style="float:left;margin-top:0.45rem;margin-right:1rem;width:2.9rem;"/>易宝支付
        </p>
        <p class="wxpay" @click="wxPayfor" style="font-size:1.56rem;line-height:3.4rem;color:#000;padding-left:1.2rem;">
          <img src="../../assets/img/P1_06.png" style="float:left;margin-top:0.45rem;margin-right:1rem;width:2.9rem;"/>微信支付
        </p>
        <p style="padding-left:1.5rem;font-size:1rem;line-height:1.8rem;">您好，暂不支持易宝支付，请您选择微信支付！！</p>
      </div>
    </mt-popup>
    <mt-popup v-model="payPopupShow" position="bottom" class="pay-mt-popup">
      <div class="pay-popup">
        <div class="pay-title">
          <div class="pay-title-cancel" @click="payPopupShow = false">
            取消
          </div>
          确认付款
        </div>
        <div class="pay-content">
          <div class="pay-money">
            <div class="pay-money-val">￥{{info.payment + info.postage}}</div>
            <div class="pay-money-refer" v-if="false">￥{{(info.totalPrice + info.postage) | filterFixed}}</div>
          </div>
          <div class="pay-price" v-if="false">
            <div class="pay-price-title">优惠金额</div>
            <div class="pay-price-count">￥0</div>
          </div>
          <div class="pay-type">
            <div class="pay-type-title">付款方式</div>
            <div class="pay-type-content1" @click="bindBankCard()" v-if="bindCard==1">
              <span>您还没有绑定银行卡</span><i class="iconfont icon-arrow-right-copy"></i>
            </div>
            <div class="pay-type-content" v-if="bindCard==2" @click="addActive=true">
              <div class="pay-type-img">
                <img src="../../assets/img/ABC.png" alt="">
              </div>
              <div class="pay-type-right">
                <div class="type-right-title">
                  {{bankNum}}
                </div>
                <div class="type-right-num">
                  {{bankType}}
                </div>
              </div>
            </div>
          </div>
          <div class="pay-type-button">
            <div class="pay-type-btn" @click="rightPay()">确认支付</div>
          </div>
          <div class="pay-type-notice">
            支持银行卡支付
          </div>
        </div>
      </div>
      <!--添加银行卡-->

      <div class="pay-popup popup-add-pay" :class="addActive?'moveLeft':'moveRight'">
        <div class="pay-title">
          <div class="pay-title-cancel" @click="addActive=false">
            返回
          </div>
          选择付款方式
        </div>
        <div class="pay-content">
          <div class="pay-type">
            <div class="pay-type-content" v-for="item in bankList">
              <div class="pay-type-img">
                <img src="../../assets/img/ABC.png" alt="">
              </div>
              <div class="pay-type-right">
                <div class="type-right-title">
                  {{item.cardNo}}
                </div>
                <div class="type-right-num">
                  {{item.bankName}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pay-add-code">
          使用新卡支付
        </div>
      </div>
    </mt-popup>

  </div>
</template>

<script>
  import homeHeader from '../../components/header/header.vue'
  import productOrder from '../../components/product/productOrder.vue'
  import productTotalPrice from '../../components/product/productTotalPrice.vue'
  import addressSel from '../../components/address/addressSel.vue'
  import {filterParse, filterMainImg,filterTime,filterStatus} from '../../mixins/filter'

  export default {
    data() {
      return {
        bindCard: null,
        selectPay: false,
        payPopupShow: false,
        addActive: false,
        bankList: [],
        bankNum: '',
        bankType: '',
        orderNo: '',
        orderId: '',
        bindId: '',
        bankCode: '',
        id: '',
        info: {
          payment: '',
          shippingDto: {
            receiverName: '',
            receiverMobile: ''
          }
        },
      }
    },
    filters: {
      filterParse,
      filterMainImg,
      filterTime,
      filterStatus
    },
    components: {
      homeHeader,
      productOrder,
      productTotalPrice,
      addressSel
    },
    watch: {
      payPopupShow: function (newVal) {
        if (!newVal) {
          this.addActive = false;
        }
      }
    },
    created() {
      this.waitPay();
    },
    methods: {
      goback:function(){
        this.$router.go(-1);
      },
      waitPay() {
        let that = this;
        var memberId = that.localData('get', 'memberId')
//        that.id = that.$route.query.orderNumber;
        that.orderNo = that.localData('get', 'orderNo');
        that.ajax({
          url: '/order/showOrder',
          method: 'post',
          data: {
            memberId: memberId,
            orderId: that.orderNo
          },
          success: function (res) {
            if (res.status == 1000) {
              that.info = res.data[0];
              for (var i = 0, l = res.data[0].ordersDetailList.length; i < l; i++) {
                that.getInfo(i, res.data[0].ordersDetailList[i].productId);
              }
            }
          }
        })
      },
      getInfo(index, proId) {
        let that = this;
        that.ajax({
          url: '/product/detail2?id=' + proId,
          success: function (res) {
            let stringArray = res.data.stringArray;
            var imageUrl = '';
            for (var i = 0, l = stringArray.length; i < l; i++) {
              if (stringArray[i]) {
                imageUrl = stringArray[i];
              }
            }
//      productImage后台返回的空对象，必须返回否则会报错
            that.info.ordersDetailList[index].productImage =  imageUrl;
          }
        })
      },
      selectPayfor() {
        this.selectPay = true;
      },
      submitOrder() {
        let that = this;
        that.payPopupShow = true;
        //银行卡列表
        that.ajax({
          url: '/pay/cardlist',
          method: 'post',
          success: function (res) {
//            console.log(res.data.code)
            var authouer = res.data.code;
            var cardList = res.data.cardList;
//            console.log(authouer)
            if (authouer == '1') {
              that.bindCard = 2;
              that.bankType = cardList[0].bankName;
              that.bankNum = cardList[0].cardNo;
              that.bindId = cardList[0].bindId;
              that.bankCode = cardList[0].bankCode;
              that.bankList = cardList;
            } else {
              that.bindCard = 1;
            }
          }
        })
      },
      //绑定银行卡实名认证
      bindBankCard() {
        let that = this;
        that.ajax({
          url: '/pay/authUser?returnUrl=http://t.2858.com/ceshi/createOrder',
          method: 'post',
          success: function (res) {
            var status = res.data.code;
            console.log(status)
            var redirectUrl = res.data.redirectUrl;
            console.log(redirectUrl)
            if (status == 1) {
              location.href = redirectUrl;
            }
          }
        })
      },
      //调易宝支付
      rightPay() {
        let that = this;
        that.ajax({
          url: '/pay/consume',
//          url: '/pay/consume?bindCardId=' + that.bindId + '&bankCode=' + that.bankCode + '&id=' + that.orderNo + '&webCallbackUrl=ceshi/result?'+'&payment=0.1&paymentActual=0.1',
          method: 'post',
          data: {
            bindCardId: that.bindId,
            bankCode: that.bankCode,
            id: that.orderNo,
            webCallbackUrl: 'ceshi/result?',
            payment: 0.1,
            paymentActual: 0.1
          },
          success: function (res) {
            var code = res.data.code;
            var redirectUrl = res.data.redirectUrl;
            if (code == 1) {
              location.href = redirectUrl;
            }
          }
        })
      },
      onBridgeReady1() {
        let that = this;
        var appId = that.localData('get', "appId");
        var timeStamp = that.localData('get', "timeStamp");
        var nonceStr = that.localData('get', "nonceStr");
        var packages = that.localData('get', "package");
        var signType = that.localData('get', "signType");
        var paySign = that.localData('get', "paySign");
        /*$('#pcode').html('appId:' + appId + '<br/>timeStamp:' + timeStamp + '<br/>nonceStr:' + nonceStr + '<br/>package:' + package + '<br/>signType:' + signType + '<br/>paySign:' + paySign);*/
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            "appId": appId,     // 公众号名称，由商户传入
            "timeStamp": timeStamp,         // 时间戳，自1970年以来的秒数
            "nonceStr": nonceStr, // 随机串
            "package": packages,
            "signType": "MD5",         // 微信签名方式：
            "paySign": paySign // 微信签名
          },
          function (res) {
            that.localData('set', 'orderNo', that.orderId);
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              location.href = 'http://t.2858.com/ceshi/result?orderId=' + that.orderId
            } else {
              location.href = 'http://t.2858.com/ceshi/result'
            }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回
            // ok，但并不保证它绝对可靠。
            // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回 ok，但并不保证它绝对可靠。
          }
        )
      },
      wxPayfor() {
        let that = this;
        if (that.isWebCat()) {
          return;
        }
        //生成订单  判断是否有默认地址，没有无法生成订单
        var openid = that.localData('get', 'openid');
        var totalFee = that.info.payment + that.info.postage;
        that.ajax({
          url: '/order/wxPay/repeat',
          method: 'post',
          data: {
            memberId: that.localData('get', 'memberId'),
            orderId: that.info.orderNo,
            totalFee: totalFee,
            openId: openid
          },
          success: function (res) {
            if (res.status == 1000) {
              that.orderId = res.data.orderId;
              that.payment = res.data.payment;
              that.paymentActual = res.data.paymentActual;
              var appId1 = res.data.appId;
              var timeStamp1 = res.data.timeStamp;
              var nonceStr1 = res.data.nonceStr;
              var package1 = res.data.package;
              var paySign1 = res.data.sign;
              that.localData('set', "appId", appId1);
              that.localData('set', "timeStamp", timeStamp1);
              that.localData('set', "nonceStr", nonceStr1);
              that.localData('set', "package", package1);
              that.localData('set', "paySign", paySign1);
              // if(appId1){
              if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                  alert("weixin false");
                  document.addEventListener('WeixinJSBridgeReady', that.onBridgeReady1(), false);
                } else if (document.attachEvent) {
                  alert("wxsda");
                  document.attachEvent('WeixinJSBridgeReady', that.onBridgeReady1());
                  document.attachEvent('onWeixinJSBridgeReady', that.onBridgeReady1());
                }
              } else {
//                console.log("调用微信支付")
                that.onBridgeReady1();
              }
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/minxin";
  .head-title{
    display: flex;
    justify-content: space-between;
    background:#fff;
    .statusLeft{
      color:#f80000;
      font:600 1rem/1.8rem "";
      span{
        font:600 1.4rem/1.8rem "";
        color:#101010;
        float:left;
        margin:0.1rem 0.5rem 0 0;
      }
    }
    .statusRight{
      color:#101010;
      font:600 1rem/1.8rem "";
      span{
        float:right;
        font:600 1.4rem/1.8rem "";
        color:#101010;
        margin:0 0.5rem 0.1rem 0.3rem;
      }
    }
  }
  .pay-main {
    background:#fff;
    padding:0 0 $bottom;
  }
  .orderTime{
    padding:0 2rem;
    margin-bottom:1rem;
    p{
      color:#797979;
      font-size:12px;
      font-weight: 600;
      line-height:20px;
    }
  }
  .ReceiveWrite {
    padding: 0 10px;
    overflow-y: hidden;
    background: #fff;
    font-size: 15px;
    line-height: 22px;
    @include el(3)
  }
  //公共样式
  .pay-item {
    background: $f;
  }
  .pay-main-address {

  }
  .create-item {
    background: $f;
    margin: 5px 0;
    padding: 0 10px;
    position: relative;
    .create-item-title {
      padding: 10px 0;
    }
  }

  .create-main-address {
    .create-address {
      padding: 10px;
      @include sc($med, $gray);
      .create-address-name {
        @include fj;

      }
      .create-address-content {
        word-break: break-all;
        @include sc($min, $grey);
        padding: 5px 0 10px;
      }
    }
  }

  .pay-main-pay {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
  }

  .pay-main-product {
    .pay-product-title {
      padding-bottom: 10px;
      border-bottom: 1px solid $border;
    }
    .pay-product-item {
      min-height:20rem;
      height:auto !important;
      height:20rem;
    }
    .pay-product-list {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      border-bottom: 1px solid $border;
      padding: 2px 0;
      &:last-child {
        border: 0;
      }
      .pay-product-image {
        @include wh(5rem, 5rem);
        img {
          @include wh(5rem, 5rem);
        }
      }
      .pay-product-content {
        padding-left: 10px;
        .pay-product-name {
          padding-bottom: 10px;
          @include el(2);
        }
        .pay-product-count, .pay-product-money {
          @include sc($min, $grey);
          line-height: 1.5em;
          span {
            color: $red;
          }
          .total-count {
            color: $gray;
          }
        }
      }
    }

  }

  .pay-main-btn {
    margin: 10px;
    span {
      float: right;
      display: block;
      font-size: 0.8rem;
      line-height: 1.2rem;
      color: #797979;
      border: 1px solid #797979;
      border-radius: 0.6rem;
      padding: 0 0.8rem;
      margin: 0.5rem 0.2rem;
      /*float:right;*/
      /*display: block;*/
      /*font-size:0.6rem;*/
      /*line-height:1rem;*/
      /*color:#797979;*/
      /*border:1px solid #797979;*/
      /*border-radius: 0.5rem;*/
      /*padding:0 0.5rem;*/
      /*margin:0.5rem 0.2rem;*/
    }
    .payfor{
      /*display: block;*/
      /*font-size:1rem;*/
      /*line-height:2rem;*/
      /*color:#fff;*/
      color:#f80000;
      border:1px solid #f80000;
      /*border-radius: 0.2rem;*/
      /*padding:0 1rem;*/
      /*background:#f80000;*/
      /*margin:0 0.2rem;*/
    }
  }

  $border: #ccc;
  $size: 1rem;

  /*支付弹窗*/
  .mint-popup {
    height: 75%;
    font-family: "Microsoft Yahei";
    font-weight: 100;
    .pay-popup {
      height: 100%;
      background: #F8F8F8;
      width: 100vw;
      .pay-title {
        border-bottom: 0.5px solid $border;
        text-align: center;
        @include sh($max, 3.6rem);
        position: relative;
        .pay-title-cancel {
          position: absolute;
          left: 0;
          top: 0;
        }
      }
      .pay-content {
        padding: 0 0.5rem;
        .pay-money {
          text-align: center;
          border-bottom: 1px solid $border;
          .pay-money-title {
            @include sh(1.2rem, 2.2em);
          }
          .pay-money-val {
            @include sh(1.4rem, 2.8rem);
          }
          .pay-money-refer {
            @include sh(0.9rem, 2.6rem);
            color: #bbb;
            text-decoration: line-through;
          }
        }
        .pay-price {
          @include fj;
          flex-direction: row;
          border-bottom: 0.5px solid $border;
          @include sh($size, $min*3);
          .pay-price-count {
            color: red;
          }
        }
        .pay-type {
          .pay-type-title {
            @include sh(0.98rem, 0.98rem);
            padding-top: 1rem;
          }
          .pay-type-content1 {
            display: flex;
            display: -webkit-flex;
            justify-content: space-between;
            padding: 1rem 0.6rem 0.6rem 0;
            font-size: 18px;
            i {
              font-size: 20px;
            }
          }
          .pay-type-content {
            display: flex;
            flex-direction: row;
            padding: 1rem 0 0.6rem;
            border-bottom: 1px solid $border;
            .pay-type-img {
              padding-left: 1rem;
              @include wh(3.8rem, 2.8rem);
              img {
                @include wh(2.6rem, 2.6rem);
              }
            }
            .pay-type-right {
              display: flex;
              flex-direction: column;
              padding-left: 1.6rem;
              flex: 1;
              justify-content: space-between;
              .type-right-title, .type-right-num {
                font-size: $size;
              }
            }
          }
        }
        .pay-type-button {
          padding: 1.2rem 0.5rem 0.2rem;
          .pay-type-btn {
            @include wh(100%, 3rem);
            @include sh(1.1rem, 3rem);
            border: 0.5px solid #00a0e9;
            color: #00a0e9;
            border-radius: 5px;
            text-align: center;
            font-weight: 100;
          }
        }
        .pay-type-notice {
          text-align: center;
          @include sc($min, $gray);
        }
      }
      /*选择付款方式*/
      .pay-content {
        min-height: 30vh;
      }
      .pay-add-code {
        @include sh(1.24rem, 4rem);
        background: $f;
        text-align: center;
        font-weight: 100;
      }

    }
  }

  .pay-mt-popup {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .popup-add-pay {
      height: 100%;
      position: absolute;
      left: 100vw;
      top: 0;
    }
    .moveLeft {
      transform: translateX(-100%);
      transition: transform 0.3s;
    }
    .moveRight {
      transform: translateX(0);
      transition: transform 0.3s;
    }
  }

</style>
