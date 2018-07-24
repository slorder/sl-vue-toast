<template>
  <!--支付结果-->
  <div class="result left">
    <home-header :title="'订单确认'" :back="true"></home-header>
    <div class="result-main">
      <div class="result-item" v-if="resultPay">
        <div class="result-image iconfont icon-danduduihao">

        </div>
        <div class="result-content">
          <p>您的应付金额为：<span>￥{{(orderInfo.payment+orderInfo.postage) | filterFixed}}元</span></p>
          <p>感谢您在本商场购物！您的订单已提交成功，请记住您的订单号：<span>{{orderId}}</span></p>
        </div>
        <div class="result-link">
          您可以返回<span @click="$router.push({name:'home'})">首页</span>或<span @click="$router.push({name:'me'})">用户中心</span>
        </div>
      </div>
      <div class="result-item" v-else>
        <div class="result-image iconfont icon-icon1">

        </div>
        <div class="result-content">
          <p>感谢您在本商场购物！您的订单支付失败！<span></span></p>
        </div>
        <div class="result-link">
          您可以返回<span @click="$router.push({name:'waitPay'})">待支付</span>或<span @click="$router.push({name:'me'})">用户中心</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import homeHeader from '../../components/header/header.vue'
  import {Toast} from 'mint-ui'

  export default {
    data() {
      return {
        resultPay: true,
        orderId:'',
        orderInfo:null
      }
    },
    components: {
      homeHeader,
    },
    methods: {
      updateStatus(){
        let that=this;
        that.orderId=that.$options.methods.getQueryString("orderId");
        if(that.orderId){
          that.ajax({
            url:'/order/updateStatus',
            method:'post',
            data:{
              orderId:that.orderId,
              status:30
            },
            success:function(res){
              if(res.status==1000){
                Toast('支付成功，需要修改状态');
                return;
              }
              if(res.status==1012){
                Toast('修改失败')
                return;
              }else{
                Toast('参数非法等')
              }
            }
          })
        }else{
          that.ajax({
            url:'/order/updateStatus',
            method:'post',
            data:{
              orderId:that.orderId,
              status:40
            },
            success:function(res){
              if(res.status==1000){
                Toast('不需要更改订单状态');
                return;
              }
              if(res.status==1012){
                Toast('未查询到订单信息');
                return;
              }else{
                Toast('支付失败，不需要更改订单状态，其他提示')
              }
            }
          })
        }
      },
      getQueryString(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = location.search.substr(1).match(reg);
        if (r != null){
          return r[2];
        }
      },
      getOrder(){
        let that=this;
        that.orderId=that.$options.methods.getQueryString("orderId");
        var memberId = that.localData('get','memberId')
        if(that.orderId){
          that.ajax({
            url: '/order/showOrder',
            method: 'post',
            data: {
              memberId: memberId,
              orderId: that.orderId
            },
            success: function (res) {
              if (res.status == 1000) {
                that.orderInfo = res.data[0];
                return;
              }
            }
          })
        }else{
          that.resultPay=false;
        }
      }
    },
    created(){
      this.getOrder();
      this.updateStatus();
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/minxin";

  .result-main {
    padding: $top 10px $bottom;
    background: $f;
  }

  .result-image {
    @include sc(8rem, $red);
    text-align: center;
  }

  .result-content {
    @include sh($min, 2em);
    padding-bottom: 10px;
  }

  .result-link {
    text-align: center;
    span {
      padding: 0 10px;
      color: $red;
    }
  }

</style>
