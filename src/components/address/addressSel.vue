<template>
  <!--地址选择组件-->
  <div class="create-item create-main-address" :class="gotoed?'create-address-after':''" @click="pathAddressList">
    <div class="create-address" v-if="addressInfo">
      <div class="create-address-name" v-if="gotoed==1||gotoed==2" style="justify-content: space-between">
        <p style="margin-right:2rem;color:#101010;"><i class="iconfont icon-dingwei" style="position: absolute;left:-0.8rem;top:0;font-size:20px;color:#101010;"></i>收件人：{{addressInfo.receiverName}}</p>
        <p style="color:#101010;">联系方式：{{addressInfo.receiverMobile}}</p>
      </div>
      <div class="create-address-name" v-else>
        <p style="margin-right:2rem;"><i class="iconfont icon-dingwei" style="position: absolute;left:-0.8rem;top:0;font-size:20px;color:#101010;"></i>收件人：{{addressInfo.receiverName}}</p>
        <p>{{addressInfo.receiverMobile}}</p>
      </div>
      <div class="create-address-content">
        {{addressInfo.receiverProvince}}省{{addressInfo.receiverCity}}{{addressInfo.receiverDistrict}}{{addressInfo.receiverAddress}}
      </div>
      <div class="create-address-after" v-if="statusNum==3"></div>
    </div>
    <div class="create-address" v-else>
      您还未添加收获地址，请您添加收货地址
    </div>
  </div>
</template>

<script>
  export default {
    props: ['addressInfo', 'gotoed','statusNum'],
    methods:{
      pathAddressList(){
        if(this.gotoed){
          this.$router.push({name:'addressList',query:{goto:this.gotoed}})
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../style/minxin";

  //公共样式
  .create-item {
    background: $f;
    padding: 0 10px;
    position: relative;
  }

  .create-main-address {
    padding-right: 30px;
    .create-address {
      padding:0 0.5rem;
      @include sc($med, $gray);
      .create-address-name {
        position: relative;
        padding:0 0.8rem;
        display: flex;
        justify-content: flex-start;
        p{
          color:#999;
          font-size: 0.8rem;
          font-weight: 600;
        }
      }
      .create-address-content {
        word-break: break-all;
        @include sc($min, $grey);
        color:#999;
        padding: 5px 0.8rem 10px;
        font-weight: 600;
      }
    }
  }

  //右侧箭头
  .create-address-after:after {
    display: block;
    @include wh(10px, 10px);
    border-top: 2px solid #101010;
    border-right: 2px solid #101010;
    transform: translateY(-50%) rotateZ(45deg);
    position: absolute;
    top: 50%;
    right: 15px;
    content: '';
  }

</style>
