<template>
  <!--购物车订单-->
  <div class="orderCart left">
    <!--<home-header :title="'订单确认'" :back="true"></home-header>-->
    <div class="create-main">
      <address-sel :addressInfo="addressInfo" :gotoed="'2'" :statusNum="'3'"></address-sel>
      <div class="borderColor"></div>
      <div class="storeLogo">
        <img src="../../assets/img/logo.jpg" alt=""><span>货嚯商城</span>
      </div>
      <!--<div class="create-item create-main-pay" v-if="false">-->
        <!--<div class="create-item-title create-top-arrows" @click="payShow = !payShow">-->
          <!--支付方式：<i class="iconfont icon-jiantouxia" :class="{active:payShow}"></i>-->
        <!--</div>-->
        <!--<div class="create-item-content clear" v-show="payShow">-->
          <!--<i class="iconfont icon-danduduihao"></i><span>微信支付</span>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="create-item create-main-message">-->
        <!--<div class="create-item-title create-top-arrows" @click="messageShow = !messageShow">-->
          <!--订单附言：<i class="iconfont icon-jiantouxia" :class="{active:messageShow}"></i>-->
        <!--</div>-->
        <!--<div class="create-item-input" v-show="messageShow">-->
          <!--<mt-field placeholder="请输入订单留言" type="textarea" rows="2" v-model="introduction"-->
                    <!--:attr="{ maxlength: 50 }"></mt-field>-->
        <!--</div>-->
      <!--</div>-->
      <div class="create-item create-main-product" v-if="productLi">
        <!--<div class="create-itemcreate-product-title">-->
          <!--商品列表-->
        <!--</div>-->

        <div class=" create-product-item">
          <div v-for="(item,index) in productLi.cartProductDtoList" :key="index" v-if="item.productChecked == 1">
            <product-order :item="item"></product-order>
          </div>
          <div class="create-main-buyou">
            <div class="create-main-shopinfo create-main-type">
              <span>配送方式</span>
            </div>
            <div class="create-main-shopinfo">
              <span>买家留言：</span><input class="buyerMessage" type="text" placeholder="点击可留言" v-model="introduction "/>
            </div>
            <div class="create-main-shopinfo" @click="getPpreferential">
              <span>优惠券</span>
              <span>领取<i class="iconfont icon-arrow-right-copy"></i></span>
            </div>
            <div class="create-main-shopinfo" @click="getPpreferential">
              <span>红包</span>
              <span>领取<i class="iconfont icon-arrow-right-copy"></i></span>
            </div>
          </div>
        </div>
        <div class="create-product-collect">
          <p><span>商品金额</span><span class="money">￥{{productLi.cartTotalPrice | filterFixed}}元</span></p>
          <p><span>运费</span><span>+￥{{postage | filterFixed}}元</span></p>
          <p class="activeBg"><span class="activeSp">满减</span><span>满100减10</span></p>
          <p><span>优惠券</span><span>-￥{{postage | filterFixed}}元</span></p>
          <p><span>合计</span><span class="money">￥{{totalPrice | filterFixed}}元</span></p>
        </div>
      </div>
      <div class="create-main-btn">
        <span @click="selectPayfor">确认订单</span>
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
            <div class="pay-money-title">付款金额</div>
            <div class="pay-money-val">￥{{paymentActual + postage}}</div>
            <!--<div class="pay-money-refer">￥{{payment}}</div>-->
          </div>
          <!--<div class="pay-price">-->
          <!--<div class="pay-price-title">优惠金额</div>-->
          <!--<div class="pay-price-count">￥{{actualMoney}}</div>-->
          <!--</div>-->
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
  import addressSel from '../../components/address/addressSel.vue'
  import {Toast} from 'mint-ui'
  import {filterParse,filterMainImg} from '../../mixins/filter'

  export default {
    data() {
      return {
        bindCard: null,
        selectPay: false,
        payPopupShow: false,
        messageShow: false,
        payShow: false,
        addActive: false,
        introduction: '',
        bankList: [],
        bankNum: '',
        bankType: '',
        orderNo: '',
        bindId: '',
        payment: '',
        paymentActual: '',
        bankCode: '',
        actualMoney: '',
        addressInfo: null,
        productLi: null,
        shippingId: '',
        postage: 0,
      }
    },
    computed: {
      totalPrice: function () {
        return this.productLi.cartTotalPrice + this.postage;
      }
    },
    components: {
      homeHeader,
      productOrder,
      addressSel
    },
    filters: {
      filterParse,
      filterMainImg
    },
    methods: {
      getPpreferential:function () {
        this.$router.push({path:'/couponsList'})
      },
      getAddress() {
        let that = this;
        let memberId = that.localData('get', 'memberId') ? that.localData('get', 'memberId') : that.localData('get', 'tempMemberId');
        that.ajax({
          url: '/shipping/get/one',
          method: 'post',
          data: {
            memberId: memberId
          },
          success: function (res) {
            if (res.status == 1000) {
              that.addressInfo = res.data;
              that.shippingId = res.data.id;
              that.calculatepostage(memberId, res.data.id);
            }
          }
        })
      },
      calculatepostage(memberId, shippingId) {
        let that = this;
        that.ajax({
          url: '/ppf/getpostfee',
          method: 'post',
          data: {
            memberId: memberId,
            shippingId: shippingId,
            productId: null,
            quantity: 0,
          },
          success: function (res) {
            if (res.status = 1000) {
              that.postage = res.data;
            }
          }
        })
      },
      createInfo() {
        let that = this;
        let memberId = that.localData('get', 'tempMemberId') ? that.localData('get', 'tempMemberId') : that.localData('get', 'memberId');
        that.ajax({
          url: '/cart/list?memberId=' + memberId,
          success: function (res) {
            that.productLi = res.data;
          }
        })
      },
      selectPayfor() {
        let that = this;
        if (that.addressInfo) {
          that.selectPay = true;
        } else {
          Toast('您还未添加收获地址，请您添加收获地址')
        }
      },
      submitOrder() {
        let that = this;
        //生成订单  判断是否有默认地址，没有无法生成订单
        that.ajax({
          url: '/order/from/cart',
          method: 'post',
          data: {
            memberId: that.localData('get', 'memberId'),
            shippingId: that.shippingId,
            productText: '',
            remark: that.introduction,
            postage: that.postage
          },
          success: function (res) {
            console.log(res.data.payment + '原价')
            that.payment = res.data.payment;
            that.paymentActual = res.data.paymentActual;
            that.actualMoney = that.payment - that.paymentActual;
            that.orderNo = res.data.orderNo;
            that.payPopupShow = true;
          }
        }),
          //银行卡列表
          that.ajax({
            url: '/pay/cardlist',
            method: 'post',
            success: function (res) {
              console.log(res.data.code)
              var authouer = res.data.code;
              var cardList = res.data.cardList;
              console.log(authouer)
              if (authouer == '1') {
                //设置默认展现银行卡
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
      bindBankCard() {
        let that = this;
        that.ajax({
          url: '/pay/authUser?returnUrl=http://t.2858.com/ceshi/createOrder',
          method: 'post',
          success: function (res) {
            var status = res.body.code;
            var redirectUrl = res.body.redirectUrl
            console.log(res.body.code);
            if (status != 'US2016') {
              location.href = redirectUrl
            }
          }
        })
      },
      rightPay() {  //立即支付
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
      onBridgeReady2() {
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
            that.localData('set','orderNo',that.orderNo);
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              location.href = 'http://t.2858.com/ceshi/result?orderId=' + that.orderNo
//              that.$router.push({path:'/result',query: {orderId: that.orderNo}})
            } else {
              location.href = 'http://t.2858.com/ceshi/result'
//              that.$router.push({path:'/result'})
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
        that.ajax({
          url: '/order/from/cart',
          method: 'post',
          data: {
            memberId: that.localData('get', 'memberId'),
            shippingId: that.shippingId,
            productText: '',
            remark: that.introduction,
            postage: that.postage,
            openId: openid
          },
          success: function (res) {
            if (res.status == 1000) {
              that.orderNo = res.data.orderNo;
              that.payment = res.data.payment;
              that.paymentActual = res.data.paymentActual;
              var appId1 = res.data.map.appId;
              var timeStamp1 = res.data.map.timeStamp;
              var nonceStr1 = res.data.map.nonceStr;
              var package1 = res.data.map.package;
              var paySign1 = res.data.map.sign;
              that.localData('set', "appId", appId1);
              that.localData('set', "timeStamp", timeStamp1);
              that.localData('set', "nonceStr", nonceStr1);
              that.localData('set', "package", package1);
              that.localData('set', "paySign", paySign1);
              // if(appId1){
              if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                  alert("weixin false");
                  document.addEventListener('WeixinJSBridgeReady', that.onBridgeReady2(), false);
                } else if (document.attachEvent) {
                  alert("wxsda");
                  document.attachEvent('WeixinJSBridgeReady', that.onBridgeReady2());
                  document.attachEvent('onWeixinJSBridgeReady', that.onBridgeReady2());
                }
              } else {
                console.log("调用微信支付")
                that.onBridgeReady2();
              }
            }
          }
        })
      }
    },
    watch: {
      payPopupShow: function (newVal) {
        if (!newVal) {
          this.addActive = false;
          this.localData('set', 'orderNo', this.orderNo);
          this.$router.push({name: 'waitPay', query: {goback: 'proDetail'}});
        }
      }
    },
    created() {
      this.getAddress();
      this.createInfo();
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/minxin";

  .create-main {
    /*padding-top: $top;*/
    padding-top:0.2rem;
    .borderColor{
      height:0.15rem;
      background: -webkit-repeating-linear-gradient(left,white, white 1%,red 1%,red 5% ,white 5%,white 6%,blue 6%,blue 11%);
    }
    .storeLogo{
      padding:1rem 0 1rem 0.5rem;
      display: flex;
      justify-content: flex-start;
      img{
        width:1.4rem;
        height:1.4rem;
        border-radius: 50%;
        margin-right:0.5rem;
      }
      span{
        font-size: 0.8rem;
        line-height: 1.4rem;
        font-weight: 600;
      }
    }
  }

  //公共样式
  .create-item {
    background: $f;
    margin: 5px 0;
    position: relative;
    .create-item-title {
      padding: 10px 0;
    }
  }


  //上下箭头
  .create-top-arrows {
    position: relative;
    .iconfont {
      position: absolute;
      right: 5px;
      @include sc($max, $border);
      transform: rotateZ(0deg);
    }
    .active {
      transform: rotateZ(180deg);
    }
  }

  .create-main-pay {
    .create-item-content {
      padding-left: 10px;
      padding-bottom: 10px;
      line-height: 1em;
      .iconfont {
        display: block;
        float: left;
        background: $red;
        border-radius: 100%;
        color: $f;
        padding: 1px;
      }
      span {
        float: left;
        padding-left: 10px;
      }
    }
  }

  .create-main-message {
    .create-item-input {
      border: 1px solid $border;
      margin-bottom: 10px;
    }
  }

  .create-main-product {
    .create-product-item {
      .create-main-buyou{
        margin-bottom:2rem;
        .create-main-shopinfo{
          display: flex;
          justify-content: space-between;
          padding:0 0.7rem;
          border-bottom:1px solid #f4f4f4;
          span{
            font-size: 0.6rem;
            line-height: 2rem;
            color:#101010;
            i{
              float:right;
            }
          }
          .buyerMessage{
            padding:0 0.2rem;
            border:0;
            outline: none;
            background:none;
            flex: 1;
            font-size: 0.6rem;
            line-height: 2rem;
            color:#101010;
          }
        }
        .create-main-type{
          padding-top:2rem;
        }
      }
    }
  }

  .create-product-collect {
    padding:1rem 0 0.5rem;
    p {
      display: flex;
      justify-content: space-between;
      padding:0.25rem 0.8rem;
    }
    span {
      font:0.8em/1.3em "";
      font-weight: 600;
      color:#101010;
    }
    .money{
      color:#f80000;
    }
    .activeBg{
      padding:0 0.8rem;
      span {
        font:0.8em/1.8em "";
        font-weight: 600;
        color:#101010;
      }
      .activeSp{
        display: block;
        padding:0.25rem 0.2rem;
        background:#f80000;
        font:0.8em/1.3em "";
        color:#fff;
        border-radius: 0.2rem;
      }
    }
  }

  .create-main-btn {
    margin: 10px;
    margin-bottom: 8rem;
    span {
      display: block;
      float:right;
      @include wh(33%, 2.6em);
      @include sc($med, $f);
      line-height: 2.6em;
      text-align: center;
      background: -webkit-repeating-linear-gradient(left, red 1%, red 80%,  white 100%);
      border-radius: 5px;
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
