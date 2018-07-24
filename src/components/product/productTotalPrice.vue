<template>
  <!--订单商品总价组件-->
  <div class="pay-product-collect">
    <p><span>商品金额</span><span class="money">￥{{info.payment | filterFixed}}元</span></p>
    <p><span>运费</span><span>+￥{{info.postage | filterFixed}}元</span></p>
    <p><span>满额减</span><span>满100减10</span></p>
    <p><span>优惠券</span><span>-￥{{info.payment | filterFixed}}元</span></p>
    <p><span>合计</span><span class="money">￥{{info.payment + info.postage | filterFixed}}元</span></p>
  </div>
</template>

<script>

  export default {
    props: ['info']
  }
</script>

<style lang="scss" scoped>
  @import "../../style/minxin";

  .pay-product-collect {
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
  }
</style>
