<template>
  <!--代发货-配送-确定收货-->
  <div class="ship left">
    <div class="head-title">
      <div class="statusLeft">
        <span class="iconfont icon-fanhui goback" @click="goback"></span>{{info.status | filterStatus}}
      </div>
      <div class="statusRight">
        联系卖家<span class="iconfont icon-xiaoxi" @click="goback"></span>
      </div>
    </div>
    <div class="ship-main" v-if="info">
      <div class="orderTime">
        <p>订单号：{{info.orderNo}}</p>
        <p>创建时间：{{info.createTime |filterTime}}</p>
      </div>
      <address-sel :addressInfo="info.shippingDto"></address-sel>
      <div class="courier" v-if="info.status!=30">
        <i class="iconfont icon-fahuo"></i>韵达快递【998898989898989】
      </div>
      <div class="pay-item pay-main-product">
        <div class="pay-product-item">
          <div v-for="(item,index) in info.ordersDetailList" :key="index">
            <product-order :item="item"></product-order>
          </div>
        </div>
        <product-total-price :info="info"></product-total-price>
      </div>
      <div class="pay-main-btn" v-if="info.status==30">
        <span>取消订单</span>
      </div>
      <div class="pay-main-btn" v-if="info.status==60">
        <span class="buyAgain">确认收货</span>
        <span>延长收货</span>
      </div>
      <div class="pay-main-btn" v-if="info.status==70||info.status==90">
        <span class="buyAgain" @click="gohome">再次购买</span>
        <span>删除订单</span>
      </div>
      <div class="pay-main-btn" v-if="info.status==100">
        <span style="float:right;">删除订单</span>
        <span class="buyAgain">取消申请</span>
      </div>
      <!--<div class="ship-main-product" v-if="info.status">-->
        <!--<div class="ship-main-item">订单状态：<span>{{info.status | filterStatus}}</span>-->
        <!--</div>-->
        <!--<div class="ship-main-item">订单号：<span>{{info.orderNo}}</span></div>-->
        <!--<div class="ship-main-item">订单总金额：<span>￥{{info.payment | filterFixed}}元</span></div>-->
        <!--<div class="ship-main-item ship-item-time">下单时间：<span>{{info.createTime | filterTime}}</span></div>-->
        <!--<div class="ship-main-pro" v-for="(item,index) in info.productList" :key="index">-->
          <!--<div class="ship-main-image">-->
            <!--<img :src="item.img" alt="">-->
          <!--</div>-->
          <!--<div class="ship-main-content">-->
            <!--<div class="ship-main-title">-->
              <!--{{item.name}}-->
            <!--</div>-->
            <!--<div class="ship-main-subtitle">-->
              <!--{{item.size}}-->
            <!--</div>-->
            <!--<div class="ship-main-money">-->
              <!--<p>小计：<span>￥{{item.money | filterFixed}}元</span>数量：{{item.count}}</p>-->
              <!--<div class="ship-pro-btn" @click="apply" v-if="info.status > 60">-->
                <!--申请售后-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="ship-main-message" v-if="info.status == 4">-->
        <!--<div class="ship-message-title">-->
          <!--我的评论-->
        <!--</div>-->
        <!--<div class="ship-message-evaluate">-->
          <!--<div class="ship-evaluate-title">-->
            <!--商品描述：-->
          <!--</div>-->
          <!--<div class="ship-evaluate-val">-->
            <!--<div class="ship-evaluate-li" v-for="(item,index) in 5" :key="index" @click="activeStar(index)"></div>-->
          <!--</div>-->
          <!--<div class="ship-evaluate-val" v-if="starCount">-->
            <!--<div class="ship-active-li" v-for="(item,index) in starCount" :key="index" @click="activeStar(index)"></div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="ship-message-input">-->
          <!--<textarea v-model="message" maxlength="50" placeholder="请输入评论内容"></textarea>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="ship-main-button" v-if="info.status == 60">-->
        <!--<span @click="submitBtn">确定收货</span>-->
      <!--</div>-->
      <!--<div class="ship-main-address" v-if="info.shippingDto">-->
        <!--<div class="ship-address-item">-->
          <!--收货人姓名：<span>{{info.shippingDto.receiverName}}</span>-->
        <!--</div>-->
        <!--<div class="ship-address-item">-->
          <!--手机号：<span>{{info.shippingDto.receiverMobile}}</span>-->
        <!--</div>-->
        <!--<div class="ship-address-item txt">-->
          <!--<span class="detailTxt">详细地址：</span>-->
          <!--<p class="detailAddress">-->
            <!--{{info.shippingDto.receiverProvince}}省{{info.shippingDto.receiverCity}}{{info.shippingDto.receiverDistrict}}{{info.shippingDto.receiverAddress}}</p>-->
        <!--</div>-->
        <!--<div class="ship-product-list">-->
          <!--<div v-for="(item,index) in info.ordersDetailList" :key="index">-->
            <!--<product-order :item="item"></product-order>-->
          <!--</div>-->
        <!--</div>-->
        <!--<product-total-price :info="info"></product-total-price>-->
      <!--</div>-->
    </div>
    <!--</div>-->
  </div>
</template>

<script>
  import homeHeader from '../../components/header/header.vue'
  import productOrder from '../../components/product/productOrder.vue'
  import productTotalPrice from '../../components/product/productTotalPrice.vue'
  import {filterParse, filterTime, filterStatus} from "../../mixins/filter";
  import {MessageBox} from 'mint-ui';
  import addressSel from '../../components/address/addressSel.vue'
  export default {
    data() {
      return {
        starCount: 0,
        message: '',
        orderId: '',
        info: {
          payment: ''
        },
      }
    },
    //过滤器
    filters: {
      filterStatus: filterStatus,
      filterParse: filterParse,
      filterTime: filterTime
    },
    components: {
      homeHeader,
      productOrder,
      productTotalPrice,
      addressSel
    },
    methods: {
      goback:function(){
        this.$router.go(-1);
      },
      gohome:function () {
        this.$router.push({path:'../home'})
      },
      activeStar(val) {
        this.starCount = val + 1;
      },
      getStatus() {
        let that = this;
        var memberId = that.localData('get', 'memberId')
        that.orderId = that.$route.query.orderNumber;
        that.ajax({
          url: '/order/showOrder',
          method: 'post',
          data: {
            memberId: memberId,
            orderId: that.orderId
          },
          success: function (res) {
            if (res.status == 1000) {
              that.info = res.data[0];
            }
          }
        })
      },
      apply() {
        MessageBox({
          title: '请致电客服',
          message: '<a href="tel:4000619719">4000619719</a>',
        });
      },
      submitBtn() {
        let that = this;
        MessageBox.confirm('确定收货吗?').then(action => {
          that.ajax({
            url: '/order/confirmReceipt',
            method: 'post',
            data: {
              orderId: that.orderId,
              status: 70
            },
            success: function (res) {
              if (res.status == 1000) {
                that.info.status = 70;
                Toast('收货成功');
              }
            }
          })
        });
      }
    },
    created() {
      this.getStatus()
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
  .ship-main {
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
    .courier{
      padding-left:0.2rem;
      font-size:0.8rem;
      line-height: 1.5rem;
      color:#797979;
      .iconfont{
        font-size: 1.5rem;
        float:left;
        margin-right:0.2rem;
      }
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
        float:right;
        display: block;
        font-size:0.8rem;
        line-height:1.2rem;
        color:#797979;
        border:1px solid #797979;
        border-radius: 0.6rem;
        padding:0 0.8rem;
        margin:0.5rem 0.2rem;
      }
      .buyAgain{
        color:#f80000;
        border-color: #f80000;
      }
    }
  }

  /*.ship-item-time {
    padding-bottom: 15px;
  }

  .ship-main-product {
    padding: 15px 10px;
    border-bottom: 1px solid $border;
    @include sh($med, 1.6em);
    color: $gray;
    background: $f;
    .ship-main-pro {
      display: flex;
      flex-direction: row;
      padding: 5px 5px 10px;
      border-bottom: 1px solid $border;
      &:last-child {
        border-bottom: 0;
      }
      .ship-main-image {
        @include wh(5rem, 5rem);
        img {
          @include wh(5rem, 5rem);
        }
      }

      .ship-main-content {
        padding-left: 10px;
        flex: 1;
        .ship-main-title {
          @include sh($med, 1.5em);
          height: 3em;
          @include el(2);
        }
        .ship-main-subtitle {
          @include sh($min, 1em);
        }
        .ship-main-money {
          @include sh($min, 2em);
          p {
            float: left;
          }
          span {
            color: $red;
            padding-right: 5px;
          }
          .ship-pro-btn {
            float: right;
            border: 1px solid $red;
            padding: 0 10px;
            @include sh($min, 2em);
            border-radius: 3px;
            color: $red;
          }
        }
      }
    }
  }

  !*我的评论*!
  .ship-main-message {
    background: $f;
    padding: 10px;
    border-bottom: 1px solid $border;
    .ship-message-title {
      padding-bottom: 15px;
    }
    .ship-message-evaluate {
      @include sh($med, 1em);
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      padding-bottom: 15px;
      position: relative;
      .ship-evaluate-title {
        padding-top: 2px;
      }
      .ship-evaluate-val {
        position: absolute;
        left: 5rem;
        top: 0;
        .ship-evaluate-li {
          float: left;
          margin-right: 5px;
          @include wh($max, $max);
          @include bg('../../assets/img/2.png');
        }
        .ship-active-li {
          float: left;
          margin-right: 5px;
          @include wh($max, $max);
          @include bg('../../assets/img/0.png');
        }
      }
    }
    .ship-message-input {
      border: 1px solid $border;
      textarea {
        padding: 5px;
        @include sh($min, 1.6em);
        @include wh(100%, 5em);
      }
    }
  }

  .ship-main-button {
    padding: 10px;
    span {
      display: block;
      @include sh($max, 2.4em);
      background: $red;
      color: $f;
      text-align: center;
      border-radius: 3px;
      letter-spacing: 1px;
    }
  }

  .ship-main-address {
    border-top: 1px solid $border;
    border-bottom: 1px solid $border;
    background: $f;
    padding: 0 10px;
    margin: 6px 0;
    .txt {
      overflow: hidden;
      padding: 10px 0;
      border-bottom: 1px solid $border;
      .detailTxt {
        float: left;
        font: 0.94rem/1.2rem "Microsoft YaHei";
      }
      .detailAddress {
        width: 80%;
        font: 0.94rem/1.2rem "Microsoft YaHei";
        float: right;
      }
    }
    .ship-address-item {
      @include sh($med, 3em);
      border-bottom: 1px solid $border;
      color: $gray;
      span {
        font-weight: normal;
        color: #000;
      }
      &:last-child {
        border: 0;
      }
    }
  }

  .ship-product-list {
    .ship-product-list {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      border-bottom: 1px solid $border;
      padding: 10px 0;
    }
  }
*/

</style>
