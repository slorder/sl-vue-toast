<template>
  <!--全部订单列表-->
  <div id="myOrder" class="left">
    <!--<home-header :title="$route.query.title" :back="true"></home-header>-->
    <div class="headTop">
      <span class="iconfont icon-fanhui goback" @click="goback"></span>
      <ul>
        <li @click="replaceList('allList')"><span :class="{statusOrderList:active=='全部订单'}">全部订单</span></li>
        <li @click="replaceList('forPay')"><span :class="{statusOrderList:active=='待付款'}">待付款</span></li>
        <li @click="replaceList('forSent')"><span :class="{statusOrderList:active=='待发货'}">待发货</span></li>
        <li @click="replaceList('forRecive')"><span :class="{statusOrderList:active=='待收货'}">待收货</span></li>
        <li @click="replaceList('forRefund')"><span :class="{statusOrderList:active=='退款/退货'}">退款/退货</span></li>
      </ul>
    </div>
    <div class="listImg">
      <ul class="orderList">
        <li v-for="(item,index) in orderlist" :key="index" v-if="orderlist!=null">
          <div class="listop">
            <span>订单号：{{item.id}}</span>
            <span :class="item.status=='10'||item.status=='100'?'listStatus':''">{{item.status | filterStatus}}</span>
          </div>
          <div class="orderList-inner" @click="orderShip(index)">
            <img v-if="item.ordersDetailList.length != 0" :src="imgHost+item.ordersDetailList[0].productImage" alt=""/>
            <!--<dl>-->
              <!--<dt><h4>订单号：{{item.id}}</h4></dt>-->
              <!--<dd>订单状态：{{item.status | filterStatus}}</dd>-->
              <!--<dd>-->
                <!--订单总金额：-->
                <!--<span>¥{{item.paymentActual | filterFixed}}元</span>-->
              <!--</dd>-->
              <!--<dd>下单时间：{{item.createTime | filterTime}}</dd>-->
            <!--</dl>-->
            <!--<i class="iconfont icon-arrow-right-copy"></i>-->
            <div class="orderInfo">
              <p>荷兰宝丽华无醇啤酒（柠檬味）330ml*24瓶<span v-if="item.ordersDetailList.length>=2">…</span></p>
              <p class="combined">合计：¥{{item.paymentActual | filterFixed}}元</p>
            </div>
          </div>
          <div class="operationBtn" v-if="item.status=='10'">
            <span style="color:#f80000;border-color: #f80000">立即支付</span>
            <span>修改地址</span>
            <span>取消订单</span>
          </div>
          <div class="operationBtn" v-if="item.status=='30'">
            <span>取消订单</span>
          </div>
          <div class="operationBtn" v-if="item.status=='60'">
            <span style="color:#f80000;border-color: #f80000">确认收货</span>
            <span>延长收货</span>
          </div>
          <div class="operationBtn" v-if="item.status=='70'||item.status=='90'">
            <span style="color:#f80000;border-color: #f80000" @click="gohome">再次购买</span>
            <span>删除订单</span>
          </div>
          <div class="operationBtn" v-if="item.status=='100'">
            <span style="color:#f80000;border-color: #f80000">查看详情</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="home-main-footer">
      <i class="iconfont"></i><span>货嚯商城</span>
    </div>
  </div>
</template>

<script>
  import homeHeader from '../../components/header/header.vue'
  import {filterFixed} from "../../mixins/filter";
  import {filterStatus} from "../../mixins/filter";

  export default {
    data() {
      return {
        orderlist: null,
        active:'',
        orderListStatus:''
      }
    },
    filters: {
      filterFixed: filterFixed,
      filterStatus: filterStatus,
    },
    components: {
      homeHeader,
    },
    created() {
      this.listTab();
    },
    methods: {
      //进入页面加载数据
      listTab() {
        let that = this;
        var memberId = that.localData('get', 'memberId');
        if (that.$route.query.title == "全部订单") {
          that.active='全部订单';
          that.orderListStatus=0;
        } else if (that.$route.query.title == "待付款") {
          that.active='待付款';
          that.orderListStatus=10;
        } else if (that.$route.query.title == "待发货") {
          that.active='待发货';
          that.orderListStatus=30;
        } else if (that.$route.query.title == "待收货") {
          that.active='待收货';
          that.orderListStatus=60;
        } else {
          that.active='退款/退货';
          that.orderListStatus=70;
          that.orderlist = that.orderlist1;
        }
        if(that.orderListStatus==0){
          that.ajax({
            url: '/order/orderlistall',
            method: 'post',
            data: {
              memberId: memberId
            },
            success: function (res) {
              if (res.status == 1000) {
                that.orderlist = res.data;
              }
            }
          })
        }else{
          that.ajax({
            url: '/order/orderlistbystatus',
            method: 'post',
            data: {
              memberId: memberId,
              status: that.orderListStatus
            },
            success: function (res) {
              if (res.status == 1000) {
                that.orderlist = res.data;
              }
            }
          })
        }
      },
      goback:function(){
        this.$router.push({path:'/me'});
      },
      //订单列表切换
      replaceList:function (val) {
        let that=this;
        var memberId = that.localData('get', 'memberId');
        if(val=='allList'){
          that.active='全部订单';
          that.orderListStatus=0;
        }
        if(val=='forPay'){
          that.active='待付款';
          that.orderListStatus=10;
        }
        if(val=='forSent'){
          that.active='待发货';
          that.orderListStatus=30;
        }
        if(val=='forRecive'){
          that.active='待收货';
          that.orderListStatus=60;
        }
        if(val=='forRefund'){
          that.active='退款/退货';
          that.orderListStatus=70;
        }
        that.$router.push({path: '/myOrder', query: {title: that.active}})
        that.listTab()
//        if(that.orderListStatus==0){
//          that.ajax({
//            url: '/order/orderlistall',
//            method: 'post',
//            data: {
//              memberId: memberId
//            },
//            success: function (res) {
//              if (res.status == 1000) {
//                that.orderlist = res.data;
//              }
//            }
//          })
//        }else{
//          that.ajax({
//            url: '/order/orderlistbystatus',
//            method: 'post',
//            data: {
//              memberId: memberId,
//              status: that.orderListStatus
//            },
//            success: function (res) {
//              if (res.status == 1000) {
//                that.orderlist = res.data;
//              }
//            }
//          })
//        }
      },
      orderShip(val) {
        let that = this;
        var status = this.orderlist[val].status;
        if (status == 10) {
          that.localData('set', 'orderNo', this.orderlist[val].id)
          this.$router.push({path: '/waitPay'})
        } else {
          this.$router.push({path: '/ship', query: {orderNumber: this.orderlist[val].id}})
        }
      },
      gohome:function () {
        this.$router.push({path:'../home'})
      }
    }
  }
</script>

<style lang="scss">
  @import "../../style/minxin";

  $b: #f0f0f0;

  #myOrder {
    .headTop{
      background:#fff;
      padding:10px 0.8%;
      display: flex;
      justify-content:flex-start;
      font-size:14px;
      line-height:24px;
      .goback{
        float:left;
        margin-top:4px;
        font-size:20px;
        line-height:24px;
        margin-left:5px;
      }
      ul{
        li{
          float:left;
          padding:3px 10px;
          span{
            display: block;
            padding-bottom:2px;
          }
          .statusOrderList{
            border-bottom:2px solid #f80000;
            padding-bottom:0;
          }
        }
      }
    }
    .listImg {
      width: 100%;
      box-sizing: border-box;
      .orderList {
        min-height:35rem;
        height:auto !important;
        height:35rem;
        li {
          box-sizing: border-box;
          width: 100%;
          background:#fff;
          height: auto;
          position: relative;
          overflow: hidden;
          padding: 0.6rem 0;
          .listop{
            display: flex;
            justify-content: space-between;
            border-bottom:1px solid #f4f4f4;
            padding:0 1.4rem 0.2rem;
            span{
              font-size: 0.8rem;
              line-height:2rem;
              color:#797979;
            }
            .listStatus{
              color:#f80000;
            }
          }
          .orderList-inner {
            display: flex;
            justify-content: space-between;
            border-bottom:1px solid #f4f4f4;
            padding:0.5rem;
            img {
              float: left;
              width: 5rem;
              height:5rem;
            }
            .orderInfo{
              flex:1;
              padding-top:0.5rem;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              p{
                color:#000;
                font-size: 0.8rem;
                line-height: 1rem;
                font-weight: 600;
              }
              .combined{
                font-weight: normal;
                text-align: right;
                color:#797979;
                padding-right:1.6rem;
                padding-bottom:0.5rem;
              }
            }

          }
          .operationBtn{
            padding-right:1.2rem;
            padding-top:0.2rem;
            span{
              float:right;
              display: block;
              font-size:0.6rem;
              line-height:1rem;
              color:#797979;
              border:1px solid #797979;
              border-radius: 0.5rem;
              padding:0 0.5rem;
              margin:0 0.1rem;
            }
          }
        }
      }
    }
    .home-main-footer {
      margin: 0 auto;
      margin-bottom:5rem;
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
  }

</style>
