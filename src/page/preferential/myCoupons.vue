<template>
  <!--调用微信授权相关接口-->
  <div id="myCoupons">
    <div class="head-title">
      <span class="iconfont icon-fanhui goback" @click="goback"></span>
      优惠
    </div>
    <ul class="couponsType">
      <li @click="preferent('quota')"><span>满额减</span><i class="iconfont icon-arrow-right"></i></li>
      <li @click="preferent('prefer')"><span>优惠券</span><i class="iconfont icon-arrow-right"></i></li>
      <li @click="preferent('envelope')"><span>红包</span><i class="iconfont icon-arrow-right"></i></li>
    </ul>
  </div>
</template>

<script>
  import homeHeader from '../../components/header/header.vue'
  import submitBtn from '../../components/button/submitBtn.vue'
  import {Toast} from 'mint-ui'

  export default {
    data() {
      return {

      }
    },
    methods: {
      preferent:function(val){
        this.$router.push({path:'/couponsList'})
      },
      goback:function(){
        this.$router.go(-1);
      }
    },
    created() {
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/minxin";

  #myCoupons {
    background: $f;
    height: 100%;
    word-break: break-all;
    .head-title{
      position: relative;
      text-align: center;
      color:#fff;
      font-size:20px;
      line-height:30px;
      padding:5px 0;
      background: url("../../assets/img/titlebg.png") no-repeat left 0 top 0;
      margin-bottom:1rem;
      background-size: 100% 100%;
      .goback{
        position: absolute;
        top:0;
        font-size:28px;
        line-height:42px;
        left:5px;
        color:#101010;
      }

    }
    .couponsType {
      background: $f;
      margin-bottom: 1rem;
      li {
        display: flex;
        padding: 0 6% 0 6%;
        display: -webkit-flex;
        justify-content: space-between;
        border-bottom: 1px solid #F4F4F4;
        span {
          font:600 1rem/3rem "Microsoft YaHei";
          color:#101010;
        }
        i.iconfont {
          margin-top: 0.3rem;
          font:600 2.5rem/2.5rem "Microsoft YaHei";
        }
      }
    }
  }
</style>
